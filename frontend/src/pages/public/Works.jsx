import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../components/Footer.jsx';
import SEO from '../../components/SEO.jsx';
import useReveal from '../../hooks/useReveal.js';

const CATS=[{id:'all',l:'All'},{id:'brand',l:'Brand'},{id:'ui',l:'UI/UX'},{id:'motion',l:'Motion'},{id:'3d',l:'3D/VFX'},{id:'print',l:'Print'},{id:'web',l:'Web'}];
const CAT_L={brand:'Brand Identity',ui:'UI / UX',motion:'Motion Design','3d':'3D / VFX',print:'Print',web:'Web'};

const css = `
.wk{background:#080808;min-height:100vh}
.wk-head{padding:9rem 3.5rem 0;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:2rem;border-bottom:1px solid rgba(244,242,238,.07);padding-bottom:3rem}
.wk-ey{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.3em;color:rgba(244,242,238,.22);text-transform:uppercase;margin-bottom:1.2rem;display:flex;align-items:center;gap:.8rem}
.wk-ey::before{content:'';width:20px;height:1px;background:rgba(244,242,238,.2)}
.wk-ti{font-family:'Syne',sans-serif;font-size:clamp(3.5rem,7vw,6.5rem);font-weight:800;line-height:.88;letter-spacing:-.045em;color:#f4f2ee}
.wk-ti em{font-style:normal;color:transparent;-webkit-text-stroke:1px rgba(244,242,238,.22)}
.wk-bignum{font-family:'Syne',sans-serif;font-size:clamp(4rem,9vw,9rem);font-weight:800;color:rgba(244,242,238,.04);line-height:1;letter-spacing:-.05em;text-align:right}
.wk-sub{font-family:'Syne',sans-serif;font-size:.9rem;color:rgba(244,242,238,.28);max-width:280px;line-height:1.7;text-align:right;margin-top:.5rem}
.wk-bar{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 3.5rem;border-bottom:1px solid rgba(244,242,238,.07);flex-wrap:wrap;gap:1rem}
.wk-filters{display:flex;gap:.4rem;flex-wrap:wrap}
.wk-f{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;padding:6px 16px;border:1px solid rgba(244,242,238,.1);color:rgba(244,242,238,.3);background:none;cursor:auto;transition:all .2s}
.wk-f.a,.wk-f:hover{border-color:rgba(244,242,238,.5);color:#f4f2ee;background:rgba(244,242,238,.04)}
.wk-showing{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.18em;color:rgba(244,242,238,.18);text-transform:uppercase}

/* ── Creative project cards ── */
/* Card base */
.wc{position:relative;overflow:hidden;background:#0a0a0a;display:block;text-decoration:none}
.wc-bg{position:absolute;inset:0;background-size:cover;background-position:center}
.wc-bg img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .7s cubic-bezier(.25,.46,.45,.94),filter .5s}
.wc-bg-grad{position:absolute;inset:0;background-size:cover;background-position:center;transition:transform .7s cubic-bezier(.25,.46,.45,.94)}
.wc:hover .wc-bg img,.wc:hover .wc-bg-grad{transform:scale(1.05)}
/* Persistent bottom info */
.wc-bot{position:absolute;bottom:0;left:0;right:0;padding:1rem 1.3rem;background:linear-gradient(to top,rgba(8,8,8,.88) 0%,transparent 100%);display:flex;align-items:flex-end;justify-content:space-between;gap:.5rem}
.wc-bot-n{font-family:'Syne',sans-serif;font-size:clamp(.85rem,1.5vw,1.05rem);font-weight:700;color:#f4f2ee;letter-spacing:-.015em;line-height:1.2}
.wc-bot-y{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.16em;color:rgba(244,242,238,.32);text-transform:uppercase;flex-shrink:0}
/* Hover overlay */
.wc-ov{position:absolute;inset:0;background:rgba(8,8,8,.74);display:flex;flex-direction:column;justify-content:flex-end;padding:1.8rem;opacity:0;transition:opacity .35s}
.wc:hover .wc-ov{opacity:1}
.wc-ov-cat{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.22em;color:rgba(244,242,238,.45);text-transform:uppercase;margin-bottom:.5rem;transition:transform .3s .05s,opacity .3s .05s;transform:translateY(10px);opacity:0}
.wc-ov-ti{font-family:'Syne',sans-serif;font-size:clamp(1.1rem,2.2vw,1.8rem);font-weight:800;color:#f4f2ee;letter-spacing:-.025em;line-height:1.05;transition:transform .3s .1s,opacity .3s .1s;transform:translateY(10px);opacity:0}
.wc-ov-sub{font-family:'Syne',sans-serif;font-size:12px;color:rgba(244,242,238,.45);margin-top:.4rem;transition:transform .3s .15s,opacity .3s .15s;transform:translateY(10px);opacity:0;line-height:1.5}
.wc:hover .wc-ov-cat,.wc:hover .wc-ov-ti,.wc:hover .wc-ov-sub{transform:none;opacity:1}
.wc-ov-arr{position:absolute;top:1.2rem;right:1.2rem;width:32px;height:32px;border:1px solid rgba(244,242,238,.2);display:flex;align-items:center;justify-content:center;font-size:14px;color:rgba(244,242,238,.4);transition:all .3s}
.wc:hover .wc-ov-arr{border-color:#f4f2ee;color:#f4f2ee}

/* ── ROW LAYOUTS ──
   Each row uses flex so it degrades gracefully */
.wk-rows{display:flex;flex-direction:column;gap:1px;background:rgba(244,242,238,.07)}

/* Row type A: 1 big (60%) + 2 stacked (40%) */
.row-a{display:flex;gap:1px;height:500px}
.row-a .wc-main{flex:0 0 60%}
.row-a .wc-stack{flex:1;display:flex;flex-direction:column;gap:1px}
.row-a .wc-stack .wc{flex:1}

/* Row type B: 2 equal wide */
.row-b{display:flex;gap:1px;height:420px}
.row-b .wc{flex:1}

/* Row type C: 3 equal portrait */
.row-c{display:flex;gap:1px;height:460px}
.row-c .wc{flex:1}

/* Row type D: small (35%) + large (65%) */
.row-d{display:flex;gap:1px;height:440px}
.row-d .wc-sm{flex:0 0 35%}
.row-d .wc-lg{flex:1}

/* Row type E: single full-width */
.row-e{height:400px}
.row-e .wc{width:100%;height:100%}

.wk-empty{padding:5rem;text-align:center;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.14em;color:rgba(244,242,238,.2)}
.wk-loading{display:flex;align-items:center;justify-content:center;height:50vh}
.wk-foot{display:flex;justify-content:space-between;align-items:center;padding:1.5rem 3.5rem;border-top:1px solid rgba(244,242,238,.06)}
.wk-foot span{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.18em;color:rgba(244,242,238,.18);text-transform:uppercase}

/* Responsive */
@media(max-width:1100px){
  .wk-head{padding:8rem 2rem 2.5rem}
  .wk-bar{padding:1.2rem 2rem}
  .row-a,.row-b,.row-c,.row-d,.row-e{height:380px}
  .wk-foot{padding:1.2rem 2rem}
}
@media(max-width:768px){
  .wk-head{padding:7rem 1.25rem 2rem}
  .wk-bar{padding:1rem 1.25rem}
  .row-a,.row-b,.row-c,.row-d{flex-direction:column;height:auto}
  .row-a .wc-main,.row-a .wc-stack,.row-d .wc-sm,.row-d .wc-lg{flex:none}
  .row-a .wc-main,.row-d .wc-lg{aspect-ratio:4/3}
  .row-a .wc-stack{flex-direction:row}
  .row-a .wc-stack .wc,.row-b .wc,.row-c .wc{aspect-ratio:4/3}
  .row-d .wc-sm{display:none}
  .row-e{height:280px}
  .wk-foot{padding:1rem 1.25rem}
}
@media(max-width:480px){
  .row-a .wc-stack{display:none}
  .row-c .wc:nth-child(n+2){display:none}
}
`;

