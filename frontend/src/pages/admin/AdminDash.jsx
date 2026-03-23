import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

const S = `
.dash{font-family:'Inter',sans-serif}
.dw{margin-bottom:2.5rem}
.dw h1{font-family:'Instrument Serif',serif;font-size:clamp(1.8rem,4vw,2.6rem);color:#f0ecff;line-height:1.1}
.dw h1 i{font-style:italic;color:#f4f2ee}
.dw p{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.14em;color:rgba(240,236,255,.4);margin-top:.5rem}
.qa{display:flex;gap:.8rem;flex-wrap:wrap;margin-bottom:2.5rem}
.qab{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.13em;padding:9px 18px;
     border:1px solid rgba(255,255,255,.1);color:rgba(240,236,255,.5);background:none;
     text-decoration:none;transition:all .2s;display:inline-flex;align-items:center;gap:5px}
.qab:hover,.qab.p{border-color:#f4f2ee;color:#f4f2ee;background:rgba(244,242,238,.07);cursor:auto}
.sg{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,.06);margin-bottom:2.5rem}
.sc{background:#05050c;padding:1.4rem}
.sn{font-family:'Instrument Serif',serif;font-size:2.8rem;color:#f0ecff;line-height:1}
.sl2{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.2em;color:rgba(240,236,255,.4);margin-top:.4rem;text-transform:uppercase}
.ss{font-family:'JetBrains Mono',monospace;font-size:9px;color:#f4f2ee;margin-top:.25rem}
.dg{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem}
.dc{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);padding:1.5rem}
.dch{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.2rem;padding-bottom:.8rem;border-bottom:1px solid rgba(255,255,255,.06)}
.dct{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.2em;color:rgba(240,236,255,.35);text-transform:uppercase}
.dcl{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.1em;color:#f4f2ee;text-decoration:none}
.dcl:hover{text-decoration:underline}
.pr{display:flex;justify-content:space-between;align-items:center;padding:.7rem 0;border-bottom:1px solid rgba(255,255,255,.04)}
.pr:last-child{border-bottom:none}
.pn{font-size:13px;font-weight:500;color:#f0ecff}
.pm{font-family:'JetBrains Mono',monospace;font-size:9px;color:rgba(240,236,255,.4);margin-top:1px}
.pb{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.1em;padding:3px 8px;border:1px solid rgba(255,255,255,.08);color:rgba(240,236,255,.4)}
.pb.live{border-color:rgba(52,211,153,.3);color:rgba(52,211,153,.9)}
.cb{display:flex;flex-direction:column;gap:.6rem}
.cr{display:grid;grid-template-columns:90px 1fr 24px;gap:.8rem;align-items:center}
.cl{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.1em;color:rgba(240,236,255,.4)}
.ct{height:4px;background:rgba(255,255,255,.06)}
.cf{height:4px;background:#f4f2ee;transition:width .8s ease}
.cc{font-family:'JetBrains Mono',monospace;font-size:9px;color:rgba(240,236,255,.4);text-align:right}
.mr{display:flex;flex-direction:column;gap:.3rem;padding:.8rem 0;border-bottom:1px solid rgba(255,255,255,.04)}
.mr:last-child{border-bottom:none}
.mr.u .ms{color:#f0ecff;font-weight:500}
.ms{font-size:13px;color:rgba(240,236,255,.5);display:flex;align-items:center;gap:6px}
.md{width:5px;height:5px;background:#f4f2ee;border-radius:50%;flex-shrink:0}
.mv{font-family:'JetBrains Mono',monospace;font-size:9px;color:rgba(240,236,255,.25);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mt2{font-family:'JetBrains Mono',monospace;font-size:8px;color:rgba(240,236,255,.2)}
@media(max-width:900px){.sg{grid-template-columns:repeat(2,1fr)}.dg{grid-template-columns:1fr}}
`;

const CATS = ['brand','ui','motion','3d','print','web'];
const CAT_L = { brand:'Brand', ui:'UI/UX', motion:'Motion', '3d':'3D/CGI', print:'Print', web:'Web' };

