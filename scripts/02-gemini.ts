import { GeminiLLM, GeminiModels } from '../src';

import { config } from 'dotenv';
config();

const ai = new GeminiLLM({ apiKey: process.env.Gemini_API_KEY! });

!(async function start() {
  const a = await ai.generateText({
    model: GeminiModels.Gemini_1_5_Flash,
    prompt: '1.8 and 1.11, which is the bigger?',
  });
  console.log(a);
})();
