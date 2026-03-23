import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer.jsx';
import SEO from '../../components/SEO.jsx';

const S = `
.pd{background:#080808;min-height:100vh;color:#f4f2ee;font-family:'Syne',sans-serif}
.pd-hero{width:100%;height:90vh;min-height:520px;position:relative;overflow:hidden;display:flex;align-items:flex-end}
.pd-cover{position:absolute;inset:0;background-size:cover;background-position:center;transform:scale(1.04);transition:transform 8s ease}
.pd-cover.l{transform:scale(1)}
.pd-fog{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(8,8,8,.1) 0%,rgba(8,8,8,.2) 40%,rgba(8,8,8,.88) 85%,#080808 100%)}
.pd-hct{position:relative;z-index:2;padding:0 3.5rem 4rem;width:100%}
.pd-bc{display:flex;align-items:center;gap:.6rem;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.2em;color:rgba(244,242,238,.3);text-transform:uppercase;margin-bottom:1.5rem}
.pd-bc a{color:rgba(244,242,238,.3);transition:color .2s}
.pd-bc a:hover{color:#f4f2ee}
.pd-bc-s{opacity:.3}
.pd-h1{font-family:'Syne',sans-serif;font-size:clamp(2.8rem,7vw,7rem);font-weight:800;line-height:.92;letter-spacing:-.04em;color:#f4f2ee;margin-bottom:.8rem}
.pd-hsub{font-size:clamp(.9rem,1.6vw,1.1rem);color:rgba(244,242,238,.45);line-height:1.65;max-width:560px}
.pd-meta{display:flex;border-top:1px solid rgba(244,242,238,.07);border-bottom:1px solid rgba(244,242,238,.07)}
.pmi{flex:1;padding:1.3rem 2rem;border-right:1px solid rgba(244,242,238,.06)}
.pmi:last-child{border-right:none}
.pml{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.24em;color:rgba(244,242,238,.22);text-transform:uppercase;margin-bottom:.4rem}
.pmv{font-family:'Syne',sans-serif;font-size:14px;font-weight:600;color:#f4f2ee}
.pd-tags{display:flex;gap:.4rem;flex-wrap:wrap;padding:2rem 3.5rem;border-bottom:1px solid rgba(244,242,238,.06)}
.pdtag{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.16em;color:rgba(244,242,238,.35);border:1px solid rgba(244,242,238,.1);padding:4px 12px;text-transform:uppercase}
.pd-body{max-width:720px;margin:0 auto;padding:5rem 2rem}
.pd-sl{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.28em;color:rgba(244,242,238,.25);text-transform:uppercase;margin-bottom:.8rem;display:flex;align-items:center;gap:.6rem}
.pd-sl::before{content:'';width:16px;height:1px;background:rgba(244,242,238,.25)}
.pd-st{font-family:'Syne',sans-serif;font-size:clamp(1.4rem,2.5vw,2rem);font-weight:800;letter-spacing:-.03em;color:#f4f2ee;margin-bottom:1.2rem;line-height:1}
.pd-tx{font-family:'Syne',sans-serif;font-size:1.05rem;color:rgba(244,242,238,.5);line-height:1.9;margin-bottom:4rem}
.pd-res{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(244,242,238,.08);margin:4rem 0}
.pd-ri{background:#080808;padding:2rem 1.5rem;position:relative}
.pd-ri::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(244,242,238,.2),transparent)}
.pd-rn{font-family:'Syne',sans-serif;font-size:2.6rem;font-weight:800;color:#f4f2ee;line-height:1;margin-bottom:.4rem;letter-spacing:-.04em}
.pd-rt{font-size:13px;color:rgba(244,242,238,.4);line-height:1.6}
.pd-gal{padding:0 0 5rem}
.pd-gh{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.28em;color:rgba(244,242,238,.22);text-transform:uppercase;padding:0 3.5rem 2rem;display:flex;align-items:center;gap:.7rem}
.pd-gh::before{content:'';width:16px;height:1px;background:rgba(244,242,238,.22)}
.gg{display:grid;grid-template-columns:repeat(12,1fr);grid-auto-rows:70px;gap:2px;padding:0 2px}
.gi{overflow:hidden;background:#111;cursor:pointer;position:relative}
.gi:nth-child(1){grid-column:span 8;grid-row:span 6}
.gi:nth-child(2){grid-column:span 4;grid-row:span 4}
.gi:nth-child(3){grid-column:span 4;grid-row:span 4}
.gi:nth-child(4){grid-column:span 4;grid-row:span 4}
.gi:nth-child(5){grid-column:span 4;grid-row:span 4}
.gi:nth-child(6){grid-column:span 6;grid-row:span 5}
.gi:nth-child(7){grid-column:span 6;grid-row:span 5}
.gi:nth-child(n+8){grid-column:span 4;grid-row:span 4}
.gi img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s,filter .4s;filter:brightness(.85)}
.gi:hover img{transform:scale(1.05);filter:brightness(1)}
.pd-rel{padding:0 0 4rem}
.pd-rh{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.28em;color:rgba(244,242,238,.22);text-transform:uppercase;padding:0 3.5rem 2rem;display:flex;align-items:center;gap:.7rem}
.pd-rh::before{content:'';width:16px;height:1px;background:rgba(244,242,238,.22)}
.relg{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(244,242,238,.07)}
.relc{background:#080808;text-decoration:none;display:block;overflow:hidden}
.relcov{width:100%;aspect-ratio:16/9;overflow:hidden}
.relcov img,.relcov-bg{width:100%;height:100%;object-fit:cover;transition:transform .5s;display:block}
.relcov-bg{background-size:cover;background-position:center}
.relc:hover .relcov img,.relc:hover .relcov-bg{transform:scale(1.04)}
.relinf{padding:1rem 1.2rem}
.relcat{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.18em;color:rgba(244,242,238,.25);text-transform:uppercase;margin-bottom:.3rem}
.reltit{font-family:'Syne',sans-serif;font-size:15px;font-weight:700;color:#f4f2ee;letter-spacing:-.01em}
.pd-nav{display:flex;justify-content:space-between;align-items:center;padding:2rem 3.5rem;border-top:1px solid rgba(244,242,238,.07)}
.pd-nb{display:flex;align-items:center;gap:.6rem;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.14em;color:rgba(244,242,238,.3);text-transform:uppercase;transition:color .2s;background:none;border:none;cursor:pointer}
.pd-nb:hover{color:#f4f2ee}
.pd-na{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.14em;color:rgba(244,242,238,.3);text-decoration:none;text-transform:uppercase;padding:7px 16px;border:1px solid rgba(244,242,238,.1);transition:all .2s}
.pd-na:hover{border-color:rgba(244,242,238,.5);color:#f4f2ee}
.pd-load{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#080808}
.pd-err{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2rem;background:#080808;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.14em;color:rgba(244,242,238,.3)}
.lb{position:fixed;inset:0;z-index:999;background:rgba(8,8,8,.97);backdrop-filter:blur(20px);display:flex;align-items:center;justify-content:center;cursor:pointer}
.lb img{max-width:90vw;max-height:90vh;object-fit:contain;cursor:default}
.lb-x{position:absolute;top:1.5rem;right:2rem;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.16em;color:rgba(244,242,238,.35);background:none;border:none;cursor:pointer;text-transform:uppercase;transition:color .2s}
.lb-x:hover{color:#f4f2ee}
.lb-n{position:absolute;top:50%;transform:translateY(-50%);font-family:'JetBrains Mono',monospace;font-size:20px;color:rgba(244,242,238,.3);background:none;border:none;cursor:pointer;padding:1rem;transition:color .2s}
.lb-n:hover{color:#f4f2ee}
.lb-c{position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.2em;color:rgba(244,242,238,.3)}
@media(max-width:900px){.pd-hct{padding:0 1.5rem 3rem}.pd-meta{flex-wrap:wrap}.pmi{flex:1 1 50%;border-right:none;border-bottom:1px solid rgba(244,242,238,.06)}.pd-tags,.pd-gh,.pd-rh,.pd-nav{padding-left:1.5rem;padding-right:1.5rem}.pd-body{padding:3rem 1.5rem}.pd-res{grid-template-columns:1fr}.gg{grid-auto-rows:50px}.gi:nth-child(1){grid-column:span 12;grid-row:span 5}.gi:nth-child(n){grid-column:span 6;grid-row:span 4}.relg{grid-template-columns:1fr}}
@media(max-width:600px){.pd-h1{font-size:clamp(2.2rem,10vw,3.5rem)}.pd-body{padding:2.5rem 1rem}.gg{grid-auto-rows:44px}.gi:nth-child(n){grid-column:span 12;grid-row:span 3}}
`;

