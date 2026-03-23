import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext, useParams, Link } from 'react-router-dom';

// ── Block type definitions ─────────────────────────────────────────────────
const BLOCK_TYPES = [
  { type:'text',       label:'Text / Heading',     icon:'T',  desc:'Title, body text, optional CTA' },
  { type:'image',      label:'Image',               icon:'▣',  desc:'Single image or background gradient' },
  { type:'stats',      label:'Stats Row',           icon:'#',  desc:'2–4 numbered stat cards' },
  { type:'cta',        label:'Call to Action',      icon:'→',  desc:'Centered CTA with title and buttons' },
  { type:'divider',    label:'Divider / Spacer',    icon:'—',  desc:'Visual separator or whitespace' },
  { type:'marquee',    label:'Marquee Ticker',      icon:'≫',  desc:'Scrolling text ticker' },
  { type:'about',      label:'About Section',       icon:'◎',  desc:'About with skills and experience' },
  { type:'contact',    label:'Contact Form',        icon:'✉',  desc:'Full contact form' },
];

const BLOCK_DEFAULTS = {
  text:    { label:'', title:'New Section', titleAccent:'', body:'Enter your text here...', align:'left', maxWidth:800, cta:'', ctaLink:'#' },
  image:   { src:'', alt:'', caption:'', height:400, gradient:'linear-gradient(135deg,#0d0d0d,#080808)' },
  stats:   { stats:[{ num:'1', label:'Label', description:'' },{ num:'2', label:'Label', description:'' },{ num:'3', label:'Label', description:'' }] },
  cta:     { label:'', title:'Ready to start?', titleAccent:'start?', subtitle:'', primaryLabel:'Contact me →', primaryLink:'#contact', secondaryLabel:'View Works', secondaryLink:'/works' },
  divider: { style:'gradient', height:60, padding:'2rem 3.5rem' },
  marquee: { items:['Cinema 4D','After Effects','Blender','Houdini VFX','Motion Design','Brand Identity'] },
  about:   { label:'About', title:'I build digital', titleAccent:'worlds', body:'Enter description...', skills:[], ctaLabel:"Let's collaborate →", ctaLink:'#contact', experience:[] },
  contact: { label:'Contact', title:'Start a new', titleAccent:'project', subtitle:'Have an idea? Let\'s turn it into something memorable.' },
};

const PAGES = [
  { slug:'home',       label:'Home' },
  { slug:'works',      label:'Works' },
  { slug:'playground', label:'Lab / Playground' },
];

