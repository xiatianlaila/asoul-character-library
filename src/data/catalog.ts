export type AssetKind = 'close' | 'front' | 'side' | 'back'

export interface Asset {
  id: string
  filename: string
  title: string
  kind: AssetKind
  width: number
  height: number
}

export interface Outfit {
  id: string
  code: string
  name: string
  category: string
  tags: string[]
  cover: string
  assets: Asset[]
}

const face = (id: string, filename: string, title: string): Asset => ({
  id: `${id}-close`, filename, title: `${title}-面部特写`, kind: 'close', width: 1254, height: 1254,
})

const fullViews = (id: string, prefix: string, title: string): Asset[] => [
  face(id, `${prefix}-close.png`, title),
  { id: `${id}-front`, filename: `${prefix}-front.png`, title: `${title}-正面全身`, kind: 'front', width: 941, height: 1672 },
  { id: `${id}-side`, filename: `${prefix}-side.png`, title: `${title}-侧面全身`, kind: 'side', width: 941, height: 1672 },
  { id: `${id}-back`, filename: `${prefix}-back.png`, title: `${title}-背面全身`, kind: 'back', width: 941, height: 1672 },
]

const bellaOutfits: Outfit[] = [
  { id: 'initial', code: 'Bella-OUTFIT-01', name: '初代团服', category: '团服', tags: ['团服', '初代', '经典造型', '官方'], cover: 'initial-close.png', assets: fullViews('initial', 'initial', '初代团服') },
  { id: 'debut', code: 'Bella-OUTFIT-02', name: '出道服', category: '团服', tags: ['团服', '出道', '经典造型'], cover: 'debut-close.png', assets: fullViews('debut', 'debut', '出道服') },
  { id: 'anniversary', code: 'Bella-OUTFIT-03', name: '二周年', category: '节日', tags: ['周年', '纪念', '团服'], cover: 'anniversary-close.png', assets: [face('anniversary', 'anniversary-close.png', '二周年')] },
  { id: 'red-coat', code: 'Bella-OUTFIT-04', name: '红棉袄', category: '节日', tags: ['节日', '红色', '冬季'], cover: 'red-coat-close.png', assets: [face('red-coat', 'red-coat-close.png', '红棉袄')] },
  { id: 'bridal', code: 'Bella-OUTFIT-05', name: '花嫁服', category: '礼服', tags: ['礼服', '花嫁', '优雅'], cover: 'bridal-close.png', assets: [face('bridal', 'bridal-close.png', '花嫁服')] },
  { id: 'blue-coat', code: 'Bella-OUTFIT-06', name: '蓝棉袄', category: '节日', tags: ['节日', '蓝色', '冬季'], cover: 'blue-coat-close.png', assets: [face('blue-coat', 'blue-coat-close.png', '蓝棉袄')] },
  { id: 'formal', code: 'Bella-OUTFIT-07', name: '礼服', category: '礼服', tags: ['礼服', '正式', '演出'], cover: 'formal-close.png', assets: [face('formal', 'formal-close.png', '礼服')] },
  { id: 'green-apple', code: 'Bella-OUTFIT-08', name: '青苹果', category: '其他', tags: ['日常', '青苹果', '可爱'], cover: 'green-apple-close.png', assets: [face('green-apple', 'green-apple-close.png', '青苹果')] },
  { id: 'reindeer', code: 'Bella-OUTFIT-09', name: '圣诞鹿', category: '节日', tags: ['节日', '圣诞', '可爱'], cover: 'reindeer-close.png', assets: [face('reindeer', 'reindeer-close.png', '圣诞鹿')] },
  { id: 'recolor', code: 'Bella-OUTFIT-10', name: '团服换色', category: '团服', tags: ['团服', '换色', '舞台'], cover: 'recolor-close.png', assets: [face('recolor', 'recolor-close.png', '团服换色')] },
  { id: 'swimsuit', code: 'Bella-OUTFIT-11', name: '泳装', category: '泳装', tags: ['泳装', '夏日', '清爽'], cover: 'swimsuit-close.png', assets: [face('swimsuit', 'swimsuit-close.png', '泳装')] },
  { id: 'jk', code: 'Bella-OUTFIT-12', name: 'JK服', category: '其他', tags: ['JK', '校园', '日常'], cover: 'jk-close.png', assets: [face('jk', 'jk-close.png', 'JK服')] },
  { id: 'polar-bear', code: 'Bella-OUTFIT-13', name: '北极熊', category: '其他', tags: ['北极熊', '冬季', '可爱'], cover: 'polar-bear-close.png', assets: [face('polar-bear', 'polar-bear-close.png', '北极熊')] },
  { id: 'fifth-anniversary', code: 'Bella-OUTFIT-14', name: '五周年', category: '节日', tags: ['周年', '纪念', '五周年'], cover: 'fifth-anniversary-close.png', assets: [face('fifth-anniversary', 'fifth-anniversary-close.png', '五周年')] },
]

export interface Character {
  id: string
  code: string
  name: string
  romanName: string
  cover: string
  tags: string[]
  description: string
  outfits: Outfit[]
}

