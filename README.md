# Gen AI PR Reviewer

This app helps developers in reviewing pull requests by the assistance of **ChatGPT**

# How it works
This project requires to create a github application for more information please check [here](https://docs.github.com/en/apps/creating-github-apps/writing-code-for-a-github-app/building-a-github-app-that-responds-to-webhook-events)
 1. As soon as the PR is created, github sends the PR event to this application. 
 2. ChatGPT goes through all the patches in the PR and responds to them with suggestion for code improvement or potential bugs.

## Configuration
We can configure the prompt and other parameters for ChatGPT in the application environment variables using **.env** file. Please use **.env.example** as a template to create the .env file. Variables are described below

 - *APP_ID*: Github app ID
 - *WEBHOOK_SECRET*: Github app webhook secret
 - *PRIVATE_KEY_PATH*: Github app Private key path
 - *MAX_PATCH_LENGTH*: Max length of patch per file for a PR, default is **1024**
 - *OPENAI_API_KEY*: Open AI API Key
 - *TEMPERATURE*: ChatGPT temperature parameter, default is **0.2**
 - *TOP_P*: ChatGPT top_p parameter, default is **0**
 - *PROMPT*: ChatGPT prompt, default is **Below is a code patch, could you please do a very brief code review and suggest any improvements:**
 - *MODEL*: ChatGPT model, default is **gpt-3.5-turbo**
 - *MAX_TOKENS*: ChatGPT max_tokens for the PR Review response per file, default is **1024**
 - *LANGUAGE*: Language of PR review done by ChatGPT, default is **English**


## References
[ChatGPT Completions API](https://platform.openai.com/docs/guides/gpt/completions-api)

[Github app responding to webhook events](https://docs.github.com/en/apps/creating-github-apps/writing-code-for-a-github-app/building-a-github-app-that-responds-to-webhook-events)

[Register a github application](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/registering-a-github-app)