const S = `
.pb{font-family:'Syne',sans-serif;display:flex;flex-direction:column;height:calc(100vh - 80px);overflow:hidden;margin:-2.5rem -2rem 0}
.pb-bar{display:flex;align-items:center;gap:1rem;padding:.8rem 1.5rem;border-bottom:1px solid rgba(244,242,238,.18);background:rgba(5,13,13,.95);flex-shrink:0;flex-wrap:wrap}
.pb-page-btn{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.12em;padding:7px 16px;border:1px solid rgba(244,242,238,.2);color:rgba(168,200,200,.5);background:none;text-transform:uppercase;transition:all .2s;flex-shrink:0}
.pb-page-btn.a{border-color:rgba(244,242,238,.7);color:rgba(244,242,238,.7);background:rgba(244,242,238,.15)}
.pb-page-btn:hover{border-color:rgba(244,242,238,.4);color:#e8f4f4}
.pb-save{padding:8px 24px;background:#f4f2ee;border:none;color:#080808;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;cursor:auto;transition:background .2s;margin-left:auto;flex-shrink:0}
.pb-save:hover:not(:disabled){background:rgba(244,242,238,.7)}
.pb-save:disabled{opacity:.5}
.pb-status{font-family:'JetBrains Mono',monospace;font-size:10px;flex-shrink:0}
.pb-status.ok{color:rgba(244,242,238,.7)}.pb-status.err{color:rgba(239,68,68,.8)}

.pb-body{display:flex;flex:1;overflow:hidden}

/* Left panel — block list */
.pb-left{width:260px;flex-shrink:0;border-right:1px solid rgba(244,242,238,.15);display:flex;flex-direction:column;overflow:hidden}
.pb-left-title{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.26em;color:rgba(244,242,238,.5);text-transform:uppercase;padding:.8rem 1rem;border-bottom:1px solid rgba(244,242,238,.1)}
.pb-block-list{flex:1;overflow-y:auto;padding:.5rem}
.pb-block-item{display:flex;align-items:flex-start;gap:.7rem;padding:.7rem .8rem;border:1px solid rgba(244,242,238,.12);background:rgba(244,242,238,.3);margin-bottom:4px;cursor:grab;transition:all .2s;position:relative}
.pb-block-item.dragging{opacity:.4;border-color:rgba(244,242,238,.4)}
.pb-block-item.drag-over{border-top:2px solid rgba(244,242,238,.7)}
.pb-block-item.selected{border-color:rgba(244,242,238,.5);background:rgba(244,242,238,.2)}
.pb-block-icon{width:28px;height:28px;background:rgba(244,242,238,.4);border:1px solid rgba(244,242,238,.25);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:12px;color:rgba(244,242,238,.7);flex-shrink:0}
.pb-block-info{flex:1;min-width:0}
.pb-block-name{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.1em;color:rgba(168,200,200,.8);text-transform:uppercase}
.pb-block-preview{font-size:11px;color:rgba(168,200,200,.35);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:1px}
.pb-block-actions{display:flex;gap:2px;opacity:0;transition:opacity .2s;flex-shrink:0}
.pb-block-item:hover .pb-block-actions{opacity:1}
.pb-act-btn{width:22px;height:22px;background:none;border:1px solid rgba(244,242,238,.2);color:rgba(168,200,200,.4);font-size:11px;display:flex;align-items:center;justify-content:center;transition:all .2s}
.pb-act-btn:hover{border-color:rgba(244,242,238,.7);color:rgba(244,242,238,.7)}
.pb-act-btn.del:hover{border-color:rgba(239,68,68,.4);color:rgba(239,68,68,.7)}

/* Add block panel */
.pb-add-panel{border-top:1px solid rgba(244,242,238,.12);padding:.6rem}
.pb-add-title{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.22em;color:rgba(244,242,238,.45);text-transform:uppercase;padding:.3rem .2rem .6rem}
.pb-add-grid{display:grid;grid-template-columns:1fr 1fr;gap:4px}
.pb-add-type{padding:.6rem .5rem;border:1px solid rgba(244,242,238,.15);background:rgba(244,242,238,.2);display:flex;flex-direction:column;align-items:center;gap:.3rem;cursor:auto;transition:all .2s;text-align:center}
.pb-add-type:hover{border-color:rgba(244,242,238,.4);background:rgba(244,242,238,.15)}
.pb-add-icon{font-family:'JetBrains Mono',monospace;font-size:14px;color:rgba(244,242,238,.6)}
.pb-add-label{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.1em;color:rgba(168,200,200,.5);text-transform:uppercase}

/* Right panel — block editor */
.pb-right{flex:1;overflow-y:auto;padding:1.5rem}
.pb-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:1rem;color:rgba(168,200,200,.3);font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.14em;text-align:center}
.pb-edit-header{display:flex;align-items:center;gap:.8rem;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:1px solid rgba(244,242,238,.15)}
.pb-edit-icon{width:36px;height:36px;background:rgba(244,242,238,.4);border:1px solid rgba(244,242,238,.3);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:14px;color:rgba(244,242,238,.7);flex-shrink:0}
.pb-edit-type{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.2em;color:rgba(244,242,238,.6);text-transform:uppercase}
.pb-edit-id{font-family:'JetBrains Mono',monospace;font-size:8px;color:rgba(168,200,200,.25)}

/* Field styles */
.pf{display:flex;flex-direction:column;gap:.4rem;margin-bottom:1rem}
.pl{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.22em;color:rgba(168,200,200,.38);text-transform:uppercase}
.ph{font-family:'JetBrains Mono',monospace;font-size:8px;color:rgba(168,200,200,.22);margin-top:2px}
.pi{background:rgba(14,60,60,.3);border:1px solid rgba(244,242,238,.2);color:#e8f4f4;padding:10px 12px;font-family:'Syne',sans-serif;font-size:13px;font-weight:400;outline:none;transition:border-color .2s;width:100%}
.pi:focus{border-color:rgba(244,242,238,.5);background:rgba(244,242,238,.2)}
.pi::placeholder{color:rgba(168,200,200,.2)}
textarea.pi{resize:vertical;min-height:80px;line-height:1.65}
select.pi{appearance:none}
.pr2{display:grid;grid-template-columns:1fr 1fr;gap:.8rem}
.fs2{background:rgba(244,242,238,.4);border:1px solid rgba(244,242,238,.18);padding:1.2rem;margin-bottom:1rem;position:relative}
.fs2::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(244,242,238,.7),transparent)}
.fs2t{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.24em;color:rgba(244,242,238,.55);text-transform:uppercase;margin-bottom:1rem}
.chip-wrap{display:flex;gap:.3rem;flex-wrap:wrap;padding:.5rem;background:rgba(14,60,60,.25);border:1px solid rgba(244,242,238,.18);min-height:40px;align-items:center}
.chip{font-family:'JetBrains Mono',monospace;font-size:9px;padding:3px 8px;background:rgba(244,242,238,.3);border:1px solid rgba(244,242,238,.3);color:rgba(244,242,238,.7);display:flex;align-items:center;gap:4px}
.chip button{background:none;border:none;color:rgba(244,242,238,.7);font-size:12px;line-height:1;padding:0;cursor:auto}
.chip-inp{background:none;border:none;color:#e8f4f4;font-family:'Syne',sans-serif;font-size:13px;outline:none;flex:1;min-width:100px;padding:2px 4px}
.chip-inp::placeholder{color:rgba(168,200,200,.2)}
.exp-item{background:rgba(14,60,60,.2);border:1px solid rgba(244,242,238,.12);padding:.8rem;margin-bottom:.5rem;position:relative}
.exp-del{position:absolute;top:.4rem;right:.4rem;background:none;border:none;color:rgba(239,68,68,.5);font-size:13px;cursor:auto}
.stat-item{background:rgba(14,60,60,.2);border:1px solid rgba(244,242,238,.12);padding:.8rem;margin-bottom:.5rem}
.add-row-btn{width:100%;padding:8px;background:none;border:1px dashed rgba(244,242,238,.2);color:rgba(168,200,200,.35);font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.12em;text-transform:uppercase;cursor:auto;transition:all .2s;margin-top:.3rem}
.add-row-btn:hover{border-color:rgba(244,242,238,.35);color:rgba(244,242,238,.7)}
`;

