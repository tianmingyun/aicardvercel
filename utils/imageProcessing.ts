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
  '元宵节': {
    keywords: ['元宵', '灯笼', '猜灯谜', '汤圆', '花灯', '龙灯', '舞龙', '烟花', '月亮', '花市', '元宵晚会', '灯会', '灯谜会'],
    sceneDescription: '热闹的元宵灯会，五彩缤纷的灯笼装点街道',
    characterActions: '人们赏灯、猜灯谜、吃汤圆',
    emotionalAtmosphere: '欢乐、祥和、好奇',
    colorAndLighting: '五彩斑斓的灯光，温暖柔和',
    detailElements: '各式花灯、张贴的灯谜、蒸腾的汤圆',
    perspectiveAndComposition: '街道视角，突出灯笼的美丽',
    dynamicOrStatic: '半动态，体现人们观赏和互动',
    timeAndPlace: '元宵节夜晚，古色古香的街道或现代城市广场',
    styleAndTechnique: '强调光影效果，体现灯笼的温馨光芒'
  },
  '清明节': {
    keywords: ['踏青', '柳枝', '纸鸢', '祭祀', '扫墓', '春游', '插柳', '柳絮', '青团', '寒食', '春雨', '杨柳', '野餐'],
    sceneDescription: '春意盎然的郊外，人们踏青或祭扫',
    characterActions: '家人一起祭扫先人，或踏青放风筝',
    emotionalAtmosphere: '肃穆、追思、生机',
    colorAndLighting: '春天的嫩绿色调，柔和的自然光',
    detailElements: '新芽、野花、风筝、祭品',
    perspectiveAndComposition: '远近结合，突出自然与人的互动',
    dynamicOrStatic: '静中有动，体现春天的生机',
    timeAndPlace: '清明时节，郊外或墓园',
    styleAndTechnique: '水彩般的柔和笔触，体现春天的清新'
  },
  '端午节': {
    keywords: ['粽子', '龙舟', '艾草', '菖蒲', '雄黄酒', '五彩绳', '香包', '赛龙舟', '划龙舟', '挂艾草', '包粽子', '驱邪'],
    sceneDescription: '热闹的龙舟比赛或家庭包粽子的温馨场景',
    characterActions: '划龙舟、包粽子、挂艾草',
    emotionalAtmosphere: '欢腾、团结、传统',
    colorAndLighting: '明亮的阳光下，突出粽叶的绿色和龙舟的彩色',
    detailElements: '龙舟、鼓声、飘扬的旗帜、粽子',
    perspectiveAndComposition: '水面视角或家庭厨房特写',
    dynamicOrStatic: '动态，体现比赛的激烈或包粽子的忙碌',
    timeAndPlace: '初夏，江河岸边或家中',
    styleAndTechnique: '动感的笔触，体现水面的波光和节日的热闹'
  },
  '中秋节': {
    keywords: ['月饼', '赏月', '团圆', '月亮', '嫦娥', '玉兔', '桂花', '月饼盒', '灯笼', '博饼', '月下赏桂', '中秋晚会', '月下共饮'],
    sceneDescription: '家人在月光下团聚赏月',
    characterActions: '分享月饼、赏月、谈天',
    emotionalAtmosphere: '温馨、思念、团圆',
    colorAndLighting: '皎洁的月光，温暖的灯光',
    detailElements: '圆月、月饼、桂花、茶具',
    perspectiveAndComposition: '院子或阳台视角，突出月亮和人物',
    dynamicOrStatic: '静态为主，体现宁静祥和',
    timeAndPlace: '中秋夜晚，家庭院落或现代住宅阳台',
    styleAndTechnique: '强调月光的朦胧美，体现东方韵味'
  },
  '国庆节': {
    keywords: ['国旗', '阅兵', '烟花', '天安门', '长城', '国庆花车', '国庆晚会', '升旗仪式', '爱国', '红旗', '国庆假期', '旅游', '庆祝活动'],
    sceneDescription: '盛大的阅兵仪式或城市烟花庆典',
    characterActions: '观看阅兵、升国旗、放飞气球',
    emotionalAtmosphere: '庄严、自豪、欢庆',
    colorAndLighting: '红色为主，金色点缀，阳光明媚',
    detailElements: '飘扬的国旗、整齐的方阵、绚丽的烟花',
    perspectiveAndComposition: '宏大场面，突出人群和标志性建筑',
    dynamicOrStatic: '动态，体现庆典的盛大',
    timeAndPlace: '国庆日，天安门广场或城市地标',
    styleAndTechnique: '细致入微的细节刻画，体现庄严与欢乐的结合'
  },
  '圣诞节': {
    keywords: ['圣诞树', '礼物', '圣诞老人', '驯鹿', '雪橇', '圣诞袜', '槲寄生', '圣诞花环', '姜饼人', '圣诞晚餐', '圣诞颂歌', '雪景', '圣诞市集'],
    sceneDescription: '温馨的家庭圣诞晚会或热闹的圣诞市集',
    characterActions: '装饰圣诞树、交换礼物、唱颂歌',
    emotionalAtmosphere: '欢乐、温馨、期待',
    colorAndLighting: '红绿相间，温暖的烛光和彩灯',
    detailElements: '圣诞树、礼物、袜子、姜饼屋',
    perspectiveAndComposition: '室内全景或市集街道视角',
    dynamicOrStatic: '温馨的静态场景',
    timeAndPlace: '圣诞夜，装饰温馨的家中或雪景中的市集',
    styleAndTechnique: '强调温暖色调，体现节日的温馨与魔幻'
  },
  '生日': {
    keywords: ['蛋糕', '蜡烛', '礼物', '气球', '生日帽', '生日歌', '许愿', '派对', '生日快乐横幅', '彩带', '生日贺卡', '生日派对', '庆生'],
    sceneDescription: '温馨欢乐的生日派对现场',
    characterActions: '许愿、吹蜡烛、切蛋糕、拆礼物',
    emotionalAtmosphere: '欢乐、惊喜、感动',
    colorAndLighting: '温暖明亮的室内灯光，彩色气球装饰',
    detailElements: '生日蛋糕、蜡烛、礼物盒、彩带',
    perspectiveAndComposition: '以寿星为中心的欢乐场景',
    dynamicOrStatic: '动态，捕捉欢呼和庆祝的瞬间',
    timeAndPlace: '室内或户外派对场地',
    styleAndTechnique: '明快活泼的色彩，突出欢乐气氛'
  },
  '毕业': {
    keywords: ['学士帽', '毕业证书', '校园', '学位服', '抛学士帽', '毕业照', '毕业典礼', '校徽', '校园景色', '师生合影', '告别', '未来展望', '青春回忆'],
    sceneDescription: '庄重的毕业典礼现场或校园内欢庆的毕业生',
    characterActions: '接受学位、抛学士帽、与同学和老师合影',
    emotionalAtmosphere: '喜悦、不舍、期待',
    colorAndLighting: '明亮的自然光，蓝天白云',
    detailElements: '学士服、毕业证书、校园标志性建筑',
    perspectiveAndComposition: '全景展现毕业典礼，或聚焦欢呼的毕业生',
    dynamicOrStatic: '动态，展现毕业时刻的激动',
    timeAndPlace: '初夏，校园内或礼堂',
    styleAndTechnique: '青春洋溢的色彩，捕捉动人瞬间'
  },
  '结婚': {
    keywords: ['婚纱', '戒指', '花束', '婚礼蛋糕', '婚车', '婚礼现场', '新郎新娘', '婚礼誓言', '婚礼请柬', '婚礼摄影', '婚礼舞台', '婚宴', '蜜月'],
    sceneDescription: '浪漫唯美的婚礼现场',
    characterActions: '交换戒指、亲吻、切蛋糕',
    emotionalAtmosphere: '浪漫、幸福、庄重',
    colorAndLighting: '柔和的自然光或温馨的室内灯光',
    detailElements: '鲜花拱门、婚戒、香槟塔',
    perspectiveAndComposition: '以新人为中心，突出重要时刻',
    dynamicOrStatic: '静态为主，体现庄重与温馨',
    timeAndPlace: '教堂、户外草坪或豪华宴会厅',
    styleAndTechnique: '柔和的色调，突出新人的幸福表情'
  },
  '乔迁': {
    keywords: ['新家', '钥匙', '红地毯', '搬家箱', '剪彩', '新家具', '乔迁宴', '房子模型', '新居落成', '装修', '家人团聚', '温馨家庭', '新家庭合影'],
    sceneDescription: '温馨喜庆的新家落成场景',
    characterActions: '剪彩、开香槟、家人合影',
    emotionalAtmosphere: '喜悦、期待、温馨',
    colorAndLighting: '明亮温暖的自然光',
    detailElements: '红色剪彩带、新家钥匙、香槟',
    perspectiveAndComposition: '新家门口或客厅全景',
    dynamicOrStatic: '静中有动，体现喜庆与温馨',
    timeAndPlace: '阳光明媚的日子，新家门口或客厅',
    styleAndTechnique: '温馨明亮的色调，突出新家的整洁与温馨'
  },
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