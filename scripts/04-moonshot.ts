import { MoonshotLLM, MoonshotModels } from '../src/';

import { config } from 'dotenv';
config();

const moonshot = new MoonshotLLM({ apiKey: process.env.Moonshot_API_KEY });

!(async function start() {
  // const a = await moonshot.generateText({ prompt: '你好，我叫李雷，1+1等于多少？', model: MoonshotModels.Moonshot_V1_Auto, });
  // console.log(a);

  const b = await moonshot.generateChat({
    // system:
    //   '你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。Moonshot AI 为专有名词，不可翻译成其他语言。',
    model: MoonshotModels.Moonshot_V1_Auto,
    messages: [{ role: 'user', content: '你好，我叫李雷，1+1等于多少？' }],
  });
  console.log(b);
})();
