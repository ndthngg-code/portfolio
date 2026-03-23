import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero    from '../../components/Hero.jsx';
import Marquee from '../../components/Marquee.jsx';
import About   from '../../components/About.jsx';
import Contact from '../../components/Contact.jsx';
import Footer  from '../../components/Footer.jsx';
import SEO     from '../../components/SEO.jsx';
import useReveal from '../../hooks/useReveal.js';

const CAT_L = {brand:'Brand Identity',ui:'UI/UX',motion:'Motion','3d':'3D/VFX',print:'Print',web:'Web'};

const LABS_PREVIEW = [
  {n:'01',tag:'WebGL / GLSL',   title:'Particle Storm',        desc:'10,000 particles driven by audio frequency with custom vertex shaders.'},
  {n:'02',tag:'Three.js',       title:'Fluid Simulation',      desc:'Real-time SPH fluid dynamics rendered entirely on the GPU.'},
  {n:'03',tag:'Canvas 2D',      title:'Generative Typography', desc:'Type morphing through Perlin noise fields in real time.'},
];

const css = `
.hp-sec{padding:7rem 3.5rem}
.hp-sec-hd{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:3.5rem;flex-wrap:wrap;gap:1.5rem}
.hp-lbl{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.3em;color:rgba(244,242,238,.22);text-transform:uppercase;margin-bottom:1rem;display:flex;align-items:center;gap:.8rem}
.hp-lbl::before{content:'';width:20px;height:1px;background:rgba(244,242,238,.2)}
.hp-stitle{font-family:'Syne',sans-serif;font-size:clamp(2rem,4vw,3.5rem);font-weight:800;line-height:.92;letter-spacing:-.04em;color:#f4f2ee}
.hp-stitle em{font-style:normal;color:transparent;-webkit-text-stroke:1px rgba(244,242,238,.22)}
.hp-all{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.16em;color:rgba(244,242,238,.32);text-decoration:none;text-transform:uppercase;border:1px solid rgba(244,242,238,.12);padding:9px 20px;transition:all .25s;white-space:nowrap}
.hp-all:hover{border-color:rgba(244,242,238,.5);color:#f4f2ee}

/* Works preview grid */
.hp-wg{display:grid;grid-template-columns:2fr 1fr 1fr;gap:1px;background:rgba(244,242,238,.07)}
.hp-wc{position:relative;overflow:hidden;background:#080808;display:block;text-decoration:none}
.hp-wc:first-child{aspect-ratio:3/2}
.hp-wc:not(:first-child){aspect-ratio:4/5}
.hp-wcbg{position:absolute;inset:0;background-size:cover;background-position:center;transition:transform .7s cubic-bezier(.25,.46,.45,.94)}
.hp-wcbg img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .7s cubic-bezier(.25,.46,.45,.94)}
.hp-wc:hover .hp-wcbg,.hp-wc:hover .hp-wcbg img{transform:scale(1.05)}
.hp-wcstrip{position:absolute;bottom:0;left:0;right:0;padding:.9rem 1.2rem;background:linear-gradient(to top,rgba(8,8,8,.85) 0%,transparent 100%);display:flex;align-items:flex-end;justify-content:space-between;gap:.5rem}
.hp-wcname{font-family:'Syne',sans-serif;font-size:clamp(.85rem,1.4vw,1rem);font-weight:700;color:#f4f2ee;letter-spacing:-.01em;line-height:1.2}
.hp-wccat{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.14em;color:rgba(244,242,238,.35);text-transform:uppercase;flex-shrink:0}
.hp-wcov{position:absolute;inset:0;background:rgba(8,8,8,.72);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .35s}
.hp-wcov-arr{font-size:22px;color:#f4f2ee;transform:translate(-4px,4px) rotate(-45deg);transition:transform .3s}
.hp-wc:hover .hp-wcov{opacity:1}
.hp-wc:hover .hp-wcov-arr{transform:none}
.hp-w-empty{padding:3rem;text-align:center;font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(244,242,238,.2);letter-spacing:.14em;background:rgba(244,242,238,.02);border:1px solid rgba(244,242,238,.06)}
.hp-w-loading{display:flex;align-items:center;justify-content:center;height:280px;background:rgba(244,242,238,.02)}

/* Lab preview */
.hp-lg{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(244,242,238,.07)}
.hp-lc{background:#080808;padding:2.5rem 2rem;position:relative;overflow:hidden;transition:background .3s;display:flex;flex-direction:column;justify-content:flex-end;min-height:200px;text-decoration:none}
.hp-lc:hover{background:#0d0d0d}
.hp-lc::before{content:'';position:absolute;top:0;left:0;width:0;height:1px;background:#f4f2ee;transition:width .45s cubic-bezier(.25,.46,.45,.94)}
.hp-lc:hover::before{width:100%}
.hp-lc-bgn{position:absolute;top:.8rem;right:1.2rem;font-family:'Syne',sans-serif;font-size:5rem;font-weight:800;color:rgba(244,242,238,.04);line-height:1;letter-spacing:-.05em;pointer-events:none;transition:color .4s}
.hp-lc:hover .hp-lc-bgn{color:rgba(244,242,238,.07)}
.hp-lc-tag{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.2em;color:rgba(244,242,238,.2);text-transform:uppercase;margin-bottom:.7rem}
.hp-lc-title{font-family:'Syne',sans-serif;font-size:1.15rem;font-weight:700;color:#f4f2ee;letter-spacing:-.02em;margin-bottom:.4rem;line-height:1.15}
.hp-lc-desc{font-family:'Syne',sans-serif;font-size:12px;color:rgba(244,242,238,.32);line-height:1.65}
.hp-lmore{display:flex;align-items:center;justify-content:space-between;padding:1.2rem 2rem;border-top:1px solid rgba(244,242,238,.07);margin-top:1px;background:rgba(244,242,238,.02)}
.hp-lmore-t{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.2em;color:rgba(244,242,238,.22);text-transform:uppercase}
.hp-lmore-n{font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:800;color:rgba(244,242,238,.1);letter-spacing:-.04em}

/* Divider */
.hp-div{height:1px;background:rgba(244,242,238,.07);margin:0}

@media(max-width:1024px){
  .hp-sec{padding:5rem 2rem}
  .hp-wg{grid-template-columns:1fr 1fr}
  .hp-wc:first-child{grid-column:span 2;aspect-ratio:16/9}
  .hp-lg{grid-template-columns:1fr 1fr}
  .hp-lc:last-child{display:none}
}
@media(max-width:768px){
  .hp-sec{padding:4rem 1.25rem}
  .hp-wg{grid-template-columns:1fr}
  .hp-wc:first-child{grid-column:span 1;aspect-ratio:4/3}
  .hp-wc:nth-child(2),.hp-wc:nth-child(3){display:none}
  .hp-lg{grid-template-columns:1fr}
  .hp-lc:nth-child(n+2){display:none}
}
`;