// ── Generic field components ───────────────────────────────────────────────
function Field({ label, hint, children }) {
  return (
    <div className="pf">
      <label className="pl">{label}</label>
      {children}
      {hint && <span className="ph">{hint}</span>}
    </div>
  );
}
const Input = ({ value, onChange, placeholder, type='text' }) => (
  <input className="pi" type={type} value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder}/>
);
const Textarea = ({ value, onChange, placeholder, rows=3 }) => (
  <textarea className="pi" rows={rows} value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder}/>
);
const Select = ({ value, onChange, options }) => (
  <select className="pi" value={value || ''} onChange={e => onChange(e.target.value)}>
    {options.map(o => typeof o === 'string' ? <option key={o} value={o}>{o}</option> : <option key={o.value} value={o.value}>{o.label}</option>)}
  </select>
);

// ── Block-specific editors ─────────────────────────────────────────────────
function ChipEditor({ values=[], onChange, placeholder='Add item...' }) {
  const [inp, setInp] = useState('');
  const add = e => {
    if ((e.key === 'Enter' || e.key === ',') && inp.trim()) {
      e.preventDefault();
      if (!values.includes(inp.trim())) onChange([...values, inp.trim()]);
      setInp('');
    }
  };
  return (
    <div className="chip-wrap">
      {values.map(v => <span className="chip" key={v}>{v}<button type="button" onClick={() => onChange(values.filter(x => x !== v))}>×</button></span>)}
      <input className="chip-inp" placeholder={placeholder} value={inp} onChange={e => setInp(e.target.value)} onKeyDown={add}/>
    </div>
  );
}

