import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useOutletContext, Link } from 'react-router-dom';

const CATS  = [{id:'brand',l:'Brand Identity'},{id:'ui',l:'UI / UX'},{id:'motion',l:'Motion Design'},{id:'3d',l:'3D / VFX'},{id:'print',l:'Print / Packaging'},{id:'web',l:'Web / Digital'}];
const LAYOUTS = ['large','tall','medium','small'];
const GRADS = [
  {l:'Teal',   v:'radial-gradient(ellipse at 25% 30%,rgba(244,242,238,.65),rgba(5,13,13,.95) 65%),linear-gradient(135deg,#0d0d0d,#080808)'},
  {l:'Deep',   v:'radial-gradient(ellipse at 70% 25%,rgba(9,50,50,.8),rgba(5,13,13,.95) 65%),linear-gradient(135deg,#091a1a,#080808)'},
  {l:'Cyan',   v:'radial-gradient(ellipse at 50% 60%,rgba(6,182,212,.35),rgba(5,13,13,.95) 65%),linear-gradient(135deg,#001419,#080808)'},
  {l:'Purple', v:'radial-gradient(ellipse at 30% 50%,rgba(124,92,191,.4),rgba(5,13,13,.95) 65%),linear-gradient(135deg,#100a1e,#080808)'},
  {l:'Green',  v:'radial-gradient(ellipse at 65% 35%,rgba(16,185,129,.3),rgba(5,13,13,.95) 65%),linear-gradient(135deg,#001209,#080808)'},
  {l:'Slate',  v:'radial-gradient(ellipse at 40% 30%,rgba(100,116,139,.4),rgba(5,13,13,.95) 65%),linear-gradient(135deg,#0f1215,#080808)'},
];

