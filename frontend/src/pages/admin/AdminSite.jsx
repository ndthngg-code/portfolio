import React, { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';

const S = `
.as-wrap { font-family: 'Syne', sans-serif; max-width: 900px; }
.as-header { margin-bottom: 2rem; }
.as-header h1 { font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 800; color: #e8f4f4; letter-spacing: -.02em; }
.as-header p { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: rgba(168,200,200,.4); margin-top: .4rem; letter-spacing: .1em; }

.as-tabs { display: flex; gap: 0; border-bottom: 1px solid rgba(244,242,238,.15); margin-bottom: 2rem; flex-wrap: wrap; }
.as-tab { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .12em; padding: 10px 18px; background: none; border: none; color: rgba(168,200,200,.4); transition: all .2s; border-bottom: 2px solid transparent; margin-bottom: -1px; text-transform: uppercase; cursor: auto; }
.as-tab.a { color: rgba(244,242,238,.7); border-bottom-color: rgba(244,242,238,.7); }
.as-tab:hover { color: #e8f4f4; }

.as-section { background: rgba(244,242,238,.4); border: 1px solid rgba(244,242,238,.18); padding: 1.5rem; margin-bottom: 1.2rem; position: relative; }
.as-section::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, rgba(244,242,238,.7), transparent); }
.as-section-title { font-family: 'JetBrains Mono', monospace; font-size: 8px; letter-spacing: .26em; color: rgba(244,242,238,.6); text-transform: uppercase; margin-bottom: 1.2rem; }

.as-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
.as-row-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
.as-group { display: flex; flex-direction: column; gap: .4rem; margin-bottom: 1rem; }
.as-group:last-child { margin-bottom: 0; }
.as-label { font-family: 'JetBrains Mono', monospace; font-size: 8px; letter-spacing: .22em; color: rgba(168,200,200,.38); text-transform: uppercase; }
.as-hint { font-family: 'JetBrains Mono', monospace; font-size: 8px; color: rgba(168,200,200,.25); margin-top: 2px; }
.as-input { background: rgba(14,60,60,.3); border: 1px solid rgba(244,242,238,.2); color: #e8f4f4; padding: 10px 13px; font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 400; outline: none; transition: border-color .2s; width: 100%; }
.as-input:focus { border-color: rgba(244,242,238,.5); background: rgba(244,242,238,.2); }
.as-input::placeholder { color: rgba(168,200,200,.2); }
textarea.as-input { resize: vertical; min-height: 80px; line-height: 1.65; }

/* Stats editor */
.as-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: .8rem; }
.as-stat-card { background: rgba(14,60,60,.3); border: 1px solid rgba(244,242,238,.15); padding: .8rem; }
.as-stat-num { font-family: 'Syne', sans-serif; font-size: 10px; color: rgba(168,200,200,.4); margin-bottom: .3rem; }

/* Skills editor */
.as-skills-wrap { display: flex; gap: .4rem; flex-wrap: wrap; padding: .5rem; background: rgba(14,60,60,.25); border: 1px solid rgba(244,242,238,.18); min-height: 42px; align-items: center; }
.as-skill-chip { font-family: 'JetBrains Mono', monospace; font-size: 9px; padding: 3px 8px; background: rgba(244,242,238,.3); border: 1px solid rgba(244,242,238,.3); color: rgba(244,242,238,.7); display: flex; align-items: center; gap: 4px; }
.as-skill-chip button { background: none; border: none; color: rgba(244,242,238,.7); font-size: 12px; line-height: 1; padding: 0; cursor: auto; }
.as-skill-input { background: none; border: none; color: #e8f4f4; font-family: 'Syne', sans-serif; font-size: 13px; outline: none; flex: 1; min-width: 120px; padding: 2px 4px; }
.as-skill-input::placeholder { color: rgba(168,200,200,.2); }

/* Experience editor */
.as-exp-item { background: rgba(14,60,60,.2); border: 1px solid rgba(244,242,238,.12); padding: 1rem; margin-bottom: .6rem; position: relative; }
.as-exp-del { position: absolute; top: .6rem; right: .6rem; background: none; border: none; color: rgba(239,68,68,.6); font-size: 14px; cursor: auto; }
.as-exp-del:hover { color: rgba(239,68,68,.9); }
.as-add-btn { width: 100%; padding: 9px; background: none; border: 1px dashed rgba(244,242,238,.25); color: rgba(168,200,200,.4); font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .12em; text-transform: uppercase; cursor: auto; transition: all .2s; margin-top: .5rem; }
.as-add-btn:hover { border-color: rgba(244,242,238,.4); color: rgba(244,242,238,.7); }

/* Save bar */
.as-save-bar { position: sticky; bottom: 0; background: rgba(5,13,13,.95); border-top: 1px solid rgba(244,242,238,.2); padding: 1rem 0; display: flex; align-items: center; gap: 1rem; backdrop-filter: blur(12px); z-index: 10; margin-top: 2rem; }
.as-save-btn { padding: 12px 32px; background: #f4f2ee; border: none; color: #080808; font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: .18em; text-transform: uppercase; cursor: auto; transition: all .2s; }
.as-save-btn:hover:not(:disabled) { background: rgba(244,242,238,.7); }
.as-save-btn:disabled { opacity: .5; }
.as-status { font-family: 'JetBrains Mono', monospace; font-size: 10px; }
.as-status.ok { color: rgba(244,242,238,.7); }
.as-status.err { color: rgba(239,68,68,.8); }
.as-preview-link { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .12em; color: rgba(168,200,200,.4); text-decoration: none; margin-left: auto; transition: color .2s; text-transform: uppercase; }
.as-preview-link:hover { color: rgba(244,242,238,.7); }

@media(max-width:700px){.as-row,.as-row-3,.as-stats{grid-template-columns:1fr}}
`;

const TABS = [
  { id: 'hero',    label: 'Hero' },
  { id: 'about',   label: 'About' },
  { id: 'contact', label: 'Contact' },
  { id: 'social',  label: 'Social Links' },
  { id: 'meta',    label: 'SEO / Meta' },
];

export default function AdminSite() {
  const { authFetch } = useOutletContext();
  const [data,    setData]    = useState(null);
  const [tab,     setTab]     = useState('hero');
  const [saving,  setSaving]  = useState(false);
  const [status,  setStatus]  = useState({ type: '', msg: '' });
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(d => { if (d.success) setData(d.data); });
  }, []);

  const set = (section, key, val) => {
    setData(d => ({ ...d, [section]: { ...d[section], [key]: val } }));
  };

  const setStat = (i, key, val) => {
    const stats = [...(data.hero.stats || [])];
    stats[i] = { ...stats[i], [key]: val };
    set('hero', 'stats', stats);
  };

  const addSkill = e => {
    if ((e.key === 'Enter' || e.key === ',') && skillInput.trim()) {
      e.preventDefault();
      const skills = data.about.skills || [];
      if (!skills.includes(skillInput.trim())) {
        set('about', 'skills', [...skills, skillInput.trim()]);
      }
      setSkillInput('');
    }
  };
  const removeSkill = s => set('about', 'skills', data.about.skills.filter(x => x !== s));

  const setExp = (i, key, val) => {
    const exp = [...(data.about.experience || [])];
    exp[i] = { ...exp[i], [key]: val };
    set('about', 'experience', exp);
  };
  const addExp = () => set('about', 'experience', [...(data.about.experience || []), { title: '', company: '', year: '' }]);
  const removeExp = i => set('about', 'experience', (data.about.experience || []).filter((_, idx) => idx !== i));

  const save = async () => {
    setSaving(true); setStatus({ type: '', msg: '' });
    try {
      const r = await authFetch('/api/settings', { method: 'PUT', body: JSON.stringify(data) });
      const d = await r.json();
      if (d.success) setStatus({ type: 'ok', msg: '✓ Saved successfully' });
      else setStatus({ type: 'err', msg: '✗ ' + d.error });
    } catch { setStatus({ type: 'err', msg: '✗ Save failed' }); }
    setSaving(false);
    setTimeout(() => setStatus({ type: '', msg: '' }), 3000);
  };

  if (!data) return <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:11, color:'rgba(168,200,200,.4)', letterSpacing:'.12em' }}>Loading site settings...</div>;

  return (
    <><style>{S}</style>
      <div className="as-wrap">
        <div className="as-header">
          <h1>Site Editor</h1>
          <p>Edit all page content, social links & SEO — changes reflect immediately on the frontend.</p>
        </div>

        <div className="as-tabs">
          {TABS.map(t => (
            <button key={t.id} className={`as-tab${tab === t.id ? ' a' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
        </div>

        {/* ── HERO ── */}
        {tab === 'hero' && (
          <>
            <div className="as-section">
              <div className="as-section-title">Hero Text</div>
              <div className="as-row">
                <div className="as-group">
                  <label className="as-label">Eyebrow label</label>
                  <input className="as-input" value={data.hero.eyebrow || ''} onChange={e => set('hero','eyebrow',e.target.value)} placeholder="VFX · 3D · Creative Designer"/>
                </div>
                <div className="as-group">
                  <label className="as-label">Role line</label>
                  <input className="as-input" value={data.hero.role || ''} onChange={e => set('hero','role',e.target.value)} placeholder="Brand · UI/UX · Motion"/>
                </div>
              </div>
              <div className="as-row">
                <div className="as-group">
                  <label className="as-label">Name — Line 1</label>
                  <input className="as-input" value={data.hero.name || ''} onChange={e => set('hero','name',e.target.value)} placeholder="Thắng"/>
                </div>
                <div className="as-group">
                  <label className="as-label">Name — Line 2 (gradient)</label>
                  <input className="as-input" value={data.hero.nameLine2 || ''} onChange={e => set('hero','nameLine2',e.target.value)} placeholder="Nguyễn"/>
                </div>
              </div>
              <div className="as-group">
                <label className="as-label">Tagline / description</label>
                <textarea className="as-input" rows={2} value={data.hero.tagline || ''} onChange={e => set('hero','tagline',e.target.value)}/>
              </div>
              <div className="as-group">
                <label className="as-label">CTA Button label</label>
                <input className="as-input" value={data.hero.ctaLabel || ''} onChange={e => set('hero','ctaLabel',e.target.value)} placeholder="View Works →"/>
              </div>
            </div>

            <div className="as-section">
              <div className="as-section-title">Stats (3 numbers at bottom)</div>
              <div className="as-stats">
                {(data.hero.stats || []).map((s, i) => (
                  <div className="as-stat-card" key={i}>
                    <div className="as-stat-num">Stat {i+1}</div>
                    <div className="as-group" style={{marginBottom:'.5rem'}}>
                      <label className="as-label">Number</label>
                      <input className="as-input" value={s.num} onChange={e => setStat(i,'num',e.target.value)} placeholder="6"/>
                    </div>
                    <div className="as-group" style={{marginBottom:0}}>
                      <label className="as-label">Label</label>
                      <input className="as-input" value={s.label} onChange={e => setStat(i,'label',e.target.value)} placeholder="Years experience"/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── ABOUT ── */}
        {tab === 'about' && (
          <>
            <div className="as-section">
              <div className="as-section-title">About Section</div>
              <div className="as-row">
                <div className="as-group">
                  <label className="as-label">Section title</label>
                  <input className="as-input" value={data.about.title || ''} onChange={e => set('about','title',e.target.value)} placeholder="I build digital worlds"/>
                  <span className="as-hint">The last word will be highlighted in teal</span>
                </div>
                <div className="as-group">
                  <label className="as-label">CTA Button</label>
                  <input className="as-input" value={data.about.ctaLabel || ''} onChange={e => set('about','ctaLabel',e.target.value)} placeholder="Let's collaborate →"/>
                </div>
              </div>
              <div className="as-group">
                <label className="as-label">Body text</label>
                <textarea className="as-input" rows={4} value={data.about.body || ''} onChange={e => set('about','body',e.target.value)}/>
              </div>
            </div>

            <div className="as-section">
              <div className="as-section-title">Skills (press Enter to add)</div>
              <div className="as-skills-wrap">
                {(data.about.skills || []).map(s => (
                  <span className="as-skill-chip" key={s}>{s}
                    <button type="button" onClick={() => removeSkill(s)}>×</button>
                  </span>
                ))}
                <input className="as-skill-input" placeholder="Add skill..." value={skillInput}
                  onChange={e => setSkillInput(e.target.value)} onKeyDown={addSkill}/>
              </div>
            </div>

            <div className="as-section">
              <div className="as-section-title">Experience / Career</div>
              {(data.about.experience || []).map((exp, i) => (
                <div className="as-exp-item" key={i}>
                  <button className="as-exp-del" type="button" onClick={() => removeExp(i)}>✕</button>
                  <div className="as-row-3">
                    <div className="as-group" style={{marginBottom:0}}>
                      <label className="as-label">Job Title</label>
                      <input className="as-input" value={exp.title} onChange={e => setExp(i,'title',e.target.value)} placeholder="Senior VFX Artist"/>
                    </div>
                    <div className="as-group" style={{marginBottom:0}}>
                      <label className="as-label">Company</label>
                      <input className="as-input" value={exp.company} onChange={e => setExp(i,'company',e.target.value)} placeholder="Studio · City"/>
                    </div>
                    <div className="as-group" style={{marginBottom:0}}>
                      <label className="as-label">Year</label>
                      <input className="as-input" value={exp.year} onChange={e => setExp(i,'year',e.target.value)} placeholder="2022–Now"/>
                    </div>
                  </div>
                </div>
              ))}
              <button className="as-add-btn" type="button" onClick={addExp}>+ Add position</button>
            </div>
          </>
        )}

        {/* ── CONTACT ── */}
        {tab === 'contact' && (
          <div className="as-section">
            <div className="as-section-title">Contact Section Text</div>
            <div className="as-group">
              <label className="as-label">Section title</label>
              <input className="as-input" value={data.contact?.title || ''} onChange={e => set('contact','title',e.target.value)} placeholder="Start a new project"/>
            </div>
            <div className="as-group">
              <label className="as-label">Subtitle / description</label>
              <input className="as-input" value={data.contact?.subtitle || ''} onChange={e => set('contact','subtitle',e.target.value)} placeholder="Have an idea? Let's turn it into something memorable."/>
            </div>
          </div>
        )}

        {/* ── SOCIAL LINKS ── */}
        {tab === 'social' && (
          <div className="as-section">
            <div className="as-section-title">Contact & Social Links</div>
            <div className="as-row">
              <div className="as-group">
                <label className="as-label">Email</label>
                <input className="as-input" type="email" value={data.social?.email || ''} onChange={e => set('social','email',e.target.value)} placeholder="hello@yourname.vn"/>
              </div>
              <div className="as-group">
                <label className="as-label">Phone number</label>
                <input className="as-input" value={data.social?.phone || ''} onChange={e => set('social','phone',e.target.value)} placeholder="+84 909 123 456"/>
              </div>
            </div>
            <div className="as-row">
              <div className="as-group">
                <label className="as-label">Telegram URL</label>
                <input className="as-input" value={data.social?.telegram || ''} onChange={e => set('social','telegram',e.target.value)} placeholder="https://t.me/yourhandle"/>
              </div>
              <div className="as-group">
                <label className="as-label">Zalo URL</label>
                <input className="as-input" value={data.social?.zalo || ''} onChange={e => set('social','zalo',e.target.value)} placeholder="https://zalo.me/0909123456"/>
              </div>
            </div>
            <div className="as-row">
              <div className="as-group">
                <label className="as-label">WhatsApp URL</label>
                <input className="as-input" value={data.social?.whatsapp || ''} onChange={e => set('social','whatsapp',e.target.value)} placeholder="https://wa.me/84909123456"/>
              </div>
              <div className="as-group">
                <label className="as-label">Behance URL</label>
                <input className="as-input" value={data.social?.behance || ''} onChange={e => set('social','behance',e.target.value)} placeholder="https://behance.net/yourname"/>
              </div>
            </div>
            <div className="as-row">
              <div className="as-group">
                <label className="as-label">Instagram URL</label>
                <input className="as-input" value={data.social?.instagram || ''} onChange={e => set('social','instagram',e.target.value)} placeholder="https://instagram.com/yourname"/>
              </div>
              <div className="as-group">
                <label className="as-label">LinkedIn URL (optional)</label>
                <input className="as-input" value={data.social?.linkedin || ''} onChange={e => set('social','linkedin',e.target.value)} placeholder="https://linkedin.com/in/yourname"/>
              </div>
            </div>
            <div style={{marginTop:'1rem',padding:'1rem',background:'rgba(244,242,238,.15)',border:'1px solid rgba(244,242,238,.15)'}}>
              <p style={{fontFamily:'JetBrains Mono,monospace',fontSize:9,letterSpacing:'.14em',color:'rgba(244,242,238,.5)',marginBottom:'.5rem',textTransform:'uppercase'}}>These links appear in:</p>
              <p style={{fontFamily:'Syne,sans-serif',fontSize:12,color:'rgba(168,200,200,.5)',lineHeight:1.7}}>
                → Hero section (below CTA buttons)<br/>
                → Hero left sidebar (vertical text)<br/>
                → Footer (organized by category)<br/>
                → Floating contact bubble (all pages)<br/>
                → Contact section (auto-populated)
              </p>
            </div>
          </div>
        )}

        {/* ── META / SEO ── */}
        {tab === 'meta' && (
          <div className="as-section">
            <div className="as-section-title">Global SEO & Meta</div>
            <div className="as-group">
              <label className="as-label">Site Title</label>
              <input className="as-input" value={data.meta?.siteTitle || ''} onChange={e => set('meta','siteTitle',e.target.value)} placeholder="Name — VFX Creative Designer"/>
            </div>
            <div className="as-group">
              <label className="as-label">Site Description</label>
              <textarea className="as-input" rows={2} value={data.meta?.siteDescription || ''} onChange={e => set('meta','siteDescription',e.target.value)} placeholder="VFX & Creative Designer based in..."/>
            </div>
            <div className="as-group">
              <label className="as-label">Footer Note</label>
              <input className="as-input" value={data.meta?.footerNote || ''} onChange={e => set('meta','footerNote',e.target.value)} placeholder="Available for freelance · HCMC, Vietnam"/>
            </div>
          </div>
        )}

        {/* Save bar */}
        <div className="as-save-bar">
          <button className="as-save-btn" onClick={save} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes →'}
          </button>
          {status.msg && <span className={`as-status ${status.type}`}>{status.msg}</span>}
          <a href="/" target="_blank" rel="noopener" className="as-preview-link">↗ Preview site</a>
        </div>
      </div>
    </>
  );
}