function TextEditor({ data, onChange }) {
  const s = k => v => onChange({ ...data, [k]: v });
  return (
    <>
      <div className="pr2">
        <Field label="Section label"><Input value={data.label} onChange={s('label')} placeholder="About"/></Field>
        <Field label="Alignment"><Select value={data.align} onChange={s('align')} options={['left','center','right']}/></Field>
      </div>
      <div className="pr2">
        <Field label="Title"><Input value={data.title} onChange={s('title')} placeholder="Section Title"/></Field>
        <Field label="Accent word (teal)"><Input value={data.titleAccent} onChange={s('titleAccent')} placeholder="highlight"/></Field>
      </div>
      <Field label="Body text"><Textarea value={data.body} onChange={s('body')} rows={4} placeholder="Your text content..."/></Field>
      <div className="pr2">
        <Field label="CTA Button label"><Input value={data.cta} onChange={s('cta')} placeholder="Learn more →"/></Field>
        <Field label="CTA Link"><Input value={data.ctaLink} onChange={s('ctaLink')} placeholder="/works or #contact"/></Field>
      </div>
      <Field label="Max width (px)" hint="Default 800"><Input value={data.maxWidth} onChange={v => s('maxWidth')(parseInt(v)||800)} placeholder="800"/></Field>
    </>
  );
}

function ImageEditor({ data, onChange }) {
  const s = k => v => onChange({ ...data, [k]: v });
  return (
    <>
      <Field label="Image URL" hint="Or leave blank to use gradient"><Input value={data.src} onChange={s('src')} placeholder="https://... or /uploads/..."/></Field>
      {data.src && <div style={{ marginBottom:'1rem' }}><img src={data.src} alt="" style={{ width:'100%', height:120, objectFit:'cover' }}/></div>}
      <Field label="Gradient (used when no image)" hint="CSS gradient"><Input value={data.gradient} onChange={s('gradient')} placeholder="linear-gradient(...)"/></Field>
      <div className="pr2">
        <Field label="Height (px)"><Input value={data.height} onChange={v => s('height')(parseInt(v)||400)} placeholder="400"/></Field>
        <Field label="Caption"><Input value={data.caption} onChange={s('caption')} placeholder="Optional caption"/></Field>
      </div>
      <Field label="Alt text"><Input value={data.alt} onChange={s('alt')} placeholder="Describe the image"/></Field>
    </>
  );
}

