import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import {
  ArrowRight, Box, ChevronRight, Download, Grid2X2, Image as ImageIcon,
  PackageOpen, Search, Shirt, Sparkles, UserRound, X,
} from 'lucide-react'
import {
  assetKinds, assetPath, categories, getOutfit, kindLabel, outfits, previewPath, type AssetKind, type Outfit,
} from './data/catalog'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

function Brand({ compact = false }: { compact?: boolean }) {
  return <Link className="brand" to="/" aria-label="返回角色素材库首页">
    <span className="brand-mark"><Sparkles size={compact ? 18 : 23} /></span>
    <span>{compact ? '角色素材库' : '角色素材库'}<small>A-SOUL ASSET ARCHIVE</small></span>
  </Link>
}

function PageHeader({ breadcrumbs }: { breadcrumbs?: string[] }) {
  return <header className="page-header">
    <Brand compact />
    {breadcrumbs && <nav className="breadcrumbs" aria-label="面包屑">
      {breadcrumbs.map((crumb, index) => <span key={crumb}><ChevronRight size={15} />{crumb}</span>)}
    </nav>}
    <Link className="back-home" to="/"><Grid2X2 size={16} />浏览素材</Link>
  </header>
}

function ImageThumb({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return <img className={className} src={previewPath(src)} alt={alt} loading="lazy" decoding="async" />
}

function Tags({ tags }: { tags: string[] }) {
  return <div className="tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
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
      <div className="home-nav"><Brand />
        <form className="search-box" onSubmit={(event) => event.preventDefault()}>
          <Search size={21} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索角色名称 / 编号 / 标签..." aria-label="搜索素材" />
          {query && <button type="button" className="clear-search" onClick={() => setQuery('')} aria-label="清除搜索"><X size={17} /></button>}
          <button type="submit">搜索</button>
        </form>
      </div>
      <div className="hero-copy">
        <p className="kicker">CHARACTER COLLECTION</p>
        <h1>发现角色的<br /><em>每一种灵感</em></h1>
        <p>收录贝拉的服装素材与多视角原图，为二创、设计和收藏而准备。</p>
      </div>
      <div className="hero-orbit"><Sparkles /><span>Character<br />A-SOUL</span></div>
    </section>

    <section className="content-wrap home-content">
      <div className="filter-row" aria-label="服装分类筛选">
        {categories.map((item) => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>
          {item === '全部' ? <Grid2X2 size={18} /> : <Shirt size={18} />}{item === '全部' ? '全部素材' : item}
        </button>)}
      </div>

      <div className="section-heading"><div><p className="kicker">FEATURED CHARACTER</p><h2>角色档案</h2></div><span>持续收录中</span></div>
      <div className="character-grid">
        <Link className="character-card bella-card" to="/character/bella">
          <ImageThumb src="initial-close.png" alt="贝拉初代团服" />
          <div className="card-gradient" />
          <div className="character-card-copy"><p>CHAR-001 · A-SOUL</p><h3>贝拉</h3><span>13 套服装 · 19 张素材</span></div>
          <span className="round-arrow filled"><ArrowRight size={19} /></span>
        </Link>
        {['乃琳', '嘉然', '向晚'].map((name, index) => <article className="character-card placeholder-card" key={name} aria-label={`${name}素材筹备中`}>
          <div className={`placeholder-orb orb-${index + 1}`}><UserRound size={42} /></div>
          <div className="character-card-copy"><p>A-SOUL · COMING SOON</p><h3>{name}</h3><span>素材筹备中</span></div>
          <span className="coming">敬请期待</span>
        </article>)}
      </div>

      <div className="section-heading outfit-heading"><div><p className="kicker">BELLA OUTFITS</p><h2>{query || category !== '全部' ? '筛选结果' : '贝拉服装集'}</h2></div><span>{filtered.length} 套服装</span></div>
      {filtered.length ? <div className="outfit-grid">{filtered.map((outfit) => <OutfitCard outfit={outfit} key={outfit.id} />)}</div> :
        <div className="empty-state"><Search size={29} /><h3>没有匹配的素材</h3><p>试试其他关键词或切换分类。</p><button onClick={() => { setQuery(''); setCategory('全部') }}>清除筛选</button></div>}
    </section>
  </main>
}

function CharacterPage() {
  const [selectedId, setSelectedId] = useState(outfits[0].id)
  const selected = getOutfit(selectedId) ?? outfits[0]
  return <main className="inner-page"><PageHeader breadcrumbs={['角色素材库', '角色详情']} />
    <section className="character-hero">
      <ImageThumb src="initial-close.png" alt="贝拉角色档案" />
      <div className="hero-wash" />
      <div className="character-identity"><p className="script-label">Bella</p><h1>贝拉</h1><span>A-SOUL <b>CHAR-001</b></span><Tags tags={['紫发', '女角色', 'A-SOUL', '偶像', '可爱']} /><p className="description">A-SOUL 成员之一，拥有标志性的紫色长发与红色蝴蝶结。收录多个风格的服装造型，适用于插画、建模与宣传物料等创作场景。</p></div>
      <div className="character-stats"><div><Shirt /><strong>13</strong><span>套服装</span></div><div><ImageIcon /><strong>19</strong><span>张素材</span></div></div>
    </section>

    <section className="detail-layout">
      <div className="outfit-list-panel"><div className="section-heading"><div><p className="kicker">OUTFIT LIST</p><h2>服装列表</h2></div><span>共 13 套</span></div>
        <div className="detail-outfit-grid">{outfits.map((outfit) => <button className={`detail-outfit ${selected.id === outfit.id ? 'selected' : ''}`} onClick={() => setSelectedId(outfit.id)} key={outfit.id}>
          <ImageThumb src={outfit.cover} alt="" /><strong>{outfit.name}</strong><small><ImageIcon size={13} /> {outfit.assets.length} 张素材</small>
        </button>)}</div>
      </div>
      <aside className="selected-panel"><div className="selected-title"><div><p className="kicker">SELECTED OUTFIT</p><h2>{selected.name}</h2></div><Link className="primary-button" to={`/outfit/${selected.id}`}><Download size={17} />查看素材</Link></div>
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
  const [kind, setKind] = useState<AssetKind | 'all'>('all')
  if (!outfit) return <Navigate to={`/outfit/${outfits[0].id}`} replace />
  const visible = kind === 'all' ? outfit.assets : outfit.assets.filter((asset) => asset.kind === kind)
  return <main className="asset-page"><PageHeader breadcrumbs={['角色素材库', '贝拉', outfit.name]} />
    <section className="asset-layout">
      <aside className="asset-sidebar"><ImageThumb src={outfit.cover} alt={`${outfit.name}封面`} /><h1>{outfit.name}</h1><p>A-SOUL · 贝拉</p><span className="id-pill">服装 ID：{outfit.code}</span><Tags tags={outfit.tags} />
        <dl><div><dt>角色 ID</dt><dd>CHAR-001</dd></div><div><dt>角色名称</dt><dd>贝拉</dd></div><div><dt>分类</dt><dd>{outfit.category}</dd></div><div><dt>资产数量</dt><dd>{outfit.assets.length} 个文件</dd></div><div><dt>文件格式</dt><dd>PNG 原始图</dd></div></dl>
      </aside>
      <section className="asset-main"><div className="asset-title"><div className="title-icon"><Shirt /></div><div><h1>服装素材</h1><p>当前页面仅展示已提供的真实原始素材，可直接下载使用。</p></div></div>
        <div className="asset-filters" aria-label="素材类型筛选">{assetKinds.map((item) => <button key={item.value} className={kind === item.value ? 'active' : ''} onClick={() => setKind(item.value)}>{item.label}</button>)}</div>
        <div className="asset-grid">{visible.map((asset) => <article className="asset-card" key={asset.id}><div className="asset-figure"><span>{kindLabel[asset.kind]}</span><ImageThumb src={asset.filename} alt={asset.title} /></div><h3>{asset.title}.png</h3><p>{asset.width} × {asset.height} · PNG</p><a className="download-button" href={assetPath(asset.filename)} download={`${asset.title}.png`}><Download size={17} />下载原图</a></article>)}</div>
      </section>
    </section>
  </main>
}

export default function App() {
  return <><ScrollToTop /><Routes><Route path="/" element={<HomePage />} /><Route path="/character/bella" element={<CharacterPage />} /><Route path="/outfit/:outfitId" element={<OutfitPage />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></>
}
