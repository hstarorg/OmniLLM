# LLMs

| Model             | Simple Conversaction | Continuous dialogue | Function | Embedding | Text to Image | Image to Text | TTS | STT | File |
| ----------------- | -------------------- | ------------------- | -------- | --------- | ------------- | ------------- | --- | --- | ---- |
| openai(gpt)       | √                    | √                   | √        | √         | √             | √             | √   | √   | √    |
| Anthropic(Claude) | √                    | √                   | √        | ×         | ×             | ×             | ×   | ×   | ×    |
| Google(gemini)    | √                    | √                   | √        | √         | ×             | √             | ×   | √   | √    |
| Meta(llama)       |
| Moonshot(kimi)    | √                    | √                   | √        | x         | x             | x             | x   | x   | √    |
| Ali(qwen)         |
| Baidu(wenxin)     | √                    | √                   |          | √         | √             | √             | √   | √   | x    |
| ByteDance(doubao) | √                    | √                   | √        | √         | x             | x             | x   | x   | x    |
| Kunlun(tiangong)  | √                    | √                   | x        | x         | √             | x             | x   | x   | x    |

## OpenAI

> https://platform.openai.com/docs/overview
> 主流大模型，支持简单对话、多轮对话、函数调用、文本嵌入（向量化）、图片生成、文件缓存

## Anthropic

> https://docs.anthropic.com/zh-CN/docs/welcome > https://www.voyageai.com/
> 主流大模型，支持简单对话、多轮对话、函数调用，不自带文本嵌入，推荐了 Voyage

## Gemini(Google)

> https://ai.google.dev/gemini-api
> 主流大模型，支持简单对话、对轮对话

## Llama(Meta)

> https://www.llama.com/
> 主流开源大模型

## Moonshot（Kimi）

> https://platform.moonshot.cn/docs/intro#%E6%96%87%E6%9C%AC%E7%94%9F%E6%88%90%E6%A8%A1%E5%9E%8B
> 月之暗面大模型，采用了 openai 的标准（略有小的变化），支持简单对话、多轮对话、函数调用、文件和上下文缓存、内建了网络搜索

## 通义千问大模型（阿里）

> https://cn.aliyun.com/product/bailian > https://help.aliyun.com/zh/model-studio/getting-started/models
> 国产主力大模型

## 文心大模型（百度）

> https://qianfan.cloud.baidu.com/ > https://cloud.baidu.com/article/1089328
> 国产主力大模型，支持简单对话、多轮对话，https://ai.baidu.com/ai-doc/SPEECH/dlbxg1cvw
> 图片能力有独立的服务，语音能力有独立的服务，https://ai.baidu.com/ai-doc/NLP/clxim3bfq

## 豆包大模型（字节）

> https://www.volcengine.com/docs/82379/1263272
> 国产主力大模型，支持简单对话、多轮对话、函数调用、文本嵌入

## 天工（昆仑万维）

> https://model-platform.tiangong.cn/api-reference
> 提供的 api 特别不像大模型，支持简单对话、多轮对话、文本到图片

## 智普 AI（）
> https://bigmodel.cn/

# Other

## 集成平台

- https://groq.com/