function StatsEditor({ data, onChange }) {
  const stats = data.stats || [];
  const setS = (i, k, v) => { const n = [...stats]; n[i] = { ...n[i], [k]: v }; onChange({ ...data, stats: n }); };
  const addS  = () => onChange({ ...data, stats: [...stats, { num:'0', label:'', description:'' }] });
  const delS  = i  => onChange({ ...data, stats: stats.filter((_,idx) => idx !== i) });
  return (
    <>
      {stats.map((s, i) => (
        <div className="stat-item" key={i}>
          <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:8, color:'rgba(244,242,238,.5)', marginBottom:'.6rem', letterSpacing:'.2em', textTransform:'uppercase', display:'flex', justifyContent:'space-between' }}>
            Stat {i+1} <button style={{ background:'none', border:'none', color:'rgba(239,68,68,.5)', cursor:'auto', fontSize:12 }} onClick={() => delS(i)}>✕</button>
          </p>
          <div className="pr2">
            <Field label="Number"><Input value={s.num} onChange={v => setS(i,'num',v)} placeholder="6+"/></Field>
            <Field label="Label"><Input value={s.label} onChange={v => setS(i,'label',v)} placeholder="Years"/></Field>
          </div>
          <Field label="Description (optional)"><Input value={s.description} onChange={v => setS(i,'description',v)} placeholder="Short note"/></Field>
        </div>
      ))}
      <button className="add-row-btn" onClick={addS}>+ Add stat</button>
    </>
  );
}

function CTAEditor({ data, onChange }) {
  const s = k => v => onChange({ ...data, [k]: v });
  return (
    <>
      <Field label="Label (small text above)"><Input value={data.label} onChange={s('label')} placeholder="Get in touch"/></Field>
      <div className="pr2">
        <Field label="Title"><Input value={data.title} onChange={s('title')} placeholder="Ready to start?"/></Field>
        <Field label="Accent word"><Input value={data.titleAccent} onChange={s('titleAccent')} placeholder="start?"/></Field>
      </div>
      <Field label="Subtitle"><Input value={data.subtitle} onChange={s('subtitle')} placeholder="Short description..."/></Field>
      <div className="pr2">
        <Field label="Primary button"><Input value={data.primaryLabel} onChange={s('primaryLabel')} placeholder="Contact me →"/></Field>
        <Field label="Primary link"><Input value={data.primaryLink} onChange={s('primaryLink')} placeholder="#contact"/></Field>
      </div>
      <div className="pr2">
        <Field label="Secondary button"><Input value={data.secondaryLabel} onChange={s('secondaryLabel')} placeholder="View Works"/></Field>
        <Field label="Secondary link"><Input value={data.secondaryLink} onChange={s('secondaryLink')} placeholder="/works"/></Field>
      </div>
    </>
  );
}

function DividerEditor({ data, onChange }) {
  const s = k => v => onChange({ ...data, [k]: v });
  return (
    <>
      <Field label="Style"><Select value={data.style} onChange={s('style')} options={['line','gradient','space']}/></Field>
      {data.style === 'space' && <Field label="Height (px)"><Input value={data.height} onChange={v => s('height')(parseInt(v)||60)} placeholder="60"/></Field>}
    </>
  );
}

function MarqueeEditor({ data, onChange }) {
  return (
    <Field label="Items (Enter to add)">
      <ChipEditor values={data.items || []} onChange={v => onChange({ ...data, items: v })} placeholder="Add item..."/>
    </Field>
  );
}

function AboutEditor({ data, onChange }) {
  const s = k => v => onChange({ ...data, [k]: v });
  const setExp = (i, k, v) => { const e = [...(data.experience||[])]; e[i]={...e[i],[k]:v}; s('experience')(e); };
  const addExp = () => s('experience')([...(data.experience||[]),{ title:'', company:'', year:'' }]);
  const delExp = i => s('experience')((data.experience||[]).filter((_,idx)=>idx!==i));
  return (
    <>
      <div className="pr2">
        <Field label="Label"><Input value={data.label} onChange={s('label')} placeholder="About"/></Field>
        <Field label="CTA Button"><Input value={data.ctaLabel} onChange={s('ctaLabel')} placeholder="Let's collaborate →"/></Field>
      </div>
      <div className="pr2">
        <Field label="Title"><Input value={data.title} onChange={s('title')} placeholder="I build digital"/></Field>
        <Field label="Accent (last word)"><Input value={data.titleAccent} onChange={s('titleAccent')} placeholder="worlds"/></Field>
      </div>
      <Field label="Body text"><Textarea value={data.body} onChange={s('body')} rows={4}/></Field>
      <div className="fs2">
        <p className="fs2t">Skills</p>
        <ChipEditor values={data.skills||[]} onChange={s('skills')} placeholder="Add skill..."/>
      </div>
      <div className="fs2">
        <p className="fs2t">Experience</p>
        {(data.experience||[]).map((e,i)=>(
          <div className="exp-item" key={i}>
            <button className="exp-del" onClick={()=>delExp(i)}>✕</button>
            <div className="pr2">
              <Field label="Job title"><Input value={e.title} onChange={v=>setExp(i,'title',v)} placeholder="Senior VFX Artist"/></Field>
              <Field label="Year"><Input value={e.year} onChange={v=>setExp(i,'year',v)} placeholder="2022–Now"/></Field>
            </div>
            <Field label="Company"><Input value={e.company} onChange={v=>setExp(i,'company',v)} placeholder="Studio · City"/></Field>
          </div>
        ))}
        <button className="add-row-btn" onClick={addExp}>+ Add experience</button>
      </div>
    </>
  );
}

