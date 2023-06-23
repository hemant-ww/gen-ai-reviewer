import { ChatGPTAPI } from "chatgpt"

export class Chat {
  constructor(apikey) {
    this.chatAPI = new ChatGPTAPI({
      apiKey: apikey,
      apiBaseUrl:
        process.env.OPENAI_API_ENDPOINT || "https://api.openai.com/v1",
      completionParams: {
        model: process.env.MODEL || "gpt-3.5-turbo",
        temperature: +(process.env.TEMPERATURE || 0) || 1,
        top_p: +(process.env.TOP_P || 0) || 1,
        max_tokens: process.env.MAX_TOKENS ? +process.env.MAX_TOKENS : undefined
      }
    })
  }

  generatePrompt = patch => {
    const answerLanguage = process.env.LANGUAGE
      ? `Answer me in ${process.env.LANGUAGE},`
      : ""

    const prompt =
      process.env.PROMPT ||
      "Below is a code patch, please help me do a brief code review on it. Any bug risks and/or improvement suggestions are welcome:"

    return `${prompt}, ${answerLanguage}:
    ${patch}
    `
  }

  codeReview = async patch => {
    if (!patch) {
      return ""
    }

    console.time("code-review cost")
    const prompt = this.generatePrompt(patch)

    const res = await this.chatAPI.sendMessage(prompt)

    console.timeEnd("code-review cost")
    return res.text
  }
}
