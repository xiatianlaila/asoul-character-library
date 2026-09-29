import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowRight, Box, ChevronDown, ChevronLeft, ChevronRight, Download, Grid2X2, Image as ImageIcon, Maximize2,
  PackageOpen, Search, Shirt, Sparkles, UserRound, X,
} from 'lucide-react'
import {
  assetKinds, assetPath, categories, characters, getCharacter, getOutfit, getOutfitCharacter, kindLabel, outfits, previewPath, type AssetKind, type Outfit,
} from './data/catalog'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Brand({ compact = false }: { compact?: boolean }) {
  return <Link className="brand" to="/" aria-label="返回枝江素材库首页">
    <span className="brand-mark"><Sparkles size={compact ? 18 : 23} /></span>
    <span>{compact ? '枝江素材库' : '枝江素材库'}<small>ZHIJIANG ASSET ARCHIVE</small></span>
  </Link>
}

interface Breadcrumb { label: string; to?: string }

function PageHeader({ breadcrumbs, children }: { breadcrumbs?: Breadcrumb[]; children?: ReactNode }) {
  return <header className="page-header">
    <Brand compact />
    {children || (breadcrumbs && <nav className="breadcrumbs" aria-label="面包屑">
      {breadcrumbs.map((crumb) => <span key={crumb.label}><ChevronRight size={15} />{crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : <b>{crumb.label}</b>}</span>)}
    </nav>)}
    <Link className="back-home" to="/"><Grid2X2 size={16} />浏览素材</Link>
  </header>
}

function CharacterBreadcrumbMenu({ character }: { character: (typeof characters)[number] }) {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  return <span className="breadcrumb-menu"><button className="breadcrumb-menu-trigger" type="button" aria-haspopup="menu" aria-expanded={isOpen} onClick={() => setIsOpen((open) => !open)}>{character.name}<ChevronDown size={15} /></button>{isOpen && <span className="breadcrumb-menu-panel" role="menu">{characters.map((item) => <button className={item.id === character.id ? 'active' : ''} type="button" role="menuitem" key={item.id} onClick={() => { setIsOpen(false); navigate(`/character/${item.id}`) }}>{item.name}</button>)}</span>}</span>
}

function CharacterBreadcrumbs({ character }: { character: (typeof characters)[number] }) {
  return <nav className="breadcrumbs outfit-breadcrumbs" aria-label="角色导航"><span className="breadcrumb-selector"><ChevronRight size={15} /><CharacterBreadcrumbMenu character={character} /></span></nav>
}

function OutfitBreadcrumbs({ character, outfit }: { character: (typeof characters)[number]; outfit: Outfit }) {
  const navigate = useNavigate()
  const [isOutfitMenuOpen, setIsOutfitMenuOpen] = useState(false)
  return <nav className="breadcrumbs outfit-breadcrumbs" aria-label="素材导航">
    <span className="breadcrumb-selector"><ChevronRight size={15} /><CharacterBreadcrumbMenu character={character} /></span>
    <span className="breadcrumb-selector"><ChevronRight size={15} /><span className="breadcrumb-menu"><button className="breadcrumb-menu-trigger current" type="button" aria-haspopup="menu" aria-expanded={isOutfitMenuOpen} onClick={() => setIsOutfitMenuOpen((open) => !open)}>{outfit.name}<ChevronDown size={15} /></button>{isOutfitMenuOpen && <span className="breadcrumb-menu-panel" role="menu">{character.outfits.map((item) => <button className={item.id === outfit.id ? 'active' : ''} type="button" role="menuitem" key={item.id} onClick={() => { setIsOutfitMenuOpen(false); navigate(`/outfit/${item.id}`) }}>{item.name}</button>)}</span>}</span></span>
  </nav>
}

