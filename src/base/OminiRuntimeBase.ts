import { type ClientOptions } from 'openai';
import {
  GenerateChatOptions,
  GenerateChatPayload,
  GenerateChatResult,
  GenerateTextOptions,
  GenerateTextPayload,
  GenerateTextResult,
  IOminiConversation,
} from './IOminiConversation';

export type OminiLLMOptions = Pick<ClientOptions, 'apiKey' | 'baseURL' | 'timeout'> & { apiKey: string };

export abstract class OminiLLMBase implements IOminiConversation {
  abstract generateText(payload: GenerateTextPayload, options?: GenerateTextOptions): Promise<GenerateTextResult>;
  abstract generateChat(payload: GenerateChatPayload, options?: GenerateChatOptions): Promise<GenerateChatResult>;
}
