import dotenv from 'dotenv';
import { App } from 'octokit';
import { createNodeMiddleware } from '@octokit/webhooks';
import fs from 'fs';
import http from 'http';

import robot from './robot.js';

dotenv.config();

const appId = process.env.APP_ID;
const webhookSecret = process.env.WEBHOOK_SECRET;
const privateKeyPath = process.env.PRIVATE_KEY_PATH;

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

const app = new App({
  appId: appId,
  privateKey: privateKey,
  webhooks: {
    secret: webhookSecret
  },
});

const port = 3000;
const host = 'localhost';
const path = '/api/webhook';
const localWebhookUrl = `http://${host}:${port}${path}`;

const middleware = createNodeMiddleware(app.webhooks, {path});

http.createServer(middleware).listen(port, () => {
  console.log(`Server is listening for events at: ${localWebhookUrl}`);
  console.log('Press Ctrl + C to quit.')
  robot(app);
});

try {
  const { data } = await app.octokit.request('/app');
  console.log(`Authenticated as '${data.name}'`);
} catch (error) {
  if (error.response) {
    console.error(`Error! Status: ${error.response.status}. Message: ${error.response.data.message}`)
  }
  console.error(error)
}