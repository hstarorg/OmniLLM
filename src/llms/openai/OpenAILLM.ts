import OpenAI from 'openai';
import {
  GenerateChatOptions,
  GenerateChatPayload,
  GenerateChatResult,
  GenerateTextOptions,
  GenerateTextPayload,
  GenerateTextResult,
  OminiLLMBase,
  OminiLLMOptions,
} from '../../base';

export class OpenAILLM extends OminiLLMBase {
  private readonly client: OpenAI;
  constructor(private readonly options: OminiLLMOptions) {
    super();
    this.client = new OpenAI({ apiKey: options.apiKey, baseURL: options.baseURL || undefined });
  }

  async generateText(payload: GenerateTextPayload, options?: GenerateTextOptions): Promise<GenerateTextResult> {
    const res = await this.client.chat.completions.create({
      messages: [{ role: 'user', content: payload.prompt }],
      model: payload.model,
    });

    const firstMessage = res.choices[0].message;
    return {
      role: firstMessage.role,
      content: firstMessage.content || '',
      usage: {
        totalTokens: res.usage?.total_tokens,
      },
    };
  }

  async generateChat(payload: GenerateChatPayload, options?: GenerateChatOptions): Promise<GenerateChatResult> {
    const messages = payload.messages.slice(0);
    if (payload.system) {
      messages.unshift({
        role: 'system',
        content: payload.system,
      });
    }
    const res = await this.client.chat.completions.create({
      model: payload.model,
      messages,
      temperature: 0.3,
    });

    const firstMessage = res.choices[0].message;
    return {
      role: firstMessage.role,
      content: firstMessage.content || '',
      usage: {
        totalTokens: res.usage?.total_tokens,
      },
    };
  }
}
