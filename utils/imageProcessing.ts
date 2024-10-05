import axios from 'axios';

type Festival = '新年' | '春节' | '元宵节' | '清明节' | '端午节' | '中秋节' | '国庆节' | '圣诞节' | '生日' | '毕业' | '结婚' | '乔迁' | '普通节日';

interface FestivalDetails {
  keywords: string[];
  sceneDescription: string;
  characterActions: string;
  emotionalAtmosphere: string;
  colorAndLighting: string;
  detailElements: string;
  perspectiveAndComposition: string;
  dynamicOrStatic: string;
  timeAndPlace: string;
  styleAndTechnique: string;
}

const scenarioKeywords: Record<Festival, FestivalDetails> = {
  '新年': {
    keywords: ['烟花', '春联', '红包', '倒计时', '香槟', '新年钟声', '焰火', '庆祝人群', '新年愿望', '新年装饰', '年夜饭', '团圆', '新年快乐横幅'],
    sceneDescription: '城市广场上人群欢聚，迎接新年到来的喜庆场景',
    characterActions: '人们举杯庆祝，拥抱问候，放飞气球或许愿',
    emotionalAtmosphere: '欢乐、期待、温馨',
    colorAndLighting: '绚丽的烟花照亮夜空，金色和红色为主',
    detailElements: '闪亮的礼花、飘扬的彩带、香槟酒杯',
    perspectiveAndComposition: '广角视图，突出人群和烟花',
    dynamicOrStatic: '动态，捕捉烟花绽放和人群欢呼的瞬间',
    timeAndPlace: '除夕夜，城市中心广场或标志性建筑前',
    styleAndTechnique: '明亮饱和的色彩，捕捉光影变幻'
  },
  '春节': {
    keywords: ['年夜饭', '舞龙', '舞狮', '红包', '春联', '灯笼', '鞭炮', '饺子', '团圆', '拜年', '庙会', '财神', '年糕', '福字', '窗花'],
    sceneDescription: '热闹的家庭团圆场景，或喜庆的街道庙会',
    characterActions: '家人团聚吃年夜饭，长辈给红包，孩子们穿新衣',
    emotionalAtmosphere: '喜庆、祥和、团圆',
    colorAndLighting: '红色和金色为主，温暖的室内灯光',
    detailElements: '红灯笼、春联、福字、年画',
    perspectiveAndComposition: '室内全景或街道视角',
    dynamicOrStatic: '静态为主，展现团圆时刻',
    timeAndPlace: '除夕夜或大年初一，家中或热闹的街道',
    styleAndTechnique: '细腻的笔触表现传统元素，突出红色喜庆氛围'
  },
  // ... 其他节日的详情（保持不变）
  '普通节日': {
    keywords: ['祝福', '喜悦', '幸福', '微笑', '拥抱', '鲜花', '礼物', '庆祝', '温馨', '感恩', '祝愿', '美好时光', '欢聚'],
    sceneDescription: '温馨欢乐的庆祝场景',
    characterActions: '拥抱、送礼、分享美食',
    emotionalAtmosphere: '温馨、喜悦、感恩',
    colorAndLighting: '温暖柔和的光线',
    detailElements: '礼物、鲜花、美食',
    perspectiveAndComposition: '以人物互动为中心的温馨场景',
    dynamicOrStatic: '静中有动，体现温馨与欢乐',
    timeAndPlace: '温馨的室内或户外场景',
    styleAndTechnique: '柔和的色调，突出人物表情和互动'
  }
};

// 定义 API URL 常量
const DIFY_API_URL = process.env.DIFY_API_URL || 'https://api.dify.ai/v1/files/images';

function extractScenarioDetails(wishes: string): { festival: Festival, scenario: string } {
  const festivals: Festival[] = ['新年', '春节', '元宵节', '清明节', '端午节', '中秋节', '国庆节', '圣诞节', '生日', '毕业', '结婚', '乔迁'];
  let festival: Festival = '普通节日';
  let scenario = '祝福场景';

  for (const f of festivals) {
    if (wishes.includes(f)) {
      festival = f as Festival;
      break;
    }
  }

  const festivalDetails = scenarioKeywords[festival];
  scenario = festivalDetails.keywords.find(k => wishes.includes(k)) || festivalDetails.keywords[0];

  return { festival, scenario };
}

function buildOptimizedPrompt(wishes: string): string {
  const { festival, scenario } = extractScenarioDetails(wishes);
  const festivalDetails = scenarioKeywords[festival];
  
  const basePrompt = `Create a high-quality, photorealistic greeting card image for ${festival} celebration, focusing on the following characteristics:`;
  const style = "Photorealistic, high-definition photograph, vibrant colors, high contrast, sharp focus";
  const composition = festivalDetails.perspectiveAndComposition;
  const elements = `Include festive elements such as ${scenario} and ${festivalDetails.detailElements}`;
  const sceneDescription = festivalDetails.sceneDescription;
  const characterActions = festivalDetails.characterActions;
  const emotionalAtmosphere = festivalDetails.emotionalAtmosphere;
  const colorAndLighting = festivalDetails.colorAndLighting;
  const dynamicOrStatic = festivalDetails.dynamicOrStatic;
  const timeAndPlace = festivalDetails.timeAndPlace;
  const styleAndTechnique = `High-definition photorealistic style, ${festivalDetails.styleAndTechnique}`;

  return `${basePrompt}
  - Style: ${style}
  - Scene Description: ${sceneDescription}
  - Character Actions: ${characterActions}
  - Emotional Atmosphere: ${emotionalAtmosphere}
  - Color and Lighting: ${colorAndLighting}
  - Composition: ${composition}
  - Elements: ${elements}
  - Dynamic or Static: ${dynamicOrStatic}
  - Time and Place: ${timeAndPlace}
  - Style and Technique: ${styleAndTechnique}
  - Specific wish: "${wishes}"
  Make sure the image is a high-definition, photorealistic photograph suitable for a ${festival} greeting card and reflects the sentiment of the wish, prominently featuring ${scenario} and other elements typical of ${festival}.`;
}

export async function generateImage(prompt: string): Promise<string> {
  try {
    console.log('Generating image for prompt:', prompt);
    const optimizedPrompt = buildOptimizedPrompt(prompt);
    console.log('Optimized prompt:', optimizedPrompt);

    const response = await axios.post(
      DIFY_API_URL,
      {
        prompt: optimizedPrompt,
        response_format: 'url',
        n: 1,
        size: '1024x1024'
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.DIFY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const imageUrl = response.data.data[0].url;
    console.log('Image generated:', imageUrl);
    return imageUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}