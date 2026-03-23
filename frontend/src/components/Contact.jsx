import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext.jsx';

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting)e.target.classList.add("on"); }), { threshold:.07 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

const S = `
#contact{padding:9rem 3.5rem;background:#080808;position:relative;overflow:hidden}
.ct-bg{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(244,242,238,.025) 0%,transparent 65%);pointer-events:none}
.ct-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:6rem;align-items:start}
.ct-left{}
.ct-lbl{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.3em;color:rgba(244,242,238,.3);text-transform:uppercase;margin-bottom:2.5rem;display:flex;align-items:center;gap:.8rem}
.ct-lbl::before{content:'';width:24px;height:1px;background:rgba(244,242,238,.25)}
.ct-title{font-family:'Syne',sans-serif;font-size:clamp(2rem,4.5vw,3.8rem);font-weight:800;line-height:.94;letter-spacing:-.035em;color:#f4f2ee;margin-bottom:1.5rem}
.ct-title em{font-style:normal;color:transparent;-webkit-text-stroke:1px rgba(244,242,238,.3)}
.ct-sub{font-family:'Syne',sans-serif;font-size:1rem;color:rgba(244,242,238,.4);line-height:1.8;margin-bottom:3rem;max-width:340px}
/* Direct links list */
.ct-links{display:flex;flex-direction:column;gap:0}
.ct-link-item{display:flex;align-items:center;justify-content:space-between;padding:1rem 0;border-bottom:1px solid rgba(244,242,238,.07)}
.ct-link-item:first-child{border-top:1px solid rgba(244,242,238,.07)}
.ct-link-platform{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.22em;color:rgba(244,242,238,.28);text-transform:uppercase}
.ct-link-val{font-family:'Syne',sans-serif;font-size:14px;font-weight:500;color:#f4f2ee;text-decoration:none;transition:opacity .2s}
.ct-link-val:hover{opacity:.6}
.ct-link-arrow{font-family:'JetBrains Mono',monospace;font-size:12px;color:rgba(244,242,238,.2);transition:transform .2s}
.ct-link-item:hover .ct-link-arrow{transform:translateX(4px)}

/* Form */
.ct-form{background:#0d0d0d;border:1px solid rgba(244,242,238,.08);padding:2.5rem;position:relative;overflow:hidden}
.ct-form::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(244,242,238,.2),transparent)}
.cg{display:flex;flex-direction:column;gap:.4rem;margin-bottom:1rem}
.cl{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.22em;color:rgba(244,242,238,.3);text-transform:uppercase}
.ci{background:rgba(244,242,238,.03);border:1px solid rgba(244,242,238,.08);color:#f4f2ee;padding:11px 14px;font-family:'Syne',sans-serif;font-size:14px;font-weight:400;outline:none;transition:border-color .2s;width:100%}
.ci:focus{border-color:rgba(244,242,238,.3);background:rgba(244,242,238,.05)}
.ci::placeholder{color:rgba(244,242,238,.18)}
textarea.ci{resize:vertical;min-height:110px;line-height:1.65}
select.ci{appearance:none}
.cg2{display:grid;grid-template-columns:1fr 1fr;gap:.8rem;margin-bottom:1rem}
.c-submit{width:100%;padding:14px;background:#f4f2ee;border:none;color:#080808;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;cursor:auto;transition:all .3s;margin-top:.5rem;position:relative;overflow:hidden}
.c-submit::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent);transform:translateX(-100%);transition:.5s}
.c-submit:hover::after{transform:translateX(100%)}
.c-submit:hover:not(:disabled){background:#e8e6e2}
.c-submit:disabled{opacity:.5}
.c-ok{padding:.8rem 1rem;background:rgba(244,242,238,.05);border:1px solid rgba(244,242,238,.15);font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(244,242,238,.7);margin-top:.8rem;text-align:center}
.c-err{padding:.8rem 1rem;background:rgba(239,68,68,.06);border:1px solid rgba(239,68,68,.2);font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(239,68,68,.8);margin-bottom:1rem}

@media(max-width:1024px){.ct-inner{grid-template-columns:1fr;gap:4rem}#contact{padding:7rem 2rem}}
@media(max-width:600px){#contact{padding:5rem 1.25rem}.cg2{grid-template-columns:1fr}}
`;

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', projectType:'', budget:'', message:'' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const { settings } = useSite();
  const c = settings?.contact || {};
  const s = settings?.social  || {};
  useReveal();

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { setStatus('err:Please fill all required fields.'); return; }
    setStatus(''); setLoading(true);
    try {
      const r = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
      const d = await r.json();
      if (d.success) { setStatus('ok:'+d.message); setForm({ name:'', email:'', projectType:'', budget:'', message:'' }); }
      else setStatus('err:'+(d.errors?.[0]?.msg||d.error||'Error'));
    } catch { setStatus('err:Cannot connect.'); }
    setLoading(false);
  };

  const links = [
    s.email     && { platform:'Email',     val:s.email,     href:`mailto:${s.email}` },
    s.telegram  && { platform:'Telegram',  val:'@'+s.telegram.split('/').pop(), href:s.telegram },
    s.zalo      && { platform:'Zalo',      val:s.phone||'Zalo',  href:s.zalo },
    s.whatsapp  && { platform:'WhatsApp',  val:s.phone||'WA', href:s.whatsapp },
    s.behance   && { platform:'Behance',   val:'View Portfolio', href:s.behance },
  ].filter(Boolean);

  return (
    <>
      <style>{S}</style>
      <section id="contact">
        <div className="ct-bg"/>
        <div className="ct-inner">
          <div>
            <p className="ct-lbl reveal">Contact</p>
            <h2 className="ct-title reveal rv1">
              {c.title||'Start a new'}{' '}
              <em>{c.titleAccent||'project'}</em>
            </h2>
            <p className="ct-sub reveal rv2">{c.subtitle||"Have an idea? Let's turn it into something memorable."}</p>

            <div className="rv rv3">
              {links.map(l => (
                <div className="ct-link-item" key={l.platform}>
                  <span className="ct-link-platform">{l.platform}</span>
                  <a href={l.href} target={l.href.startsWith('http')?'_blank':undefined} rel="noopener" className="ct-link-val">{l.val}</a>
                  <span className="ct-link-arrow">→</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rv rv2">
            <div className="ct-form">
              <form onSubmit={submit} noValidate>
                {status.startsWith('err:') && <div className="c-err">⚠ {status.slice(4)}</div>}
                <div className="cg2">
                  <div className="cg"><label className="cl">Name</label><input className="ci" placeholder="Your name" value={form.name} onChange={set('name')}/></div>
                  <div className="cg"><label className="cl">Email</label><input className="ci" type="email" placeholder="hello@example.com" value={form.email} onChange={set('email')}/></div>
                </div>
                <div className="cg2">
                  <div className="cg"><label className="cl">Service</label>
                    <select className="ci" value={form.projectType} onChange={set('projectType')}>
                      <option value="">Select...</option>
                      {['Brand Identity','VFX / Motion','3D Visualization','UI/UX','Web Design','Other'].map(o=><option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="cg"><label className="cl">Budget</label>
                    <select className="ci" value={form.budget} onChange={set('budget')}>
                      <option value="">Budget...</option>
                      {['< $500','$500–$2k','$2k–$5k','$5k+'].map(o=><option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div className="cg"><label className="cl">Message</label><textarea className="ci" placeholder="Tell me about your project..." value={form.message} onChange={set('message')}/></div>
                <button className="c-submit" type="submit" disabled={loading}>{loading?'Sending...':'Send Message →'}</button>
                {status.startsWith('ok:') && <div className="c-ok">✓ {status.slice(3)}</div>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
