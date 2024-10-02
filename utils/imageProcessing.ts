import { generateImageWithXfyun } from './xfyunApi';

function extractScenarioDetails(wishes: string): { festival: string, scenario: string } {
  const festivals = ['新年', '春节', '元宵节', '清明节', '端午节', '中秋节', '国庆节', '圣诞节', '生日', '毕业', '结婚', '乔迁'];
  let festival = '普通节日';
  let scenario = '祝福场景';

  for (const f of festivals) {
    if (wishes.includes(f)) {
      festival = f;
      break;
    }
  }

  const scenarioKeywords = {
    '新年': ['烟花', '彤红的太阳', '跨年倒计时', '红包'],
    '春节': ['年夜饭', '春联', '鞭炮', '团圆欢乐', '儿童', '舞龙', '舞狮', '红包'],
    '元宵节': ['元宵', '灯笼', '舞狮', '烟花', '猜灯谜'],
    '清明节': ['踏青', '柳枝', '纸鸢'],
    '端午节': ['粽子', '龙舟', '艾草'],
    '中秋节': ['月饼', '赏月', '嫦娥', '玉兔', '银河', '团圆'],
    '国庆节': ['国旗', '阅兵', '长城', '升旗', '烟花'],
    '圣诞节': ['圣诞树', '礼物', '雪橇', '铃铛', '彩灯', '圣诞老人'],
    '生日': ['蛋糕', '蜡烛', '许愿', '鲜花', '礼物'],
    '毕业': ['学士帽', '毕业证书', '校园'],
    '结婚': ['婚纱', '戒指', '红地毯', '教堂', '跑车', '花束'],
    '乔迁': ['新家', '钥匙', '花园', '建筑', '红地毯']
  };

  const keywords = scenarioKeywords[festival] || ['祝福', '喜悦', '幸福'];
  scenario = keywords.find(k => wishes.includes(k)) || scenario;

  return { festival, scenario };
}

function buildOptimizedPrompt(wishes: string): string {
  const { festival, scenario } = extractScenarioDetails(wishes);
  
  const basePrompt = `Create a high-quality, detailed greeting card image for ${festival} celebration, focusing on the following characteristics:`;
  const style = "Photorealistic, vibrant colors, high contrast, sharp focus";
  const composition = "Centered composition, balanced layout, eye-catching design";
  const elements = `Include festive elements related to ${festival}, such as ${scenario}`;
  const textPlacement = "Leave space for text at the bottom of the image";
  const mood = "Convey a warm, celebratory atmosphere appropriate for the occasion";

  return `${basePrompt}
  - Style: ${style}
  - Composition: ${composition}
  - Elements: ${elements}
  - Text Placement: ${textPlacement}
  - Mood: ${mood}
  - Specific wish: "${wishes}"
  Make sure the image is suitable for a ${festival} greeting card and reflects the sentiment of the wish, prominently featuring ${scenario}.`;
}

export async function generateImage(prompt: string): Promise<string> {
  try {
    console.log('Generating image for prompt:', prompt);
    const optimizedPrompt = buildOptimizedPrompt(prompt);
    console.log('Optimized prompt:', optimizedPrompt);
    const imageUrl = await generateImageWithXfyun(optimizedPrompt);
    console.log('Image generated:', imageUrl);
    return imageUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}