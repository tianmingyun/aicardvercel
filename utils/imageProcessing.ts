import { generateImageWithXfyun } from './xfyunApi';

type Festival = '新年' | '春节' | '元宵节' | '清明节' | '端午节' | '中秋节' | '国庆节' | '圣诞节' | '生日' | '毕业' | '结婚' | '乔迁' | '普通节日';

function extractScenarioDetails(wishes: string): { festival: Festival, scenario: string } {
  const festivals: Festival[] = ['新年', '春节', '元宵节', '清明节', '端午节', '中秋节', '国庆节', '圣诞节', '生日', '毕业', '结婚', '乔迁'];
  let festival: Festival = '普通节日';
  let scenario = '祝福场景';

  for (const f of festivals) {
    if (wishes.includes(f)) {
      festival = f;
      break;
    }
  }

  const scenarioKeywords: Record<Festival, string[]> = {
    '新年': ['烟花', '春联', '红包', '倒计时', '香槟', '新年钟声', '焰火', '庆祝人群', '新年愿望', '新年装饰', '年夜饭', '团圆', '新年快乐横幅'],
    '春节': ['年夜饭', '舞龙', '舞狮', '红包', '春联', '灯笼', '鞭炮', '饺子', '团圆', '拜年', '庙会', '财神', '年糕', '福字', '窗花'],
    '元宵节': ['元宵', '灯笼', '猜灯谜', '汤圆', '花灯', '龙灯', '舞龙', '烟花', '月亮', '花市', '元宵晚会', '灯会', '灯谜会'],
    '清明节': ['踏青', '柳枝', '纸鸢', '祭祀', '扫墓', '春游', '插柳', '柳絮', '青团', '寒食', '春雨', '杨柳', '野餐'],
    '端午节': ['粽子', '龙舟', '艾草', '菖蒲', '雄黄酒', '五彩绳', '香包', '赛龙舟', '划龙舟', '挂艾草', '包粽子', '驱邪'],
    '中秋节': ['月饼', '赏月', '团圆', '月亮', '嫦娥', '玉兔', '桂花', '月饼盒', '灯笼', '博饼', '月下赏桂', '中秋晚会', '月下共饮'],
    '国庆节': ['国旗', '阅兵', '烟花', '天安门', '长城', '国庆花车', '国庆晚会', '升旗仪式', '爱国', '红旗', '国庆假期', '旅游', '庆祝活动'],
    '圣诞节': ['圣诞树', '礼物', '圣诞老人', '驯鹿', '雪橇', '圣诞袜', '槲寄生', '圣诞花环', '姜饼人', '圣诞晚餐', '圣诞颂歌', '雪景', '圣诞市集'],
    '生日': ['蛋糕', '蜡烛', '礼物', '气球', '生日帽', '生日歌', '许愿', '派对', '生日快乐横幅', '彩带', '生日贺卡', '生日派对', '庆生'],
    '毕业': ['学士帽', '毕业证书', '校园', '学位服', '抛学士帽', '毕业照', '毕业典礼', '校徽', '校园景色', '师生合影', '告别', '未来展望', '青春回忆'],
    '结婚': ['婚纱', '戒指', '花束', '婚礼蛋糕', '婚车', '婚礼现场', '新郎新娘', '婚礼誓言', '婚礼请柬', '婚礼摄影', '婚礼舞台', '婚宴', '蜜月'],
    '乔迁': ['新家', '钥匙', '红地毯', '搬家箱', '剪彩', '新家具', '乔迁宴', '房子模型', '新居落成', '装修', '家人团聚', '温馨家庭', '新家庭合影'],
    '普通节日': ['祝福', '喜悦', '幸福', '微笑', '拥抱', '鲜花', '礼物', '庆祝', '温馨', '感恩', '祝愿', '美好时光', '欢聚']
  };

  const keywords = scenarioKeywords[festival];
  scenario = keywords.find(k => wishes.includes(k)) || keywords[0];

  return { festival, scenario };
}

function buildOptimizedPrompt(wishes: string): string {
  const { festival, scenario } = extractScenarioDetails(wishes);
  
  const basePrompt = `Create a high-quality, detailed greeting card image for ${festival} celebration, focusing on the following characteristics:`;
  const style = "Photorealistic, vibrant colors, high contrast, sharp focus";
  const composition = "Centered composition, balanced layout, eye-catching design";
  const elements = `Include festive elements related to ${festival}, such as ${scenario} and other relevant items`;
  const textPlacement = "Leave space for text at the bottom of the image";
  const mood = "Convey a warm, celebratory atmosphere appropriate for the occasion";

  return `${basePrompt}
  - Style: ${style}
  - Composition: ${composition}
  - Elements: ${elements}
  - Text Placement: ${textPlacement}
  - Mood: ${mood}
  - Specific wish: "${wishes}"
  Make sure the image is suitable for a ${festival} greeting card and reflects the sentiment of the wish, prominently featuring ${scenario} and other elements typical of ${festival}.`;
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