function Cover({ p }) {
  if (p.coverImage) return <div className="wc-bg"><img src={p.coverImage} alt={p.title} loading="lazy"/></div>;
  return <div className="wc-bg"><div className="wc-bg-grad" style={{background:p.coverGradient||'linear-gradient(135deg,#181818,#080808)'}}/></div>;
}

function Card({ p }) {
  return (
    <Link to={`/project/${p.slug}`} className="wc">
      <Cover p={p}/>
      <div className="wc-bot">
        <span className="wc-bot-n">{p.title}</span>
        <span className="wc-bot-y">{p.year}</span>
      </div>
      <div className="wc-ov">
        <div className="wc-ov-arr">→</div>
        <div className="wc-ov-cat">{CAT_L[p.category]||p.category}</div>
        <div className="wc-ov-ti">{p.title}</div>
        {p.subtitle && <div className="wc-ov-sub">{p.subtitle}</div>}
      </div>
    </Link>
  );
}

function buildRows(list) {
  /* cycle through 5 layout patterns */
  const patterns = ['a','b','c','d','b','c','a','d'];
  const rows = [];
  let i = 0, pi = 0;

  while (i < list.length) {
    const pat = patterns[pi % patterns.length];
    pi++;

    if (pat === 'e' || i === 0) {
      // first card full-width
      rows.push({ type:'e', items:[list[i]] });
      i += 1;
    } else if (pat === 'a' && list.length - i >= 3) {
      rows.push({ type:'a', main:list[i], stack:[list[i+1], list[i+2]] });
      i += 3;
    } else if (pat === 'b' && list.length - i >= 2) {
      rows.push({ type:'b', items:[list[i], list[i+1]] });
      i += 2;
    } else if (pat === 'c' && list.length - i >= 3) {
      rows.push({ type:'c', items:[list[i], list[i+1], list[i+2]] });
      i += 3;
    } else if (pat === 'd' && list.length - i >= 2) {
      rows.push({ type:'d', sm:list[i], lg:list[i+1] });
      i += 2;
    } else {
      // fallback: put remaining in a b-row or single
      if (list.length - i >= 2) {
        rows.push({ type:'b', items:[list[i], list[i+1]] });
        i += 2;
      } else {
        rows.push({ type:'e', items:[list[i]] });
        i += 1;
      }
    }
  }
  return rows;
}