const CAT_L = { brand:'Brand Identity', ui:'UI/UX', motion:'Motion', '3d':'3D/VFX', print:'Print', web:'Web' };

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    setLoading(true); setBgLoaded(false);
    fetch(`/api/projects/${slug}`).then(r => r.json()).then(d => {
      if (!d.success) { setNotFound(true); return; }
      setProject(d.data);
      fetch(`/api/projects?category=${d.data.category}`).then(r => r.json()).then(rd => {
        if (rd.success) setRelated(rd.data.filter(p => p.slug !== slug).slice(0, 3));
      });
    }).catch(() => setNotFound(true)).finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (lightbox === null) return;
    const g = project?.gallery || [];
    const h = e => { if (e.key==='Escape') setLightbox(null); if (e.key==='ArrowRight') setLightbox(i=>(i+1)%g.length); if (e.key==='ArrowLeft') setLightbox(i=>(i-1+g.length)%g.length); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [lightbox, project]);

  if (loading) return <><style>{S}</style><div className="pd-load"><div className="spinner"/></div></>;
  if (notFound || !project) return <><style>{S}</style><div className="pd-err"><p>Project not found</p><Link to="/works" style={{color:'rgba(244,242,238,.4)',fontFamily:"'JetBrains Mono',monospace",fontSize:11,letterSpacing:'.14em',border:'1px solid rgba(244,242,238,.12)',padding:'8px 18px'}}>← Works</Link></div></>;

  const gallery = project.gallery || [];
  const coverBg = project.coverImage ? { backgroundImage:`url(${project.coverImage})` } : { background: project.coverGradient || 'linear-gradient(135deg,#111,#080808)' };

  return (
    <>
      <SEO title={project.seoTitle||project.title} description={project.seoDescription||project.description} image={project.coverImage}/>
      <style>{S}</style>
      <main className="pd">
        <div className="pd-hero">
          <div className={`pd-cover${bgLoaded?' l':''}`} style={coverBg} onLoad={()=>setBgLoaded(true)}/>
          <div className="pd-fog"/>
          <div className="pd-hct">
            <div className="pd-bc"><Link to="/works">Works</Link><span className="pd-bc-s">/</span><span>{CAT_L[project.category]||project.category}</span><span className="pd-bc-s">/</span><span>{project.year}</span></div>
            <h1 className="pd-h1">{project.title}</h1>
            {project.subtitle && <p className="pd-hsub">{project.subtitle}</p>}
          </div>
        </div>

        <div className="pd-meta">
          <div className="pmi"><div className="pml">Category</div><div className="pmv">{CAT_L[project.category]||project.category}</div></div>
          <div className="pmi"><div className="pml">Year</div><div className="pmv">{project.year}</div></div>
          <div className="pmi"><div className="pml">Images</div><div className="pmv">{gallery.length+(project.coverImage?1:0)}</div></div>
          {project.featured&&<div className="pmi"><div className="pml">Status</div><div className="pmv" style={{color:'rgba(244,242,238,.4)'}}>Featured</div></div>}
        </div>

        {project.tags?.length>0 && <div className="pd-tags">{project.tags.map(t=><span className="pdtag" key={t}>{t}</span>)}</div>}

        {(project.description||project.problem||project.process||project.result) && (
          <div className="pd-body">
            {project.description&&<><div className="pd-sl">Overview</div><h2 className="pd-st">About the project</h2><p className="pd-tx">{project.description}</p></>}
            {project.problem&&<><div className="pd-sl">Challenge</div><h2 className="pd-st">The problem</h2><p className="pd-tx">{project.problem}</p></>}
            {project.process&&<><div className="pd-sl">Process</div><h2 className="pd-st">How we solved it</h2><p className="pd-tx">{project.process}</p></>}
            {project.result&&(
              <div className="pd-res">
                {project.result.split(/[·•\n]+/).filter(Boolean).slice(0,3).map((r,i)=>{
                  const m=r.trim().match(/^([\d%+×xK,\.]+)\s*(.+)/);
                  return <div className="pd-ri" key={i}>{m?<><div className="pd-rn">{m[1]}</div><div className="pd-rt">{m[2]}</div></>:<div className="pd-rt" style={{marginTop:'1rem'}}>{r.trim()}</div>}</div>;
                })}
              </div>
            )}
          </div>
        )}

        {gallery.length>0&&(
          <div className="pd-gal">
            <div className="pd-gh">Project Images — {gallery.length}</div>
            <div className="gg">
              {gallery.map((url,i)=>(
                <div className="gi" key={i} onClick={()=>setLightbox(i)}>
                  <img src={url} alt={`${project.title} — ${i+1}`} loading="lazy"/>
                </div>
              ))}
            </div>
          </div>
        )}

        {related.length>0&&(
          <div className="pd-rel">
            <div className="pd-rh">More Projects</div>
            <div className="relg">
              {related.map(p=>(
                <Link to={`/project/${p.slug}`} className="relc" key={p.id}>
                  <div className="relcov">
                    {p.coverImage?<img src={p.coverImage} alt={p.title}/>:<div className="relcov-bg" style={{background:p.coverGradient||'linear-gradient(135deg,#111,#080808)'}}/>}
                  </div>
                  <div className="relinf"><div className="relcat">{p.category} · {p.year}</div><div className="reltit">{p.title}</div></div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="pd-nav">
          <button className="pd-nb" onClick={()=>navigate(-1)}>← Back</button>
          <Link to="/works" className="pd-na">All Works</Link>
          <div style={{width:80}}/>
        </div>

        <Footer/>

        {lightbox!==null&&(
          <div className="lb" onClick={()=>setLightbox(null)}>
            <button className="lb-x" onClick={()=>setLightbox(null)}>ESC — Close</button>
            {gallery.length>1&&<><button className="lb-n" style={{left:'1.5rem'}} onClick={e=>{e.stopPropagation();setLightbox(i=>(i-1+gallery.length)%gallery.length)}}>←</button><button className="lb-n" style={{right:'1.5rem'}} onClick={e=>{e.stopPropagation();setLightbox(i=>(i+1)%gallery.length)}}>→</button></>}
            <img src={gallery[lightbox]} alt="" onClick={e=>e.stopPropagation()}/>
            <div className="lb-c">{lightbox+1} / {gallery.length}</div>
          </div>
        )}
      </main>
    </>
  );
}
