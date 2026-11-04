export const tarotCards = {
  fool: {
    number: '0',
    title: '愚者',
    english: 'THE FOOL',
    keywords: '开始 · 勇气 · 冒险',
    image: require('../assets/images/tarot-fool.png'),

    message:
      '今天很适合轻装上阵，去尝试一点新的事情。\n\n也许你还没有完全准备好，但这不代表你不能出发。\n\n有些路，是在走出去之后才慢慢展开的。',

    petMessage:
      '别害怕第一步。你不需要一次就把一切都做对，先出发就已经很勇敢了。',
  },

  lovers: {
    number: 'VI',
    title: '恋人',
    english: 'THE LOVERS',
    keywords: '连接 · 选择 · 真诚',
    image: require('../assets/images/tarot-lovers.png'),

    message:
      '今天适合靠近真正重要的人，也适合认真听一听自己的心。\n\n有些选择并没有标准答案，真诚往往比技巧更重要。',

    petMessage:
      '珍惜那些愿意回应你的人。真正的连接，往往来自坦诚和信任。',
  },

  strength: {
    number: 'VIII',
    title: '力量',
    english: 'STRENGTH',
    keywords: '勇气 · 温柔 · 坚定',
    image: require('../assets/images/tarot-strength.png'),

    message:
      '今天真正需要的力量，不一定是向前冲。\n\n耐心、稳定和温柔，也可以是一种非常强大的力量。',

    petMessage:
      '温柔并不等于软弱。稳住自己，就是今天最重要的力量。',
  },

  star: {
    number: 'XVII',
    title: '星星',
    english: 'THE STAR',
    keywords: '希望 · 灵感 · 治愈',
    image: require('../assets/images/tarot-star.png'),

    message:
      '今天不需要急着得到所有答案。\n\n给自己一点空间休息和恢复。\n\n有些好的事情，正在慢慢向你靠近。',

    petMessage:
      '慢一点没有关系。你正在一点一点恢复自己的光。',
  },

  moon: {
    number: 'XVIII',
    title: '月亮',
    english: 'THE MOON',
    keywords: '直觉 · 情绪 · 探索',
    image: require('../assets/images/tarot-moon.png'),

    message:
      '今天不一定所有事情都清晰明朗。\n\n不用急着做决定，先听一听自己真正的感受。',

    petMessage:
      '当答案还不清楚的时候，先相信自己的直觉。',
  },

  sun: {
    number: 'XIX',
    title: '太阳',
    english: 'THE SUN',
    keywords: '快乐 · 自信 · 能量',
    image: require('../assets/images/tarot-sun.png'),

    message:
      '今天很适合享受一点简单的快乐。\n\n像哈那晒太阳一样，允许自己放松下来，感受暖洋洋的好心情。',

    petMessage:
      '不用总想着下一件事。今天也值得好好晒一会儿太阳。',
  },
} as const;


// 自动得到六张牌的类型
export type TarotCardKey = keyof typeof tarotCards;


// 自动得到所有牌名
export const tarotCardKeys =
  Object.keys(tarotCards) as TarotCardKey[];


// 卡背
export const tarotCardBack =
  require('../assets/images/tarot-back.png');