export default function AdminDash() {
  const { authFetch } = useOutletContext();
  const [stats, setStats]    = useState(null);
  const [projs, setProjs]    = useState([]);
  const [msgs,  setMsgs]     = useState([]);

  useEffect(() => {
    authFetch('/api/admin/stats').then(r=>r.json()).then(d=>{if(d.success)setStats(d.data)});
    authFetch('/api/admin/projects').then(r=>r.json()).then(d=>{if(d.success)setProjs(d.data.slice(0,5))});
    authFetch('/api/admin/messages').then(r=>r.json()).then(d=>{if(d.success)setMsgs(d.data.slice(0,4))});
  }, []);

  const maxC = stats ? Math.max(...stats.byCategory.map(c=>c.count), 1) : 1;
  const fmt = d => new Date(d).toLocaleDateString('vi-VN');

  return (
    <>
      <style>{S}</style>
      <div className="dash">
        <div className="dw">
          <h1>Welcome back, <i>Thắng.</i></h1>
          <p>Your portfolio overview today</p>
        </div>

        <div className="qa">
          <Link to="/admin/projects/new" className="qab p">+ New Project</Link>
          <Link to="/admin/messages" className="qab">
            ◉ Messages {stats?.unreadMessages > 0 && `(${stats.unreadMessages} unread)`}
          </Link>
          <a href="/" target="_blank" rel="noopener" className="qab">↗ View portfolio</a>
        </div>

        <div className="sg">
          {[
            { n: stats?.totalProjects??'—',  l:'Total projects',   s:`${stats?.publishedProjects??0} published` },
            { n: stats?.totalMessages??'—',  l:'Messages',      s:`${stats?.unreadMessages??0} unread` },
            { n: stats?.byCategory?.find(c=>c.category==='brand')?.count??0, l:'Brand Identity', s:'Brand projects' },
            { n: stats?.byCategory?.find(c=>c.category==='ui')?.count??0,    l:'UI / UX', s:'Digital UI' },
          ].map(s=>(
            <div className="sc" key={s.l}>
              <div className="sn">{s.n}</div>
              <div className="sl2">{s.l}</div>
              <div className="ss">{s.s}</div>
            </div>
          ))}
        </div>

        <div className="dg">
          <div className="dc">
            <div className="dch">
              <span className="dct">Recent projects</span>
              <Link to="/admin/projects" className="dcl">View all →</Link>
            </div>
            {projs.map(p=>(
              <div className="pr" key={p.id}>
                <div>
                  <div className="pn">{p.title}</div>
                  <div className="pm">{p.year} · {CAT_L[p.category]||p.category}</div>
                </div>
                <span className={`pb${p.published!==false?' live':''}`}>
                  {p.published!==false?'Live':'Draft'}
                </span>
              </div>
            ))}
            {!projs.length && <p style={{fontFamily:'DM Mono,monospace',fontSize:10,color:'rgba(240,236,255,.3)',paddingTop:'1rem'}}>No projects yet</p>}
          </div>

          <div className="dc">
            <div className="dch">
              <span className="dct">Category breakdown</span>
            </div>
            <div className="cb" style={{marginBottom:'1.5rem'}}>
              {CATS.map(cat=>{
                const c=stats?.byCategory?.find(x=>x.category===cat)?.count||0;
                return(
                  <div className="cr" key={cat}>
                    <span className="cl">{CAT_L[cat]}</span>
                    <div className="ct"><div className="cf" style={{width:`${(c/maxC)*100}%`}}/></div>
                    <span className="cc">{c}</span>
                  </div>
                );
              })}
            </div>

            <div className="dch">
              <span className="dct">Messages mới</span>
              <Link to="/admin/messages" className="dcl">View all →</Link>
            </div>
            {msgs.length===0 && <p style={{fontFamily:'DM Mono,monospace',fontSize:10,color:'rgba(240,236,255,.3)'}}>No messages yet</p>}
            {msgs.map(m=>(
              <div className={`mr${!m.read?' u':''}`} key={m.id}>
                <div className="ms">
                  {!m.read&&<span className="md"/>}
                  {m.name} <span style={{color:'rgba(240,236,255,.25)',fontSize:10}}>· {m.email}</span>
                </div>
                <div className="mv">{m.message}</div>
                <div className="mt2">{fmt(m.createdAt)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
