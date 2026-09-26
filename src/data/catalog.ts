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

export const outfits: Outfit[] = [
  { id: 'initial', code: 'CHAR-001-OUTFIT-01', name: '初代团服', category: '团服', tags: ['团服', '初代', '经典造型', '官方'], cover: 'initial-close.png', assets: fullViews('initial', 'initial', '初代团服') },
  { id: 'debut', code: 'CHAR-001-OUTFIT-02', name: '出道服', category: '团服', tags: ['团服', '出道', '经典造型'], cover: 'debut-close.png', assets: fullViews('debut', 'debut', '出道服') },
  { id: 'anniversary', code: 'CHAR-001-OUTFIT-03', name: '二周年', category: '节日', tags: ['周年', '纪念', '团服'], cover: 'anniversary-close.png', assets: [face('anniversary', 'anniversary-close.png', '二周年')] },
  { id: 'red-coat', code: 'CHAR-001-OUTFIT-04', name: '红棉袄', category: '节日', tags: ['节日', '红色', '冬季'], cover: 'red-coat-close.png', assets: [face('red-coat', 'red-coat-close.png', '红棉袄')] },
  { id: 'bridal', code: 'CHAR-001-OUTFIT-05', name: '花嫁服', category: '礼服', tags: ['礼服', '花嫁', '优雅'], cover: 'bridal-close.png', assets: [face('bridal', 'bridal-close.png', '花嫁服')] },
  { id: 'blue-coat', code: 'CHAR-001-OUTFIT-06', name: '蓝棉袄', category: '节日', tags: ['节日', '蓝色', '冬季'], cover: 'blue-coat-close.png', assets: [face('blue-coat', 'blue-coat-close.png', '蓝棉袄')] },
  { id: 'formal', code: 'CHAR-001-OUTFIT-07', name: '礼服', category: '礼服', tags: ['礼服', '正式', '演出'], cover: 'formal-close.png', assets: [face('formal', 'formal-close.png', '礼服')] },
  { id: 'green-apple', code: 'CHAR-001-OUTFIT-08', name: '青苹果', category: '其他', tags: ['日常', '青苹果', '可爱'], cover: 'green-apple-close.png', assets: [face('green-apple', 'green-apple-close.png', '青苹果')] },
  { id: 'reindeer', code: 'CHAR-001-OUTFIT-09', name: '圣诞鹿', category: '节日', tags: ['节日', '圣诞', '可爱'], cover: 'reindeer-close.png', assets: [face('reindeer', 'reindeer-close.png', '圣诞鹿')] },
  { id: 'recolor', code: 'CHAR-001-OUTFIT-10', name: '团服换色', category: '团服', tags: ['团服', '换色', '舞台'], cover: 'recolor-close.png', assets: [face('recolor', 'recolor-close.png', '团服换色')] },
  { id: 'swimsuit', code: 'CHAR-001-OUTFIT-11', name: '泳装', category: '泳装', tags: ['泳装', '夏日', '清爽'], cover: 'swimsuit-close.png', assets: [face('swimsuit', 'swimsuit-close.png', '泳装')] },
  { id: 'jk', code: 'CHAR-001-OUTFIT-12', name: 'JK服', category: '其他', tags: ['JK', '校园', '日常'], cover: 'jk-close.png', assets: [face('jk', 'jk-close.png', 'JK服')] },
  { id: 'polar-bear', code: 'CHAR-001-OUTFIT-13', name: '北极熊', category: '其他', tags: ['北极熊', '冬季', '可爱'], cover: 'polar-bear-close.png', assets: [face('polar-bear', 'polar-bear-close.png', '北极熊')] },
]

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