function ImageThumb({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return <img className={className} src={previewPath(src)} alt={alt} loading="lazy" decoding="async" />
}

function Tags({ tags }: { tags: string[] }) {
  return <div className="tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
}

function AssetLightbox({ assets, currentIndex, onClose, onChange }: { assets: Outfit['assets']; currentIndex: number; onClose: () => void; onChange: (index: number) => void }) {
  const asset = assets[currentIndex]
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft' && assets.length > 1) onChange((currentIndex - 1 + assets.length) % assets.length)
      if (event.key === 'ArrowRight' && assets.length > 1) onChange((currentIndex + 1) % assets.length)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [assets.length, currentIndex, onChange, onClose])

  return <div className="lightbox-backdrop" role="presentation" onMouseDown={onClose}>
    <section className="lightbox" role="dialog" aria-modal="true" aria-label={`${asset.title}大图预览`} onMouseDown={(event) => event.stopPropagation()}>
      <button className="lightbox-close" type="button" onClick={onClose} aria-label="关闭预览"><X size={23} /></button>
      <button className="lightbox-nav previous" type="button" onClick={() => onChange((currentIndex - 1 + assets.length) % assets.length)} disabled={assets.length <= 1} aria-label="查看上一张"><ChevronLeft size={28} /></button>
      <figure className="lightbox-image"><img src={assetPath(asset.filename)} alt={asset.title} /><figcaption><span>{kindLabel[asset.kind]}</span><strong>{asset.title}.png</strong><small>{asset.width} × {asset.height} · PNG · {currentIndex + 1} / {assets.length}</small></figcaption></figure>
      <button className="lightbox-nav next" type="button" onClick={() => onChange((currentIndex + 1) % assets.length)} disabled={assets.length <= 1} aria-label="查看下一张"><ChevronRight size={28} /></button>
    </section>
  </div>
}
function OutfitCard({ outfit, compact = false }: { outfit: Outfit; compact?: boolean }) {
  return <Link className={`outfit-card ${compact ? 'compact' : ''}`} to={`/outfit/${outfit.id}`}>
    <div className="outfit-image"><ImageThumb src={outfit.cover} alt={`${outfit.name}服装预览`} /></div>
    <div className="outfit-card-copy">
      <span className="eyebrow">{outfit.category}</span>
      <strong>{outfit.name}</strong>
      <small><ImageIcon size={14} /> {outfit.assets.length} 张素材</small>
    </div>
    {!compact && <span className="round-arrow"><ArrowRight size={18} /></span>}
  </Link>
}

function HomePage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('全部')
  const filtered = useMemo(() => {
    const key = query.trim().toLowerCase()
    return outfits.filter((outfit) => {
      const haystack = [outfit.name, outfit.code, outfit.category, ...outfit.tags].join(' ').toLowerCase()
      return (category === '全部' || outfit.category === category) && (!key || haystack.includes(key))
    })
  }, [category, query])

  return <main className="home-page">
    <section className="home-top">

      <div className="hero-orbit"><Sparkles /><span>Character<br />A-SOUL</span></div>
    </section>

    <section className="content-wrap home-content">
      <div className="filter-row" aria-label="服装分类筛选">
        <form className="search-box filter-search" onSubmit={(event) => event.preventDefault()}>
          <Search size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索角色名称 / 编号 / 标签..." aria-label="搜索素材" />
          {query && <button type="button" className="clear-search" onClick={() => setQuery('')} aria-label="清除搜索"><X size={17} /></button>}
        </form>
        {categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>
          {item === '全部' ? <Grid2X2 size={18} /> : <Shirt size={18} />}{item === '全部' ? '全部素材' : item}
        </button>)}
      </div>

      <div className="section-heading"><div><h2>角色档案</h2></div><span>持续收录中</span></div>
      <div className="character-grid">
        {characters.map((character) => {
          const assetCount = character.outfits.reduce((sum, outfit) => sum + outfit.assets.length, 0)
          return <Link className="character-card bella-card" to={`/character/${character.id}`} key={character.id}>
            <ImageThumb src={character.cover} alt={`${character.name}角色档案`} />
            <div className="card-gradient" />
            <div className="character-card-copy"><p>{character.code} · A-SOUL</p><h3>{character.name}</h3><span>{character.outfits.length} 个图集 · {assetCount} 张素材</span></div>
            <span className="round-arrow filled"><ArrowRight size={19} /></span>
          </Link>
        })}
        <article className="character-card placeholder-card" aria-label="乃琳素材筹备中">
          <div className="placeholder-orb orb-1"><UserRound size={42} /></div>
          <div className="character-card-copy"><p>A-SOUL · COMING SOON</p><h3>乃琳</h3><span>素材筹备中</span></div>
          <span className="coming">敬请期待</span>
        </article>
      </div>

      <div className="section-heading outfit-heading"><div><h2>{query || category !== '全部' ? '筛选结果' : '角色素材集'}</h2></div><span>{filtered.length} 套服装</span></div>
      {filtered.length ? <div className="outfit-grid">{filtered.map((outfit) => <OutfitCard outfit={outfit} key={outfit.id} />)}</div> :
        <div className="empty-state"><Search size={29} /><h3>没有匹配的素材</h3><p>试试其他关键词或切换分类。</p><button onClick={() => { setQuery(''); setCategory('全部') }}>清除筛选</button></div>}
    </section>
  </main>
}

