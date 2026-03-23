import React from 'react';
import { useSite } from '../context/SiteContext.jsx';
import useReveal from '../hooks/useReveal.js';

const css = `
#about{padding:9rem 3.5rem;background:#080808}
.ab-g{display:grid;grid-template-columns:1fr 1.1fr;gap:6rem;max-width:1280px;margin:0 auto;align-items:start}
.ab-lbl{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.3em;color:rgba(244,242,238,.25);text-transform:uppercase;margin-bottom:2.5rem;display:flex;align-items:center;gap:.8rem}
.ab-lbl::before{content:'';width:20px;height:1px;background:rgba(244,242,238,.22)}
.ab-title{font-family:'Syne',sans-serif;font-size:clamp(2.2rem,4.5vw,3.8rem);font-weight:800;line-height:.92;letter-spacing:-.04em;color:#f4f2ee;margin-bottom:2rem}
.ab-title em{font-style:normal;color:transparent;-webkit-text-stroke:1px rgba(244,242,238,.25)}
.ab-body{font-family:'Syne',sans-serif;font-size:1rem;color:rgba(244,242,238,.42);line-height:1.9;margin-bottom:2.5rem}
.ab-skills{display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:3rem}
.ab-sk{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.16em;color:rgba(244,242,238,.38);border:1px solid rgba(244,242,238,.1);padding:5px 12px;text-transform:uppercase;transition:all .2s}
.ab-sk:hover{border-color:rgba(244,242,238,.45);color:#f4f2ee}
.ab-cta{display:inline-flex;align-items:center;gap:10px;background:#f4f2ee;color:#080808;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.16em;text-transform:uppercase;padding:13px 26px;transition:all .3s;text-decoration:none}
.ab-cta:hover{background:#e8e6e2;transform:translateY(-2px)}
.ab-card{background:#0d0d0d;border:1px solid rgba(244,242,238,.08);overflow:hidden}
.ab-card-s{padding:2rem;border-bottom:1px solid rgba(244,242,238,.06)}
.ab-clbl{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.24em;color:rgba(244,242,238,.22);text-transform:uppercase;margin-bottom:1.2rem}
.ab-exp{display:flex;justify-content:space-between;align-items:flex-start;padding:.85rem 0;border-bottom:1px solid rgba(244,242,238,.05)}
.ab-exp:last-child{border-bottom:none}
.ab-expt{font-family:'Syne',sans-serif;font-size:13px;font-weight:600;color:#f4f2ee;margin-bottom:2px}
.ab-expc{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.1em;color:rgba(244,242,238,.28)}
.ab-expy{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.1em;color:rgba(244,242,238,.22);flex-shrink:0}
.ab-proc{padding:1.8rem}
.ab-proc-g{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(244,242,238,.06);margin-top:1rem}
.ab-proc-i{background:#0d0d0d;padding:1.2rem}
.ab-proc-n{font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:rgba(244,242,238,.07);line-height:1;margin-bottom:.5rem;letter-spacing:-.03em}
.ab-proc-t{font-family:'Syne',sans-serif;font-size:12px;font-weight:600;color:#f4f2ee;margin-bottom:.2rem}
.ab-proc-d{font-family:'Syne',sans-serif;font-size:11px;color:rgba(244,242,238,.32);line-height:1.55}
@media(max-width:1024px){.ab-g{grid-template-columns:1fr;gap:4rem}#about{padding:7rem 2rem}}
@media(max-width:600px){#about{padding:5rem 1.25rem}.ab-proc-g{grid-template-columns:1fr}}
`;

const PROC = [
  {n:'01',t:'Discovery',d:'Goals, audience, creative direction.'},
  {n:'02',t:'Concept',d:'Moodboards, references, initial direction.'},
  {n:'03',t:'Execution',d:'High-fidelity design, motion, 3D.'},
  {n:'04',t:'Delivery',d:'Final assets, docs, ongoing support.'},
];

export default function About() {
  useReveal();
  const { settings } = useSite();
  const a = settings?.about || {};
  const skills = a.skills || ['Cinema 4D','Houdini','Blender','After Effects','Redshift','WebGL','Figma','Premiere'];
  const exp = a.experience || [
    {title:'Senior VFX Artist',company:'Studio Pixel · HCMC',year:'2022–Now'},
    {title:'Motion Designer',company:'The Pixel Lab',year:'2020–22'},
    {title:'Brand Designer',company:'Freelance',year:'2018–20'},
  ];

  const titleWords = (a.title||'I build digital').split(' ');
  const accent = a.titleAccent || titleWords[titleWords.length-1];
  const rest = titleWords.slice(0,-1).join(' ');

  return (
    <>
      <style>{css}</style>
      <section id="about">
        <div className="ab-g">
          <div>
            <p className="ab-lbl rv">About</p>
            <h2 className="ab-title rv d1">{rest} <em>{accent}</em></h2>
            <p className="ab-body rv d2">{a.body||'With 6+ years in digital creative, I specialize in VFX, 3D rendering, and brand design.'}</p>
            <div className="ab-skills rv d3">{skills.map(s=><span className="ab-sk" key={s}>{s}</span>)}</div>
            <a href="#contact" className="ab-cta rv d4" onClick={e=>{e.preventDefault();document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}}>{a.ctaLabel||"Let's collaborate →"}</a>
          </div>
          <div className="rv d2">
            <div className="ab-card">
              <div className="ab-card-s">
                <div className="ab-clbl">Experience</div>
                {exp.map(e=>(
                  <div className="ab-exp" key={e.title}>
                    <div><div className="ab-expt">{e.title}</div><div className="ab-expc">{e.company}</div></div>
                    <div className="ab-expy">{e.year}</div>
                  </div>
                ))}
              </div>
              <div className="ab-proc">
                <div className="ab-clbl">Process</div>
                <div className="ab-proc-g">
                  {PROC.map(p=>(
                    <div className="ab-proc-i" key={p.n}>
                      <div className="ab-proc-n">{p.n}</div>
                      <div className="ab-proc-t">{p.t}</div>
                      <div className="ab-proc-d">{p.d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
