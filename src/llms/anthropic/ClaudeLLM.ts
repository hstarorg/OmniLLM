import Anthropic from '@anthropic-ai/sdk';

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
import { MessageParam } from '@anthropic-ai/sdk/resources';

export class ClaudeLLM extends OminiLLMBase {
  private readonly client: Anthropic;
  constructor(private readonly options: OminiLLMOptions) {
    super();
    this.client = new Anthropic({ apiKey: options.apiKey });
  }

  async generateText(payload: GenerateTextPayload, options?: GenerateTextOptions): Promise<GenerateTextResult> {
    const res = await this.client.completions.create({
      model: payload.model,
      max_tokens_to_sample: 1000,
      prompt: payload.prompt,
    });
    console.log(res);
    return 'ok' as any;
  }

  async generateChat(payload: GenerateChatPayload, options?: GenerateChatOptions): Promise<GenerateChatResult> {
    const messages: Array<MessageParam> = [];
    payload.messages.forEach((msg) => {
      if (msg.role === 'user' || msg.role === 'assistant') {
        messages.push({ role: msg.role, content: msg.content as string });
      }
    });

    const res = await this.client.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 2000,
      temperature: 0.2,
      system: payload.system,
      //   tool_choice: { type: 'tool', name: 'get_weather' },
      tool_choice: { type: 'auto' },
      //   tools: [
      //     {
      //       name: 'get_weather',
      //       description: '获取给定位置的当前天气',
      //       input_schema: {
      //         type: 'object',
      //         properties: {
      //           location: {
      //             type: 'string',
      //             description: '城市和州,例如 San Francisco, CA',
      //           },
      //           unit: {
      //             type: 'string',
      //             enum: ['celsius', 'fahrenheit'],
      //             description: "温度单位,可以是'celsius'或'fahrenheit'",
      //           },
      //         },
      //       },
      //     },
      //   ],
      messages,
    });

    console.log(res);

    return 1 as any;
  }
}