export default function Home() {
  const [projs,  setProjs]  = useState([]);
  const [loading,setLoading]= useState(true);
  useReveal();

  useEffect(() => {
    fetch('/api/projects')
      .then(r=>r.json())
      .then(d=>{ if(d.success) setProjs(d.data); })
      .catch(()=>{})
      .finally(()=>setLoading(false));
  }, []);

  const featured = projs.slice(0, 3);

  return (
    <>
      <SEO />
      <style>{css}</style>
      <Hero />
      <Marquee />

      {/* ── Works Preview ── */}
      <div className="hp-div"/>
      <section className="hp-sec">
        <div className="hp-sec-hd">
          <div>
            <p className="hp-lbl rv">Selected Works</p>
            <h2 className="hp-stitle rv d1">Recent <em>Projects.</em></h2>
          </div>
          <Link to="/works" className="hp-all rv d2">View all works →</Link>
        </div>

        {loading && <div className="hp-w-loading"><div className="spinner"/></div>}

        {!loading && projs.length === 0 && (
          <div className="hp-w-empty">No projects yet — add them in the admin panel.</div>
        )}

        {!loading && projs.length > 0 && (
          <div className="hp-wg">
            {featured.map(p => (
              <Link to={`/project/${p.slug}`} className="hp-wc" key={p.id}>
                <div className="hp-wcbg">
                  {p.coverImage
                    ? <img src={p.coverImage} alt={p.title} loading="lazy"/>
                    : <div style={{position:'absolute',inset:0,background:p.coverGradient||'linear-gradient(135deg,#141414,#080808)'}}/>}
                </div>
                <div className="hp-wcstrip">
                  <span className="hp-wcname">{p.title}</span>
                  <span className="hp-wccat">{CAT_L[p.category]||p.category}</span>
                </div>
                <div className="hp-wcov"><span className="hp-wcov-arr">→</span></div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── Lab Preview ── */}
      <div className="hp-div"/>
      <section className="hp-sec">
        <div className="hp-sec-hd">
          <div>
            <p className="hp-lbl rv">Creative Lab</p>
            <h2 className="hp-stitle rv d1">Experiments &amp; <em>Code Art.</em></h2>
          </div>
          <Link to="/playground" className="hp-all rv d2">Explore the lab →</Link>
        </div>

        <div className="hp-lg">
          {LABS_PREVIEW.map((e,i) => (
            <Link to="/playground" className="hp-lc" key={e.n}>
              <div className="hp-lc-bgn">{e.n}</div>
              <div className="hp-lc-tag">{e.tag}</div>
              <div className="hp-lc-title">{e.title}</div>
              <div className="hp-lc-desc">{e.desc}</div>
            </Link>
          ))}
        </div>
        <div className="hp-lmore">
          <span className="hp-lmore-t">9 experiments total</span>
          <span className="hp-lmore-n">+6 more →</span>
        </div>
      </section>

      <div className="hp-div"/>
      <About />
      <Contact />
      <Footer />
    </>
  );
}