export const characters: Character[] = [
  { id: 'bella', code: 'Bella', name: '贝拉', romanName: 'Bella', cover: 'initial-close.png', tags: ['紫发', '女角色', 'A-SOUL', '偶像', '可爱'], description: 'A-SOUL 成员之一，拥有标志性的紫色长发与红色蝴蝶结。收录多个风格的服装造型，适用于插画、建模与宣传物料等创作场景。', outfits: bellaOutfits },
  { id: 'ranran', code: 'Diana', name: '嘉然', romanName: 'Diana', cover: 'ranran-debut-close.png', tags: ['棕发', '女角色', 'A-SOUL', '偶像', '元气'], description: 'A-SOUL 成员之一。本次收录出道服面部特写，可用于角色参考、插画与宣传物料创作。', outfits: [
    { id: 'ranran-debut', code: 'Diana-OUTFIT-01', name: '出道服', category: '团服', tags: ['团服', '出道', '官方'], cover: 'ranran-debut-close.png', assets: [face('ranran-debut', 'ranran-debut-close.png', '出道服')] },
  ] },
  { id: 'wanwan', code: 'Ava', name: '向晚', romanName: 'Ava', cover: 'wanwan-debut-close.png', tags: ['蓝发', '女角色', 'A-SOUL', '偶像', '活力'], description: 'A-SOUL 成员之一。本次收录出道服面部特写，可用于角色参考、插画与宣传物料创作。', outfits: [
    { id: 'wanwan-debut', code: 'Ava-OUTFIT-01', name: '出道服', category: '团服', tags: ['团服', '出道', '官方'], cover: 'wanwan-debut-close.png', assets: [face('wanwan-debut', 'wanwan-debut-close.png', '出道服')] },
  ] },
  { id: 'nailin', code: 'Eileen', name: '乃琳', romanName: 'Eileen', cover: 'nailin-initial-close.png', tags: ['银发', '女角色', 'A-SOUL', '偶像', '优雅'], description: 'A-SOUL 成员之一。收录初代团服、汉服系列、敦煌、礼服等多套面部特写素材，可用于角色参考与创作。', outfits: [
    { id: 'nailin-initial', code: 'Eileen-OUTFIT-01', name: '初代团服', category: '团服', tags: ['团服', '初代', '经典造型'], cover: 'nailin-initial-close.png', assets: [face('nailin-initial', 'nailin-initial-close.png', '初代团服')] },
    { id: 'nailin-dunhuang', code: 'Eileen-OUTFIT-02', name: '敦煌', category: '其他', tags: ['敦煌', '古风', '国风'], cover: 'nailin-dunhuang-close.png', assets: [face('nailin-dunhuang', 'nailin-dunhuang-close.png', '敦煌')] },
    { id: 'nailin-hanfu-red', code: 'Eileen-OUTFIT-03', name: '汉服红', category: '其他', tags: ['汉服', '红色', '古风'], cover: 'nailin-hanfu-red-close.png', assets: [face('nailin-hanfu-red', 'nailin-hanfu-red-close.png', '汉服红')] },
    { id: 'nailin-hanfu-yellow', code: 'Eileen-OUTFIT-04', name: '汉服黄', category: '其他', tags: ['汉服', '黄色', '古风'], cover: 'nailin-hanfu-yellow-close.png', assets: [face('nailin-hanfu-yellow', 'nailin-hanfu-yellow-close.png', '汉服黄')] },
    { id: 'nailin-hanfu-blue', code: 'Eileen-OUTFIT-05', name: '汉服蓝', category: '其他', tags: ['汉服', '蓝色', '古风'], cover: 'nailin-hanfu-blue-close.png', assets: [face('nailin-hanfu-blue', 'nailin-hanfu-blue-close.png', '汉服蓝')] },
    { id: 'nailin-formal', code: 'Eileen-OUTFIT-06', name: '礼服', category: '礼服', tags: ['礼服', '正式', '优雅'], cover: 'nailin-formal-close.png', assets: [face('nailin-formal', 'nailin-formal-close.png', '礼服')] },
  ] },
]

export const outfits = characters.flatMap((character) => character.outfits)
export const categories = ['全部', '团服', '礼服', '泳装', '节日', '其他']
export const assetKinds: { value: AssetKind | 'all'; label: string }[] = [
  { value: 'all', label: '全部类型' },
  { value: 'close', label: '面部特写' },
  { value: 'front', label: '正面全身' },
  { value: 'side', label: '侧面全身' },
  { value: 'back', label: '背面全身' },
]

export const kindLabel: Record<AssetKind, string> = {
  close: '面部特写', front: '正面全身', side: '侧面全身', back: '背面全身',
}

export const assetPath = (filename: string) => `${import.meta.env.BASE_URL}assets/${filename}`
export const previewPath = (filename: string) => `${import.meta.env.BASE_URL}previews/${filename.replace(/\.png$/i, '.webp')}`
export const getOutfit = (id?: string) => outfits.find((outfit) => outfit.id === id)
export const getCharacter = (id?: string) => characters.find((character) => character.id === id)
export const getOutfitCharacter = (outfitId?: string) => characters.find((character) => character.outfits.some((outfit) => outfit.id === outfitId))