export default function Works() {
  const { category } = useParams();
  const [projs,  setProjs]  = useState([]);
  const [filter, setFilter] = useState(category || 'all');
  const [loading,setLoading]= useState(true);
  useReveal();

  useEffect(() => { if (category) setFilter(category); }, [category]);
  useEffect(() => {
    fetch('/api/projects').then(r=>r.json()).then(d=>{ if(d.success) setProjs(d.data); }).catch(()=>{}).finally(()=>setLoading(false));
  }, []);

  const list = filter==='all' ? projs : projs.filter(p=>p.category===filter);
  const rows = buildRows(list);

  return (
    <>
      <SEO title="Works" description="Selected creative projects by Nguyen D. Thang."/>
      <style>{css}</style>
      <main className="wk">
        <div className="wk-head">
          <div>
            <p className="wk-ey rv">Portfolio · {new Date().getFullYear()}</p>
            <h1 className="wk-ti rv d1">Selected<br/><em>Works.</em></h1>
          </div>
          <div>
            <div className="wk-bignum rv d1">{String(projs.length).padStart(2,'0')}</div>
            <p className="wk-sub rv d2">Brand identity, VFX, motion and digital experiences.</p>
          </div>
        </div>

        <div className="wk-bar">
          <div className="wk-filters">
            {CATS.map(c=>(
              <button key={c.id} className={`wk-f${filter===c.id?' a':''}`} onClick={()=>setFilter(c.id)}>
                {c.l} ({c.id==='all'?projs.length:projs.filter(p=>p.category===c.id).length})
              </button>
            ))}
          </div>
          <span className="wk-showing">{list.length} work{list.length!==1?'s':''}</span>
        </div>

        {loading && <div className="wk-loading"><div className="spinner"/></div>}
        {!loading && list.length===0 && <div className="wk-empty">No projects in this category.</div>}

        {!loading && list.length > 0 && (
          <div className="wk-rows">
            {rows.map((row, ri) => {
              if (row.type==='e') return (
                <div className="row-e" key={ri}><Card p={row.items[0]}/></div>
              );
              if (row.type==='a') return (
                <div className="row-a" key={ri}>
                  <div className="wc-main"><Card p={row.main}/></div>
                  <div className="wc-stack">{row.stack.map((p,i)=><Card key={i} p={p}/>)}</div>
                </div>
              );
              if (row.type==='b') return (
                <div className="row-b" key={ri}>{row.items.map((p,i)=><Card key={i} p={p}/>)}</div>
              );
              if (row.type==='c') return (
                <div className="row-c" key={ri}>{row.items.map((p,i)=><Card key={i} p={p}/>)}</div>
              );
              if (row.type==='d') return (
                <div className="row-d" key={ri}>
                  <div className="wc-sm"><Card p={row.sm}/></div>
                  <div className="wc-lg"><Card p={row.lg}/></div>
                </div>
              );
              return null;
            })}
          </div>
        )}

        <div className="wk-foot">
          <span>Nguyen D. Thang · Portfolio</span>
          <span>{list.length} works displayed</span>
        </div>
      </main>
      <Footer/>
    </>
  );
}
