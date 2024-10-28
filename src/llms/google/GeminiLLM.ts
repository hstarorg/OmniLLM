import { Content, GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';

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

export class GeminiLLM extends OminiLLMBase {
  private readonly client: GoogleGenerativeAI;
  private readonly modelMap: Map<string, GenerativeModel> = new Map();
  constructor(private readonly options: OminiLLMOptions) {
    super();
    this.client = new GoogleGenerativeAI(options.apiKey);
  }

  private getModel(modelName: string): GenerativeModel {
    if (!this.modelMap.has(modelName)) {
      const model = this.client.getGenerativeModel({ model: modelName });
      this.modelMap.set(modelName, model);
    }
    return this.modelMap.get(modelName)!;
  }

  async generateText(payload: GenerateTextPayload, options?: GenerateTextOptions): Promise<GenerateTextResult> {
    const model = this.getModel(payload.model);

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: payload.prompt }] }],
    });

    const res = result.response;

    return {
      role: 'assistant',
      content: res.text(),
      usage: {
        totalTokens: res.usageMetadata?.totalTokenCount,
      },
    };
  }

  async generateChat(payload: GenerateChatPayload, options?: GenerateChatOptions): Promise<GenerateChatResult> {
    const model = this.getModel(payload.model);

    const contents: Content[] = [];
    if (payload.system) {
      contents.push({ role: 'system', parts: [{ text: payload.system }] });
    }
    payload.messages.forEach((message) => {
      contents.push({ role: message.role, parts: [{ text: message.content as string }] });
    });

    const result = await model.generateContent({
      contents,
    });

    const res = result.response;

    return {
      role: 'assistant',
      content: res.text(),
      usage: {
        totalTokens: res.usageMetadata?.totalTokenCount,
      },
    };
  }
}
