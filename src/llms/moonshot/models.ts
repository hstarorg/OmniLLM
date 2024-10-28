export enum Models {
  // 它是一个长度为 8k 的模型，适用于生成短文本。
  Moonshot_V1_8K = 'moonshot-v1-8k',

  // 它是一个长度为 32k 的模型，适用于生成长文本。
  Moonshot_V1_32K = 'moonshot-v1-32k',

  // 它是一个长度为 128k 的模型，适用于生成超长文本。
  Moonshot_V1_128K = 'moonshot-v1-128k',

  // 模型路由器，用于自动选择最适合的模型。
  Moonshot_V1_Auto = 'moonshot-v1-auto',
}