function ContactEditor({ data, onChange }) {
  const s = k => v => onChange({ ...data, [k]: v });
  return (
    <>
      <Field label="Section label"><Input value={data.label} onChange={s('label')} placeholder="Contact"/></Field>
      <div className="pr2">
        <Field label="Title"><Input value={data.title} onChange={s('title')} placeholder="Start a new"/></Field>
        <Field label="Accent"><Input value={data.titleAccent} onChange={s('titleAccent')} placeholder="project"/></Field>
      </div>
      <Field label="Subtitle"><Input value={data.subtitle} onChange={s('subtitle')} placeholder="Have an idea?"/></Field>
    </>
  );
}

function PageHeaderEditor({ data, onChange }) {
  const s = k => v => onChange({ ...data, [k]: v });
  return (
    <>
      <Field label="Label"><Input value={data.label} onChange={s('label')} placeholder="Portfolio"/></Field>
      <div className="pr2">
        <Field label="Title"><Input value={data.title} onChange={s('title')} placeholder="Creative"/></Field>
        <Field label="Accent"><Input value={data.titleAccent} onChange={s('titleAccent')} placeholder="Works"/></Field>
      </div>
      <Field label="Subtitle"><Input value={data.subtitle} onChange={s('subtitle')} placeholder="Short description..."/></Field>
    </>
  );
}

const EDITORS = {
  text: TextEditor, image: ImageEditor, stats: StatsEditor,
  cta: CTAEditor, divider: DividerEditor, marquee: MarqueeEditor,
  about: AboutEditor, contact: ContactEditor, page_header: PageHeaderEditor,
};

const ICONS = Object.fromEntries(BLOCK_TYPES.map(b => [b.type, b.icon]));
const LABELS = Object.fromEntries(BLOCK_TYPES.map(b => [b.type, b.label]));
ICONS.hero = '◈'; LABELS.hero = 'Hero Section';
ICONS.page_header = '≡'; LABELS.page_header = 'Page Header';
ICONS.works_grid = '⊞'; LABELS.works_grid = 'Works Grid';
ICONS.experiments_grid = '⊞'; LABELS.experiments_grid = 'Lab Grid';

function getPreview(block) {
  const d = block.data || {};
  return d.title || d.name || d.eyebrow || d.body?.slice(0,40) || block.type;
}

