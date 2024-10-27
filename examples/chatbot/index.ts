import { WechatyBuilder } from 'wechaty';
import qrTerm from 'qrcode-terminal';
import { PuppetWechat4u } from 'wechaty-puppet-wechat4u';
import { OpenAI } from 'openai';
import { config } from 'dotenv';
import { join } from 'path';

console.log(process.cwd());

config({ path: join(__dirname, '../../.env') });

const ai = new OpenAI({
  baseURL: 'https://api.moonshot.cn/v1',
  apiKey: process.env.Moonshot_API_KEY,
});

async function doChat(input: string) {
  const completion = await ai.chat.completions.create({
    model: 'moonshot-v1-8k',
    messages: [{ role: 'user', content: input }],
    temperature: 0.3,
  });
  return completion.choices[0].message;
}

const puppet = new PuppetWechat4u({});

const bot = WechatyBuilder.build({
  name: 'chatbot',
  puppet,
});

bot
  .on(
    'scan',
    (qrcode, status) => qrTerm.generate(qrcode, { small: true }) // show qrcode on console
  )
  .on('login', (user) => console.log(`User ${user} logged in`))
  .on('message', async (message) => {
    // Ingore self message
    if (message.self()) {
      return;
    }
    console.log(`Message: ${message}`, message);
    // Judge if it is a room message
    const room = message.room();
    if (room) {
      console.log(room.id, await room.topic(), room.owner());
      // Ignore mention self message
      if (!(await message.mentionSelf())) {
        return;
      }

      // Get the mention text
      const q = await message.mentionText();
      const answer = await doChat(q);
      if (answer.content) {
        await room.say(answer.content, message.talker()!);
      }
    } else {
      // Get the text
      const answer = await doChat(message.text());
      if (answer.content) {
        await message.say(answer.content);
      }
    }
  });

bot
  .start()
  .then(() => console.info('StarterBot', 'Starter Bot Started.'))
  .catch((e) => console.error('StarterBot', e));
