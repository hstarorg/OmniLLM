import { ChatCompletion, Completions } from '@baiducloud/qianfan';
import type { ChatMessage, Resp } from '@baiducloud/qianfan/src/interface';

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

export class WenxinLLM extends OminiLLMBase {
  constructor(private readonly options: OminiLLMOptions) {
    super();
  }

  async generateText(payload: GenerateTextPayload, options?: GenerateTextOptions): Promise<GenerateTextResult> {
    const completions = new Completions({ ENABLE_OAUTH: true });
    const res = (await completions.completions({ prompt: payload.prompt }, payload.model)) as Resp;

    return {
      role: 'assistant',
      content: res.object,
      usage: { totalTokens: res.usage?.total_tokens },
    };
  }

  async generateChat(payload: GenerateChatPayload, options?: GenerateChatOptions): Promise<GenerateChatResult> {
    const chatCompletion = new ChatCompletion({ ENABLE_OAUTH: true });

    const messages: ChatMessage[] = [];
    if (payload.system) {
      messages.push({ role: 'user', content: payload.system });
    }
    payload.messages.forEach((item) => {
      if (item.role === 'assistant' || item.role === 'user') {
        messages.push({ role: item.role, content: item.content as string });
      }
    });

    const res = (await chatCompletion.chat({ messages }, payload.model)) as Resp;
    return {
      role: 'assistant',
      content: res.object,
      usage: { totalTokens: res.usage?.total_tokens },
    };
  }
}