// ── Main PageBuilder component ─────────────────────────────────────────────
export default function AdminPageBuilder() {
  const { authFetch } = useOutletContext();
  const [activePage, setActivePage] = useState('home');
  const [blocks,     setBlocks]     = useState([]);
  const [selected,   setSelected]   = useState(null);
  const [saving,     setSaving]     = useState(false);
  const [status,     setStatus]     = useState({ type:'', msg:'' });
  const [dragIdx,    setDragIdx]    = useState(null);
  const [dragOver,   setDragOver]   = useState(null);

  useEffect(() => {
    fetch(`/api/pages/${activePage}`)
      .then(r => r.json())
      .then(d => { if (d.success) { setBlocks(d.data.blocks || []); setSelected(null); } });
  }, [activePage]);

  const save = async () => {
    setSaving(true); setStatus({ type:'', msg:'' });
    try {
      const r = await authFetch(`/api/pages/${activePage}`, { method:'PUT', body: JSON.stringify({ blocks }) });
      const d = await r.json();
      if (d.success) setStatus({ type:'ok', msg:'✓ Saved' });
      else setStatus({ type:'err', msg:'✗ ' + d.error });
    } catch { setStatus({ type:'err', msg:'✗ Save failed' }); }
    setSaving(false);
    setTimeout(() => setStatus({ type:'', msg:'' }), 3000);
  };

  const addBlock = (type) => {
    const id = Date.now().toString(36);
    const newBlock = { id, type, data: { ...(BLOCK_DEFAULTS[type] || {}) } };
    setBlocks(b => [...b, newBlock]);
    setSelected(id);
  };

  const updateBlock = (id, data) => setBlocks(b => b.map(bl => bl.id === id ? { ...bl, data } : bl));
  const deleteBlock = (id) => { setBlocks(b => b.filter(bl => bl.id !== id)); if (selected === id) setSelected(null); };
  const moveBlock   = (id, dir) => {
    const idx = blocks.findIndex(b => b.id === id);
    if ((dir === -1 && idx === 0) || (dir === 1 && idx === blocks.length - 1)) return;
    const nb = [...blocks]; [nb[idx], nb[idx + dir]] = [nb[idx + dir], nb[idx]];
    setBlocks(nb);
  };

  // Drag & drop
  const onDragStart = (i) => setDragIdx(i);
  const onDragOver  = (e, i) => { e.preventDefault(); setDragOver(i); };
  const onDrop      = (i) => {
    if (dragIdx === null || dragIdx === i) return;
    const nb = [...blocks]; const [moved] = nb.splice(dragIdx, 1); nb.splice(i, 0, moved);
    setBlocks(nb); setDragIdx(null); setDragOver(null);
  };

  const selectedBlock = blocks.find(b => b.id === selected);
  const Editor = selectedBlock ? EDITORS[selectedBlock.type] : null;

  return (
    <><style>{S}</style>
      <div className="pb">
        {/* Top bar */}
        <div className="pb-bar">
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:8, letterSpacing:'.26em', color:'rgba(244,242,238,.5)', textTransform:'uppercase', flexShrink:0 }}>Page</span>
          {PAGES.map(p => (
            <button key={p.slug} className={`pb-page-btn${activePage === p.slug ? ' a' : ''}`} onClick={() => setActivePage(p.slug)}>{p.label}</button>
          ))}
          {status.msg && <span className={`pb-status ${status.type}`}>{status.msg}</span>}
          <button className="pb-save" onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save Page →'}</button>
          <a href={activePage === 'home' ? '/' : activePage === 'playground' ? '/playground' : '/works'} target="_blank" rel="noopener"
             style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:'.12em', color:'rgba(168,200,200,.35)', textDecoration:'none', textTransform:'uppercase', flexShrink:0, transition:'color .2s' }}
             onMouseEnter={e=>e.target.style.color='rgba(244,242,238,.7)'} onMouseLeave={e=>e.target.style.color='rgba(168,200,200,.35)'}>↗ Preview</a>
        </div>

        <div className="pb-body">
          {/* Left — block list + add panel */}
          <div className="pb-left">
            <div className="pb-left-title">Blocks — {blocks.length}</div>
            <div className="pb-block-list">
              {blocks.length === 0 && (
                <div style={{ padding:'2rem', textAlign:'center', fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:'rgba(168,200,200,.25)', letterSpacing:'.12em' }}>
                  No blocks yet.<br/>Add one below.
                </div>
              )}
              {blocks.map((block, i) => (
                <div key={block.id}
                  className={`pb-block-item${block.id === selected ? ' selected' : ''}${dragIdx === i ? ' dragging' : ''}${dragOver === i && dragIdx !== i ? ' drag-over' : ''}`}
                  draggable onDragStart={() => onDragStart(i)} onDragOver={e => onDragOver(e, i)} onDrop={() => onDrop(i)} onDragEnd={() => { setDragIdx(null); setDragOver(null); }}
                  onClick={() => setSelected(block.id)}>
                  <div className="pb-block-icon">{ICONS[block.type] || '?'}</div>
                  <div className="pb-block-info">
                    <div className="pb-block-name">{LABELS[block.type] || block.type}</div>
                    <div className="pb-block-preview">{getPreview(block)}</div>
                  </div>
                  <div className="pb-block-actions">
                    <button className="pb-act-btn" title="Move up"    onClick={e => { e.stopPropagation(); moveBlock(block.id, -1); }}>↑</button>
                    <button className="pb-act-btn" title="Move down"  onClick={e => { e.stopPropagation(); moveBlock(block.id, +1); }}>↓</button>
                    <button className="pb-act-btn del" title="Delete" onClick={e => { e.stopPropagation(); deleteBlock(block.id); }}>✕</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add block panel */}
            <div className="pb-add-panel">
              <div className="pb-add-title">Add block</div>
              <div className="pb-add-grid">
                {BLOCK_TYPES.map(bt => (
                  <button key={bt.type} className="pb-add-type" onClick={() => addBlock(bt.type)} title={bt.desc}>
                    <span className="pb-add-icon">{bt.icon}</span>
                    <span className="pb-add-label">{bt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right — block editor */}
          <div className="pb-right">
            {!selectedBlock ? (
              <div className="pb-empty">
                <span style={{ fontSize:24, opacity:.3 }}>◈</span>
                Select a block to edit<br/>
                <span style={{ fontSize:9, opacity:.5 }}>or drag to reorder</span>
              </div>
            ) : (
              <>
                <div className="pb-edit-header">
                  <div className="pb-edit-icon">{ICONS[selectedBlock.type] || '?'}</div>
                  <div>
                    <div className="pb-edit-type">{LABELS[selectedBlock.type] || selectedBlock.type}</div>
                    <div className="pb-edit-id">ID: {selectedBlock.id}</div>
                  </div>
                </div>

                {Editor ? (
                  <Editor
                    data={selectedBlock.data}
                    onChange={data => updateBlock(selectedBlock.id, data)}
                  />
                ) : (
                  <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:'rgba(168,200,200,.4)', letterSpacing:'.12em' }}>
                    This block type ({selectedBlock.type}) is a system block and cannot be edited here. It renders automatically from the site content.
                  </div>
                )}

                <div style={{ marginTop:'2rem', paddingTop:'1rem', borderTop:'1px solid rgba(244,242,238,.12)', display:'flex', gap:'.8rem' }}>
                  <button onClick={() => moveBlock(selectedBlock.id, -1)} style={{ padding:'7px 14px', background:'none', border:'1px solid rgba(244,242,238,.2)', color:'rgba(168,200,200,.4)', fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:'.1em', cursor:'auto' }}>↑ Move up</button>
                  <button onClick={() => moveBlock(selectedBlock.id, +1)} style={{ padding:'7px 14px', background:'none', border:'1px solid rgba(244,242,238,.2)', color:'rgba(168,200,200,.4)', fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:'.1em', cursor:'auto' }}>↓ Move down</button>
                  <button onClick={() => deleteBlock(selectedBlock.id)} style={{ padding:'7px 14px', background:'none', border:'1px solid rgba(239,68,68,.25)', color:'rgba(239,68,68,.6)', fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:'.1em', cursor:'auto', marginLeft:'auto' }}>✕ Delete block</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
