import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext.jsx';

const css = `
#hero{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;align-items:center;position:relative;overflow:hidden;background:#080808}
#hcvs{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:.55}
.h-orb1{position:absolute;width:70vw;height:70vw;top:-20%;right:-20%;border-radius:50%;background:radial-gradient(circle at 38% 38%,rgba(244,242,238,.06) 0%,transparent 65%);pointer-events:none;z-index:0}
.h-badge{position:absolute;top:7rem;right:3.5rem;display:flex;align-items:center;gap:.5rem;font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.2em;color:rgba(244,242,238,.35);text-transform:uppercase;border:1px solid rgba(244,242,238,.1);padding:7px 14px;z-index:3;opacity:0;animation:fadeIn .8s 1.8s forwards}
.h-badge-d{width:5px;height:5px;background:#f4f2ee;border-radius:50%;animation:blink 2.5s infinite}
.h-left{position:relative;z-index:2;padding:9rem 0 7rem 3.5rem;display:flex;flex-direction:column;justify-content:center}
.h-idx{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.32em;color:rgba(244,242,238,.18);margin-bottom:2.5rem;display:flex;align-items:center;gap:1rem;opacity:0;animation:fadeUp .6s .1s forwards}
.h-idx::before{content:'';width:36px;height:1px;background:rgba(244,242,238,.15)}
.h-name{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(3.8rem,7.5vw,7.5rem);line-height:.92;letter-spacing:-.04em;margin-bottom:.4rem;overflow:visible;position:relative;opacity:0;animation:fadeUp .9s .28s forwards}
.h-n1{display:block;color:#f4f2ee;position:relative}
.h-n1::before,.h-n1::after{content:attr(data-text);position:absolute;top:0;left:0;width:100%;color:#f4f2ee;overflow:hidden;pointer-events:none}
.h-n1::before{animation:glitch 6s 2s infinite;opacity:.65}
.h-n1::after{animation:glitch 6s 2.4s infinite reverse;opacity:.4}
.h-n2{display:block;color:transparent;-webkit-text-stroke:1px rgba(244,242,238,.22)}
.h-role{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.26em;color:rgba(244,242,238,.28);text-transform:uppercase;margin-bottom:2.5rem;opacity:0;animation:fadeUp .7s .5s forwards}
.h-tag{font-family:'Syne',sans-serif;font-size:clamp(.9rem,1.4vw,1.05rem);color:rgba(244,242,238,.44);line-height:1.8;max-width:420px;margin-bottom:3rem;opacity:0;animation:fadeUp .7s .65s forwards}
.h-acts{display:flex;gap:.8rem;align-items:center;flex-wrap:wrap;opacity:0;animation:fadeUp .7s .8s forwards}
.h-bp{display:inline-flex;align-items:center;gap:10px;background:#f4f2ee;color:#080808;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.16em;text-transform:uppercase;padding:13px 28px;border:none;cursor:none;transition:all .3s;position:relative;overflow:hidden}
.h-bp::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);transform:translateX(-100%);transition:.5s}
.h-bp:hover::after{transform:translateX(100%)}
.h-bp:hover{background:#e8e6e2;transform:translateY(-2px)}
.h-bs{display:inline-flex;align-items:center;gap:10px;background:transparent;color:rgba(244,242,238,.5);font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.16em;text-transform:uppercase;padding:13px 28px;border:1px solid rgba(244,242,238,.14);cursor:none;transition:all .3s}
.h-bs:hover{border-color:rgba(244,242,238,.5);color:#f4f2ee}
.h-socrow{display:flex;gap:1.5rem;align-items:center;margin-top:2rem;flex-wrap:wrap;opacity:0;animation:fadeUp .7s 1s forwards}
.h-soclink{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.18em;color:rgba(244,242,238,.28);text-decoration:none;text-transform:uppercase;transition:color .2s;display:flex;align-items:center;gap:.5rem}
.h-soclink::before{content:'';width:14px;height:1px;background:currentColor;opacity:.4}
.h-soclink:hover{color:#f4f2ee}
.h-stats{position:absolute;bottom:2.5rem;left:3.5rem;display:flex;gap:2.5rem;z-index:2;opacity:0;animation:fadeIn 1s 1.3s forwards}
.h-sn{font-family:'Syne',sans-serif;font-size:1.8rem;font-weight:800;line-height:1;color:#f4f2ee;letter-spacing:-.03em}
.h-sn sup{font-size:.9rem;color:rgba(244,242,238,.35);vertical-align:super}
.h-sl{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.2em;color:rgba(244,242,238,.28);text-transform:uppercase;margin-top:3px}
.h-right{position:relative;z-index:2;height:100vh;display:flex;align-items:center;justify-content:center}
.h-3d{position:relative;width:480px;height:480px}
.h-ring{position:absolute;border-radius:50%;top:50%;left:50%}
.hr1{width:220px;height:220px;border:1px solid rgba(244,242,238,.18);animation:rotRing 12s linear infinite}
.hr2{width:320px;height:320px;border:1px dashed rgba(244,242,238,.07);animation:rotRing 20s linear infinite reverse}
.hr3{width:420px;height:420px;border:1px solid rgba(244,242,238,.04);animation:rotRing 32s linear infinite}
.h-odot{position:absolute;width:7px;height:7px;background:#f4f2ee;border-radius:50%;box-shadow:0 0 12px rgba(244,242,238,.5);top:calc(50% - 110px);left:calc(50% - 3.5px);transform-origin:3.5px 110px;animation:orb 12s linear infinite}
.h-odot2{position:absolute;width:4px;height:4px;background:rgba(244,242,238,.45);border-radius:50%;top:calc(50% - 160px);left:calc(50% - 2px);transform-origin:2px 160px;animation:orb 20s linear infinite reverse}
.h-sphere{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:100px;height:100px;border-radius:50%;background:radial-gradient(circle at 35% 35%,rgba(244,242,238,.15) 0%,rgba(244,242,238,.05) 45%,transparent 70%);border:1px solid rgba(244,242,238,.1);animation:spherePulse 5s ease-in-out infinite}
.h-eq{position:absolute;top:50%;left:50%;border-radius:50%;border:1px solid rgba(244,242,238,.07)}
.heq1{width:100px;height:28px;margin:-14px 0 0 -50px}
.heq2{width:76px;height:22px;margin:-11px 0 0 -38px;transform:rotateX(40deg)}
.heq3{width:28px;height:100px;margin:-50px 0 0 -14px}
.heq4{width:28px;height:100px;margin:-50px 0 0 -14px;transform:rotateY(60deg)}
.h-ftag{position:absolute;font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.14em;color:rgba(244,242,238,.38);border:1px solid rgba(244,242,238,.09);padding:5px 10px;text-transform:uppercase;background:rgba(8,8,8,.55);backdrop-filter:blur(8px)}
.hft1{top:12%;right:5%;animation:float 5s ease-in-out infinite}
.hft2{top:38%;left:3%;animation:float 6s ease-in-out infinite .7s}
.hft3{bottom:22%;right:4%;animation:float 4.5s ease-in-out infinite 1.2s}
.hft4{bottom:10%;left:5%;animation:float 5.5s ease-in-out infinite .3s}
.h-scroll{position:absolute;bottom:2.5rem;right:3.5rem;display:flex;flex-direction:column;align-items:center;gap:8px;z-index:2;opacity:0;animation:fadeIn 1s 1.8s forwards}
.h-scrl{width:1px;height:50px;background:linear-gradient(to bottom,transparent,rgba(244,242,238,.38));animation:scrollLine 2.5s 1.8s infinite}
.h-scrt{font-family:'JetBrains Mono',monospace;font-size:7px;letter-spacing:.26em;color:rgba(244,242,238,.22);writing-mode:vertical-rl;text-transform:uppercase}
@media(max-width:1100px){#hero{grid-template-columns:1fr}.h-right{display:none}.h-left{padding:8rem 1.5rem 6rem}.h-stats{left:1.5rem}.h-badge{right:1.5rem;top:6rem}.h-scroll{right:1.5rem}}
@media(max-width:600px){.h-name{font-size:clamp(3.2rem,13vw,5rem)}.h-stats{gap:1.5rem;bottom:1.5rem}.h-acts{flex-direction:column;align-items:stretch}.h-bp,.h-bs{justify-content:center}}
`;

function initCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, pts = [], raf;
  const rand = (a, b) => Math.random() * (b - a) + a;
  const init = () => {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    pts = Array.from({ length: Math.floor((W * H) / 13000) }, () => ({
      x: rand(0, W), y: rand(0, H), vx: rand(-.1,.1), vy: rand(-.1,.1), r: rand(.3,1.5), a: rand(.06,.35),
    }));
  };
  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
        if (d < 110) { ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y); ctx.strokeStyle=`rgba(244,242,238,${(.045*(1-d/110)).toFixed(3)})`; ctx.lineWidth=.4; ctx.stroke(); }
      }
      const p=pts[i]; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=`rgba(244,242,238,${p.a})`; ctx.fill();
      p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>W)p.vx*=-1; if(p.y<0||p.y>H)p.vy*=-1;
    }
    raf=requestAnimationFrame(draw);
  };
  init(); draw();
  window.addEventListener('resize', init);
  return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', init); };
}

export default function Hero() {
  const cvs = useRef(null);
  const { settings } = useSite();
  const h = settings?.hero  || {};
  const s = settings?.social || {};
  useEffect(() => { if (cvs.current) return initCanvas(cvs.current); }, []);
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });
  const stats = h.stats || [{num:'6',label:'Years'},{num:'70',label:'Projects'},{num:'30',label:'Clients'}];
  const qlinks = [
    s.telegram && {href:s.telegram,l:'Telegram'},
    s.behance  && {href:s.behance, l:'Behance'},
    s.email    && {href:`mailto:${s.email}`,l:s.email},
  ].filter(Boolean).slice(0,3);

  return (
    <>
      <style>{css}</style>
      <section id="hero">
        <canvas ref={cvs} id="hcvs"/>
        <div className="h-orb1"/>
        <div className="h-badge"><span className="h-badge-d"/>Available for hire</div>

        <div className="h-left">
          <div className="h-idx">Portfolio · 2025</div>
          <h1 className="h-name">
            <span className="h-n1" data-text={h.name||'Nguyen D.'}>{h.name||'Nguyen D.'}</span>
            <span className="h-n2">{h.nameLine2||'Thang.'}</span>
          </h1>
          <p className="h-role">{h.role||'Brand · UI/UX · Motion · 3D/VFX'}</p>
          <p className="h-tag">{h.tagline||'Visual architect turning concepts into unforgettable visual experiences.'}</p>
          <div className="h-acts">
            <Link to="/works" className="h-bp">{h.ctaLabel||'View Works'} →</Link>
            <button className="h-bs" onClick={()=>scrollTo('about')}>About me</button>
          </div>
          {qlinks.length > 0 && (
            <div className="h-socrow">
              {qlinks.map(l=><a key={l.l} href={l.href} target={l.href.startsWith('http')?'_blank':undefined} rel="noopener" className="h-soclink">{l.l}</a>)}
            </div>
          )}
          <div className="h-stats">
            {stats.map(st=>(
              <div key={st.label}>
                <div className="h-sn">{st.num}<sup>+</sup></div>
                <div className="h-sl">{st.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-right">
          <div className="h-3d">
            <div className="h-ftag hft1">Cinema 4D</div>
            <div className="h-ftag hft2">After Effects</div>
            <div className="h-ftag hft3">Blender</div>
            <div className="h-ftag hft4">WebGL</div>
            <div className="h-ring hr1"/><div className="h-ring hr2"/><div className="h-ring hr3"/>
            <div className="h-odot"/><div className="h-odot2"/>
            <div className="h-sphere"><div className="h-eq heq1"/><div className="h-eq heq2"/><div className="h-eq heq3"/><div className="h-eq heq4"/></div>
          </div>
        </div>

        <div className="h-scroll"><div className="h-scrl"/><span className="h-scrt">Scroll</span></div>
      </section>
    </>
  );
}
