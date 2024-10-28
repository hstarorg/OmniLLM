import type {
  ChatCompletionAssistantMessageParam,
  ChatCompletionSystemMessageParam,
  ChatCompletionToolMessageParam,
  ChatCompletionUserMessageParam,
} from 'openai/resources';

export interface IOminiConversation {
  generateText(payload: GenerateTextPayload, options?: GenerateTextOptions): Promise<GenerateTextResult>;
  generateChat(payload: GenerateChatPayload, options?: GenerateChatOptions): Promise<GenerateChatResult>;
}

export type GenerateTextPayload = {
  prompt: string;
  model: string;
};

export type GenerateTextOptions = {};

export type GenerateTextResult = {
  role: string;
  content: string;
  usage: {
    totalTokens?: number;
  };
};

export type GenerateChatPayload = {
  system?: string;
  model: string;
  messages: (
    | ChatCompletionSystemMessageParam
    | ChatCompletionUserMessageParam
    | ChatCompletionAssistantMessageParam
    | ChatCompletionToolMessageParam
  )[];
};

export type GenerateChatOptions = {};

export type GenerateChatResult = {
  role: string;
  content: string;
  usage: {
    totalTokens?: number;
  };
};