const S = `
.af{font-family:'Syne',sans-serif;max-width:860px}
.afh{display:flex;align-items:center;gap:1rem;margin-bottom:2rem}
.bk{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.14em;color:rgba(168,200,200,.5);text-decoration:none;padding:6px 12px;border:1px solid rgba(244,242,238,.2);transition:all .2s}
.bk:hover{color:#e8f4f4;border-color:rgba(244,242,238,.4)}
.afh h1{font-family:'Syne',sans-serif;font-size:1.8rem;font-weight:800;color:#e8f4f4;letter-spacing:-.02em}
.tabs{display:flex;gap:0;border-bottom:1px solid rgba(244,242,238,.15);margin-bottom:1.5rem}
.tab{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.12em;padding:10px 20px;background:none;border:none;color:rgba(168,200,200,.4);transition:all .2s;border-bottom:2px solid transparent;margin-bottom:-1px;text-transform:uppercase}
.tab.a{color:rgba(244,242,238,.7);border-bottom-color:rgba(244,242,238,.7)}
.tab:hover{color:#e8f4f4}
.prev{width:100%;aspect-ratio:16/7;margin-bottom:1rem;display:flex;align-items:center;justify-content:center;background-size:cover;background-position:center;position:relative;overflow:hidden}
.prev-t{font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:rgba(255,255,255,.4);letter-spacing:-.02em}
.fs{background:rgba(244,242,238,.4);border:1px solid rgba(244,242,238,.18);padding:1.5rem;margin-bottom:1rem}
.fst{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.24em;color:rgba(244,242,238,.6);text-transform:uppercase;margin-bottom:1.2rem}
.fr{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem}
.fr3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;margin-bottom:1rem}
.fg2{display:flex;flex-direction:column;gap:.4rem;margin-bottom:1rem}
.fg2:last-child{margin-bottom:0}
.fl2{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.22em;color:rgba(168,200,200,.38);text-transform:uppercase}
.fi2{background:rgba(14,60,60,.3);border:1px solid rgba(244,242,238,.2);color:#e8f4f4;padding:11px 13px;font-family:'Syne',sans-serif;font-size:13px;font-weight:400;outline:none;transition:border-color .2s;width:100%}
.fi2:focus{border-color:rgba(244,242,238,.5);background:rgba(244,242,238,.2)}
.fi2::placeholder{color:rgba(168,200,200,.2)}
textarea.fi2{resize:vertical;min-height:90px;line-height:1.65}
select.fi2{appearance:none}
/* Upload */
.uarea{border:2px dashed rgba(244,242,238,.25);padding:2rem;text-align:center;transition:all .2s;position:relative;background:rgba(244,242,238,.2)}
.uarea:hover,.uarea.drag{border-color:rgba(244,242,238,.55);background:rgba(244,242,238,.1)}
.uarea input[type=file]{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%}
.u-lbl{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.12em;color:rgba(168,200,200,.45);display:flex;flex-direction:column;gap:.5rem;align-items:center;pointer-events:none}
.u-icon{font-size:22px;color:rgba(244,242,238,.45);margin-bottom:.3rem}
.u-hint{font-size:8px;color:rgba(168,200,200,.25);letter-spacing:.1em}
.uploading{display:flex;align-items:center;gap:.8rem;padding:.75rem 1rem;background:rgba(244,242,238,.2);border:1px solid rgba(244,242,238,.25);font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(244,242,238,.7);margin-top:.5rem}
.uspin{width:14px;height:14px;border:1.5px solid rgba(244,242,238,.3);border-top-color:rgba(244,242,238,.7);border-radius:50%;animation:spin .7s linear infinite;flex-shrink:0}
@keyframes spin{to{transform:rotate(360deg)}}
.img-wrap{position:relative;margin-top:.8rem}
.img-prev{width:100%;aspect-ratio:16/6;object-fit:cover}
.img-rm{position:absolute;top:.5rem;right:.5rem;background:rgba(239,68,68,.85);border:none;color:#fff;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.1em;padding:4px 10px}
/* Gallery grid */
.gal-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:.6rem;margin-top:.8rem}
.gal-item{aspect-ratio:4/3;position:relative;overflow:hidden;background:rgba(14,60,60,.3);border:1px solid rgba(244,242,238,.15)}
.gal-item img{width:100%;height:100%;object-fit:cover;display:block}
.gal-del{position:absolute;top:3px;right:3px;background:rgba(239,68,68,.9);border:none;color:#fff;font-size:12px;padding:2px 7px;line-height:1}
.gal-add{aspect-ratio:4/3;border:2px dashed rgba(244,242,238,.2);display:flex;align-items:center;justify-content:center;font-size:20px;color:rgba(168,200,200,.25);background:none;transition:all .2s;position:relative;overflow:hidden}
.gal-add:hover{border-color:rgba(244,242,238,.4);color:rgba(244,242,238,.6)}
.gal-add input[type=file]{position:absolute;inset:0;opacity:0;cursor:pointer}
/* Gradient picker */
.gg{display:grid;grid-template-columns:repeat(6,1fr);gap:.5rem}
.go{aspect-ratio:3/2;border:2px solid transparent;transition:border-color .2s;position:relative;cursor:pointer}
.go.sel{border-color:rgba(244,242,238,.7)}
.gol{position:absolute;bottom:0;left:0;right:0;background:rgba(5,13,13,.8);font-family:'JetBrains Mono',monospace;font-size:7px;color:rgba(168,200,200,.6);padding:3px;text-align:center}
/* Tags */
.tw{display:flex;gap:.4rem;flex-wrap:wrap;padding:.5rem;background:rgba(14,60,60,.25);border:1px solid rgba(244,242,238,.18);min-height:42px;align-items:center}
.tc2{font-family:'JetBrains Mono',monospace;font-size:9px;padding:3px 8px;background:rgba(244,242,238,.3);border:1px solid rgba(244,242,238,.3);color:rgba(244,242,238,.7);display:flex;align-items:center;gap:4px}
.tc2 button{background:none;border:none;color:rgba(244,242,238,.7);font-size:12px;line-height:1;padding:0}
.ti{background:none;border:none;color:#e8f4f4;font-family:'Syne',sans-serif;font-size:13px;outline:none;flex:1;min-width:100px;padding:2px 4px}
.ti::placeholder{color:rgba(168,200,200,.2)}
.ck{display:flex;align-items:center;gap:.6rem}
.ck input{accent-color:rgba(244,242,238,.7);width:14px;height:14px}
.ck span{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.1em;color:rgba(168,200,200,.4)}
.sub{width:100%;padding:14px;background:#f4f2ee;border:none;color:#080808;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;transition:background .2s;margin-top:1rem}
.sub:hover:not(:disabled){background:rgba(244,242,238,.7)}
.sub:disabled{opacity:.5}
.err{padding:.8rem 1rem;background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.25);font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(239,68,68,.9);margin-bottom:1rem}
.char-count{font-family:'JetBrains Mono',monospace;font-size:8px;color:rgba(168,200,200,.3);text-align:right;margin-top:2px}
@media(max-width:700px){.fr,.fr3{grid-template-columns:1fr}.gg{grid-template-columns:repeat(3,1fr)}}
`;

