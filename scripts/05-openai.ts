import { OpenAILLM, OpenAIModels } from '../src/';

import { config } from 'dotenv';
config();

const ai = new OpenAILLM({ apiKey: process.env.OPENAI_API_KEY });

!(async function start() {
  const a = await ai.generateText({ prompt: '你好，我叫李雷，1+1等于多少？', model: OpenAIModels.GPT_4o_mini });
  console.log(a);

  const b = await ai.generateChat({
    model: OpenAIModels.GPT_4o_mini,
    messages: [{ role: 'user', content: '你好，我叫李雷，1+1等于多少？' }],
  });
  console.log(b);
})();
