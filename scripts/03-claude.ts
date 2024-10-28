import { ClaudeLLM, ClaudeModels } from '../src';
import { config } from 'dotenv';
config();

const ai = new ClaudeLLM({
  apiKey: process.env.Anthropic_API_KEY!,
});

!(async function start() {
  const msg = await ai.generateText({ prompt: '今天天气如何?', model: ClaudeModels.Claude_3_5_Sonnet });

  console.log(msg);

  return;

  const msg2 = await ai.generateChat({
    model: ClaudeModels.Claude_3_5_Sonnet,
    system:
      'You are a highly skilled translator with expertise in many languages. Your task is to identify the language of the text I provide and accurately translate it into the specified target language while preserving the meaning, tone, and nuance of the original text. Please maintain proper grammar, spelling, and punctuation in the translated version.',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Das Wetter heute ist wunderschön, lass uns spazieren gehen. --> Chinese',
          },
        ],
      },
    ],
  });
})();