const DEF = {
  title:'', subtitle:'', year:new Date().getFullYear().toString(),
  category:'brand', tags:[], coverImage:'', coverGradient:GRADS[0].v,
  gallery:[], description:'', problem:'', process:'', result:'',
  seoTitle:'', seoDescription:'',
  featured:false, published:true, layout:'medium',
};

export default function AdminForm() {
  const { authFetch } = useOutletContext();
  const nav = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [form,       setForm]       = useState(DEF);
  const [tagInput,   setTagInput]   = useState('');
  const [loading,    setLoading]    = useState(false);
  const [uploading,  setUploading]  = useState(false);
  const [galLoading, setGalLoading] = useState(false);
  const [error,      setError]      = useState('');
  const [tab,        setTab]        = useState('basic');
  const [uploadPct,  setUploadPct]  = useState(0);

  useEffect(() => {
    if (!isEdit) return;
    authFetch('/api/admin/projects').then(r => r.json()).then(d => {
      const p = d.data?.find(x => x.id === id);
      if (p) setForm({ ...DEF, ...p, gallery: p.gallery || [] });
    });
  }, [id]);

  const s  = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const sc = k => e => setForm(f => ({ ...f, [k]: e.target.checked }));

  const addTag = e => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      if (!form.tags.includes(tagInput.trim())) setForm(f => ({ ...f, tags: [...f.tags, tagInput.trim()] }));
      setTagInput('');
    }
  };

  // FIXED: Upload using native fetch without Content-Type header (let browser set multipart boundary)
  const uploadFile = async (file) => {
    const fd = new FormData();
    fd.append('file', file);
    const tok = localStorage.getItem('admin_token');
    // Do NOT set Content-Type — browser must set it with boundary
    const r = await fetch('/api/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${tok}` },
      body: fd,
    });
    return r.json();
  };

  const uploadCover = async (file) => {
    setUploading(true);
    try {
      const d = await uploadFile(file);
      if (d.success) setForm(f => ({ ...f, coverImage: d.url }));
      else setError('Upload failed: ' + d.error);
    } catch (e) { setError('Upload failed: ' + e.message); }
    setUploading(false);
  };

  const uploadGallery = async (files) => {
    setGalLoading(true);
    const arr = Array.from(files);
    const results = [];
    for (let i = 0; i < arr.length; i++) {
      setUploadPct(Math.round(((i) / arr.length) * 100));
      try {
        const d = await uploadFile(arr[i]);
        if (d.success) results.push(d.url);
      } catch {}
    }
    setUploadPct(0);
    setForm(f => ({ ...f, gallery: [...(f.gallery || []), ...results] }));
    setGalLoading(false);
  };

  const removeGallery = url => setForm(f => ({ ...f, gallery: (f.gallery || []).filter(x => x !== url) }));

  const submit = async e => {
    e.preventDefault();
    if (!form.title.trim()) { setError('Title is required'); return; }
    setError(''); setLoading(true);
    const url    = isEdit ? `/api/admin/projects/${id}` : '/api/admin/projects';
    const method = isEdit ? 'PUT' : 'POST';
    const r = await authFetch(url, { method, body: JSON.stringify(form) });
    const d = await r.json();
    if (d.success) nav('/admin/projects');
    else { setError(d.error || 'Unknown error'); setLoading(false); }
  };

  const previewBg = form.coverImage
    ? { backgroundImage: `url(${form.coverImage})`, backgroundSize:'cover', backgroundPosition:'center' }
    : { background: form.coverGradient };

  const TABS = [
    { id:'basic',   l:'Basic' },
    { id:'media',   l:'Images' },
    { id:'content', l:'Content' },
    { id:'seo',     l:'SEO' },
  ];

  return (
    <><style>{S}</style>
      <div className="af">
        <div className="afh">
          <Link to="/admin/projects" className="bk">← Back</Link>
          <h1>{isEdit ? 'Edit Project' : 'New Project'}</h1>
        </div>

        <div className="prev" style={previewBg}>
          <span className="prev-t">{form.title || 'PREVIEW'}</span>
        </div>

        {error && <div className="err">⚠ {error}</div>}

        <div className="tabs">
          {TABS.map(t => (
            <button key={t.id} className={`tab${tab === t.id ? ' a' : ''}`} onClick={() => setTab(t.id)} type="button">
              {t.l}
            </button>
          ))}
        </div>

        <form onSubmit={submit} noValidate>

          {/* BASIC */}
          {tab === 'basic' && (
            <div className="fs">
              <p className="fst">Project info</p>
              <div className="fr">
                <div className="fg2"><label className="fl2">Title *</label><input className="fi2" placeholder="NOCTUA" value={form.title} onChange={s('title')} required/></div>
                <div className="fg2"><label className="fl2">Subtitle</label><input className="fi2" placeholder="Short description..." value={form.subtitle} onChange={s('subtitle')}/></div>
              </div>
              <div className="fr3">
                <div className="fg2"><label className="fl2">Year</label><input className="fi2" placeholder="2024" value={form.year} onChange={s('year')}/></div>
                <div className="fg2"><label className="fl2">Category</label>
                  <select className="fi2" value={form.category} onChange={s('category')}>
                    {CATS.map(c => <option key={c.id} value={c.id}>{c.l}</option>)}
                  </select>
                </div>
                <div className="fg2"><label className="fl2">Layout</label>
                  <select className="fi2" value={form.layout} onChange={s('layout')}>
                    {LAYOUTS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>
              <div className="fg2">
                <label className="fl2">Tags (press Enter to add)</label>
                <div className="tw">
                  {form.tags.map(t => (
                    <span className="tc2" key={t}>{t}
                      <button type="button" onClick={() => setForm(f => ({ ...f, tags: f.tags.filter(x => x !== t) }))}>×</button>
                    </span>
                  ))}
                  <input className="ti" placeholder="Brand Identity, Motion..." value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={addTag}/>
                </div>
              </div>
              <div className="fr" style={{marginBottom:0}}>
                <label className="ck"><input type="checkbox" checked={form.featured} onChange={sc('featured')}/><span>Mark as Featured</span></label>
                <label className="ck"><input type="checkbox" checked={form.published !== false} onChange={sc('published')}/><span>Published (visible)</span></label>
              </div>
            </div>
          )}

          {/* IMAGES */}
          {tab === 'media' && (
            <>
              <div className="fs">
                <p className="fst">Cover Image</p>
                <div className="fg2">
                  <label className="fl2">Upload from device</label>
                  <div className="uarea">
                    <input type="file" accept="image/*,video/*"
                      onChange={e => { if (e.target.files[0]) uploadCover(e.target.files[0]); }}/>
                    <div className="u-lbl">
                      <span className="u-icon">↑</span>
                      Drag & drop or click to select
                      <span className="u-hint">JPG · PNG · WEBP · GIF · MP4 — max 20MB</span>
                    </div>
                  </div>
                  {uploading && <div className="uploading"><div className="uspin"/>Uploading cover image...</div>}
                  {form.coverImage && !uploading && (
                    <div className="img-wrap">
                      <img src={form.coverImage} alt="cover" className="img-prev"/>
                      <button type="button" className="img-rm" onClick={() => setForm(f => ({ ...f, coverImage:'' }))}>✕ Remove</button>
                    </div>
                  )}
                </div>
                <div className="fg2" style={{marginTop:'1rem'}}>
                  <label className="fl2">Or paste image URL</label>
                  <input className="fi2" placeholder="https://..." value={form.coverImage} onChange={s('coverImage')}/>
                </div>
              </div>

              <div className="fs">
                <p className="fst">Background gradient (used when no cover image)</p>
                <div className="gg">
                  {GRADS.map(g => (
                    <div key={g.l} className={`go${form.coverGradient === g.v ? ' sel' : ''}`}
                      style={{ background: g.v }} onClick={() => setForm(f => ({ ...f, coverGradient: g.v }))}>
                      <div className="gol">{g.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="fs">
                <p className="fst">Gallery — project images</p>
                <div className="gal-grid">
                  {(form.gallery || []).map((url, i) => (
                    <div className="gal-item" key={i}>
                      <img src={url} alt={`g-${i}`}/>
                      <button type="button" className="gal-del" onClick={() => removeGallery(url)}>✕</button>
                    </div>
                  ))}
                  <label className="gal-add">
                    {galLoading
                      ? <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                          <div className="uspin"/>
                          <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:8,color:'rgba(244,242,238,.7)'}}>{uploadPct}%</span>
                        </div>
                      : '+'}
                    <input type="file" accept="image/*" multiple
                      onChange={e => { if (e.target.files.length) uploadGallery(e.target.files); }}/>
                  </label>
                </div>
                <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:9,color:'rgba(168,200,200,.3)',marginTop:'.5rem'}}>
                  Select multiple files at once · Max 10 images per upload
                </p>
              </div>
            </>
          )}

          {/* CONTENT */}
          {tab === 'content' && (
            <div className="fs">
              <p className="fst">Case study content</p>
              <div className="fg2"><label className="fl2">Overview</label>
                <textarea className="fi2" rows={3} placeholder="Brief introduction to the project..." value={form.description} onChange={s('description')}/></div>
              <div className="fr">
                <div className="fg2"><label className="fl2">Problem / Challenge</label>
                  <textarea className="fi2" rows={5} placeholder="What problem was the client facing?" value={form.problem} onChange={s('problem')}/></div>
                <div className="fg2"><label className="fl2">Process / Approach</label>
                  <textarea className="fi2" rows={5} placeholder="How did you solve it?" value={form.process} onChange={s('process')}/></div>
              </div>
              <div className="fg2"><label className="fl2">Outcome / Results</label>
                <textarea className="fi2" rows={3} placeholder="Measurable results and achievements..." value={form.result} onChange={s('result')}/></div>
            </div>
          )}

          {/* SEO */}
          {tab === 'seo' && (
            <div className="fs">
              <p className="fst">SEO & Open Graph</p>
              <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:9,color:'rgba(168,200,200,.35)',marginBottom:'1.2rem',lineHeight:1.7}}>
                Optimize how this project appears when shared on social media.
              </p>
              <div className="fg2">
                <label className="fl2">SEO Title <span style={{color:'rgba(168,200,200,.25)'}}>(leave blank to use project title)</span></label>
                <input className="fi2" placeholder={form.title || 'SEO title...'} value={form.seoTitle} onChange={s('seoTitle')} maxLength={60}/>
                <div className="char-count">{(form.seoTitle||'').length}/60</div>
              </div>
              <div className="fg2">
                <label className="fl2">Meta Description</label>
                <textarea className="fi2" rows={3} placeholder="Short description for Google and social previews..."
                  value={form.seoDescription} onChange={s('seoDescription')} maxLength={160}/>
                <div className="char-count">{(form.seoDescription||'').length}/160</div>
              </div>
              <div style={{marginTop:'1rem',padding:'1rem',background:'rgba(14,60,60,.3)',border:'1px solid rgba(244,242,238,.15)'}}>
                <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:8,letterSpacing:'.18em',color:'rgba(244,242,238,.5)',marginBottom:'.8rem',textTransform:'uppercase'}}>Share preview</p>
                {(form.coverImage||form.coverGradient) && (
                  <div style={{width:'100%',height:80,background:form.coverImage?`url(${form.coverImage}) center/cover`:form.coverGradient,marginBottom:'.6rem'}}/>
                )}
                <p style={{fontFamily:'Syne,sans-serif',fontSize:13,fontWeight:600,color:'#e8f4f4',marginBottom:'.2rem'}}>{form.seoTitle||form.title||'Project title'}</p>
                <p style={{fontFamily:'Syne,sans-serif',fontSize:11,color:'rgba(168,200,200,.5)',lineHeight:1.5}}>{form.seoDescription||form.description||'Project description...'}</p>
                <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:9,color:'rgba(168,200,200,.25)',marginTop:'.4rem'}}>portfolio.com/project/{form.title?.toLowerCase().replace(/\s+/g,'-')||'project-name'}</p>
              </div>
            </div>
          )}

          <button className="sub" type="submit" disabled={loading || uploading || galLoading}>
            {loading ? 'Saving...' : isEdit ? 'Update Project →' : 'Create Project →'}
          </button>
        </form>
      </div>
    </>
  );
}
