import OpenAI from 'openai'

/**
 * Service for interacting with the OpenAI GPT-4o's vision capabilities.
 */
export default class VisionService {
  OpenAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  async generate(prompt: string, uri: string) {
    const response = await this.OpenAI.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            {
              type: 'image_url',
              image_url: {
                url: uri,
              },
            },
          ],
        },
      ],
    })
    return {
      id: response.id,
      created: response.created,
      prompt,
      model: response.model,
      message: response.choices[0].message,
    }
  }
}
