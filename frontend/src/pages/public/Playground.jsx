import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer.jsx';
import SEO from '../../components/SEO.jsx';

const css = `
.lab{background:#080808;min-height:100vh}
.lab-head{padding:9rem 3.5rem 5rem;display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:end;border-bottom:1px solid rgba(244,242,238,.07)}
.lab-ey{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.3em;color:rgba(244,242,238,.22);text-transform:uppercase;margin-bottom:1.2rem;display:flex;align-items:center;gap:.8rem}
.lab-ey::before{content:'';width:20px;height:1px;background:rgba(244,242,238,.2)}
.lab-ti{font-family:'Syne',sans-serif;font-size:clamp(3.5rem,7vw,6.5rem);font-weight:800;line-height:.88;letter-spacing:-.045em;color:#f4f2ee}
.lab-ti em{font-style:normal;color:transparent;-webkit-text-stroke:1px rgba(244,242,238,.22)}
.lab-desc{font-family:'Syne',sans-serif;font-size:1rem;color:rgba(244,242,238,.38);line-height:1.8;max-width:400px;align-self:end}
.lab-grid{display:grid;grid-template-columns:repeat(3,1fr)}
.lab-c{position:relative;border-right:1px solid rgba(244,242,238,.07);border-bottom:1px solid rgba(244,242,238,.07);padding:2.5rem;overflow:hidden;min-height:220px;display:flex;flex-direction:column;justify-content:flex-end;transition:background .3s;background:#080808}
.lab-c:nth-child(3n){border-right:none}
.lab-c:hover{background:#0c0c0c}
.lab-c::before{content:'';position:absolute;top:0;left:0;width:0;height:1px;background:#f4f2ee;transition:width .45s cubic-bezier(.25,.46,.45,.94)}
.lab-c:hover::before{width:100%}
.lab-c-bgn{position:absolute;top:1rem;right:1.5rem;font-family:'Syne',sans-serif;font-size:6rem;font-weight:800;color:rgba(244,242,238,.04);line-height:1;letter-spacing:-.05em;pointer-events:none;transition:color .4s,transform .4s}
.lab-c:hover .lab-c-bgn{color:rgba(244,242,238,.07);transform:scale(1.05)}
.lab-c-tag{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.2em;color:rgba(244,242,238,.2);text-transform:uppercase;margin-bottom:.8rem}
.lab-c-ti{font-family:'Syne',sans-serif;font-size:clamp(1rem,1.5vw,1.25rem);font-weight:700;color:#f4f2ee;letter-spacing:-.02em;margin-bottom:.5rem;line-height:1.15}
.lab-c-desc{font-family:'Syne',sans-serif;font-size:12px;color:rgba(244,242,238,.35);line-height:1.65}
.lab-c-arr{position:absolute;top:1.5rem;left:2.5rem;font-family:'JetBrains Mono',monospace;font-size:12px;color:rgba(244,242,238,.1);transition:all .3s}
.lab-c:hover .lab-c-arr{color:rgba(244,242,238,.5);transform:translate(3px,-3px)}
.lab-foot{display:flex;justify-content:space-between;padding:1.5rem 3.5rem;border-top:1px solid rgba(244,242,238,.06)}
.lab-foot span{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.18em;color:rgba(244,242,238,.18);text-transform:uppercase}
@media(max-width:1024px){.lab-grid{grid-template-columns:1fr 1fr}.lab-c:nth-child(3n){border-right:1px solid rgba(244,242,238,.07)}.lab-c:nth-child(2n){border-right:none}.lab-head{padding:8rem 2rem 4rem}.lab-foot{padding:1.2rem 2rem}}
@media(max-width:768px){.lab-grid{grid-template-columns:1fr}.lab-c{border-right:none}.lab-head{grid-template-columns:1fr;padding:7rem 1.25rem 3rem}.lab-foot{padding:1rem 1.25rem}}
`;

const EXPERIMENTS = [
  {n:'01',tag:'WebGL / GLSL',      title:'Particle Storm',         desc:'10,000 particles driven by audio frequency with custom vertex shaders and noise displacement.'},
  {n:'02',tag:'Three.js',          title:'Fluid Simulation',       desc:'Real-time fluid dynamics using SPH algorithm rendered entirely on the GPU via compute shaders.'},
  {n:'03',tag:'Canvas 2D',         title:'Generative Typography',  desc:'Type morphing through Perlin noise fields and sine wave distortion in real time.'},
  {n:'04',tag:'CSS 3D',            title:'Depth Illusion',         desc:'Layered CSS transforms creating parallax depth with zero JavaScript — pure CSS only.'},
  {n:'05',tag:'SVG + GSAP',        title:'Morphing Paths',         desc:'Organic SVG shapes that continuously morph between states using GSAP MorphSVG.'},
  {n:'06',tag:'Web Audio API',     title:'Waveform Visualizer',    desc:'Browser-native audio analysis driving reactive visual output — frequency bars and oscilloscope.'},
  {n:'07',tag:'React Three Fiber', title:'3D Product Viewer',      desc:'360° product inspection with HDR environment lighting and physically-based materials.'},
  {n:'08',tag:'P5.js',             title:'Cellular Automata',      desc:"Conway's Game of Life variant with color memory and trail effects."},
  {n:'09',tag:'CSS Houdini',       title:'Paint Worklets',         desc:'Custom paint worklets for procedurally animated backgrounds — no canvas element needed.'},
];

export default function Playground() {
  const refs = useRef([]);

  useEffect(() => {
    // Self-contained: does NOT depend on useReveal or any class
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }
      }),
      { threshold: 0.04 }
    );
    refs.current.forEach(el => { if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <SEO title="Lab" description="Creative experiments by Nguyen D. Thang — WebGL, generative art, creative code."/>
      <style>{css}</style>
      <main className="lab">
        <div className="lab-head">
          <div>
            <p className="lab-ey">Experiments · {EXPERIMENTS.length} projects</p>
            <h1 className="lab-ti">Creative<br/><em>Lab.</em></h1>
          </div>
          <p className="lab-desc">A space for experiments at the intersection of design and technology — generative art, WebGL shaders, and creative code.</p>
        </div>

        <div className="lab-grid">
          {EXPERIMENTS.map((e, i) => (
            <div
              className="lab-c"
              key={e.n}
              ref={el => refs.current[i] = el}
              style={{ opacity:0, transform:'translateY(22px)', transition:`opacity .6s ${i*0.055}s, transform .6s ${i*0.055}s, background .3s` }}
            >
              <div className="lab-c-bgn">{e.n}</div>
              <div className="lab-c-arr">→</div>
              <div className="lab-c-tag">{e.tag}</div>
              <div className="lab-c-ti">{e.title}</div>
              <div className="lab-c-desc">{e.desc}</div>
            </div>
          ))}
        </div>

        <div className="lab-foot">
          <span>Nguyen D. Thang · Lab</span>
          <span>{EXPERIMENTS.length} experiments</span>
        </div>
      </main>
      <Footer/>
    </>
  );
}