function CharacterPage() {
  const navigate = useNavigate()
  const { characterId } = useParams()
  const character = getCharacter(characterId) ?? characters[0]
  const [selectedId, setSelectedId] = useState(character.outfits[0].id)
  useEffect(() => setSelectedId(character.outfits[0].id), [character])
  const selected = character.outfits.find((outfit) => outfit.id === selectedId) ?? character.outfits[0]
  const assetCount = character.outfits.reduce((sum, outfit) => sum + outfit.assets.length, 0)
  return <main className="inner-page"><PageHeader><CharacterBreadcrumbs character={character} /></PageHeader>
    <section className="character-hero">
      <ImageThumb src={character.cover} alt={`${character.name}角色档案`} />
      <div className="hero-wash" />
      <div className="character-identity"><p className="script-label">{character.romanName}</p><h1>{character.name}</h1><span>A-SOUL <b>{character.code}</b></span><Tags tags={character.tags} /><p className="description">{character.description}</p></div>
      <div className="character-stats"><div><Shirt /><strong>{character.outfits.length}</strong><span>个图集</span></div><div><ImageIcon /><strong>{assetCount}</strong><span>张素材</span></div></div>
    </section>

    <section className="detail-layout">
      <div className="outfit-list-panel"><div className="section-heading"><div><p className="kicker">ASSET COLLECTIONS</p><h2>素材图集</h2></div><span>共 {character.outfits.length} 个</span></div>
        <div className="detail-outfit-grid">{character.outfits.map((outfit) => <button className={`detail-outfit ${selected.id === outfit.id ? 'selected' : ''}`} onClick={() => setSelectedId(outfit.id)} onDoubleClick={() => navigate(`/outfit/${outfit.id}`)} title="双击进入素材页" key={outfit.id}>
          <ImageThumb src={outfit.cover} alt="" /><strong>{outfit.name}</strong><small><ImageIcon size={13} /> {outfit.assets.length} 张素材</small>
        </button>)}</div>
      </div>
      <aside className="selected-panel"><div className="selected-title"><div><p className="kicker">SELECTED COLLECTION</p><h2>{selected.name}</h2></div><Link className="primary-button" to={`/outfit/${selected.id}`}><Download size={17} />查看素材</Link></div>
        <div className="selected-meta"><span><Box size={17} /> {selected.assets.length} 张素材</span><span><Grid2X2 size={17} /> {selected.assets.length} 个视图</span></div>
        <div className="preview-strip">{selected.assets.slice(0, 3).map((asset) => <div key={asset.id}><ImageThumb src={asset.filename} alt={asset.title} /><p>{kindLabel[asset.kind]}</p></div>)}</div>
        <Tags tags={selected.tags} />
      </aside>
    </section>
  </main>
}
function OutfitPage() {
  const { outfitId } = useParams()
  const outfit = getOutfit(outfitId)
  const character = getOutfitCharacter(outfitId) ?? characters[0]
  const [kind, setKind] = useState<AssetKind | 'all'>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  useEffect(() => {
    setLightboxIndex(null)
  }, [kind, outfitId])
  if (!outfit) return <Navigate to={`/outfit/${outfits[0].id}`} replace />
  const visible = kind === 'all' ? outfit.assets : outfit.assets.filter((asset) => asset.kind === kind)
  return <main className="asset-page"><PageHeader><OutfitBreadcrumbs character={character} outfit={outfit} /></PageHeader>
    <section className="asset-layout">
      <aside className="asset-sidebar"><ImageThumb src={outfit.cover} alt={`${outfit.name}封面`} /><h1>{outfit.name}</h1><p>A-SOUL · {character.name}</p><span className="id-pill">服装 ID：{outfit.code}</span><Tags tags={outfit.tags} />
        <dl><div><dt>角色 ID</dt><dd>{character.code}</dd></div><div><dt>角色名称</dt><dd>{character.name}</dd></div><div><dt>分类</dt><dd>{outfit.category}</dd></div><div><dt>资产数量</dt><dd>{outfit.assets.length} 个文件</dd></div><div><dt>文件格式</dt><dd>PNG 原始图</dd></div></dl>
      </aside>
      <section className="asset-main"><div className="asset-title"><div className="title-icon"><Shirt /></div><div><h1>服装素材</h1><p>点击缩略图即可在当前页面放大查看，使用左右按钮浏览同一服装的其他视图。</p></div></div>
        <div className="asset-filters" aria-label="素材类型筛选">{assetKinds.map((item) => <button key={item.value} className={kind === item.value ? 'active' : ''} onClick={() => setKind(item.value)}>{item.label}</button>)}</div>
        <div className="asset-grid">{visible.map((asset) => <article className="asset-card" key={asset.id}><button className={`asset-figure ${asset.kind === 'close' ? '' : 'full-figure'}`} type="button" onClick={() => setLightboxIndex(outfit.assets.findIndex((entry) => entry.id === asset.id))} aria-label={`放大查看 ${asset.title}`}><span className="asset-kind">{kindLabel[asset.kind]}</span><ImageThumb src={asset.filename} alt={asset.title} /><span className="zoom-cue"><Maximize2 size={17} />放大查看</span></button><h3>{asset.title}.png</h3><p>{asset.width} × {asset.height} · PNG</p><a className="download-button" href={assetPath(asset.filename)} download={`${asset.title}.png`}><Download size={17} />下载原图</a></article>)}</div>
      </section>
    </section>
    {lightboxIndex !== null && <AssetLightbox assets={outfit.assets} currentIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} onChange={setLightboxIndex} />}
  </main>
}
export default function App() {
  return <><ScrollToTop /><Routes><Route path="/" element={<HomePage />} /><Route path="/character/:characterId" element={<CharacterPage />} /><Route path="/outfit/:outfitId" element={<OutfitPage />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></>
}
