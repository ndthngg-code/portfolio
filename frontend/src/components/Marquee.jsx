import React from 'react';
const S=`
.mq{overflow:hidden;padding:1rem 0;border-top:1px solid rgba(244,242,238,.07);border-bottom:1px solid rgba(244,242,238,.07);background:rgba(244,242,238,.02);position:relative}
.mq::before,.mq::after{content:'';position:absolute;top:0;bottom:0;width:100px;z-index:2;pointer-events:none}
.mq::before{left:0;background:linear-gradient(to right,#080808,transparent)}
.mq::after{right:0;background:linear-gradient(to left,#080808,transparent)}
.mq-t{display:flex;animation:mq 30s linear infinite;width:max-content}
.mq-t:hover{animation-play-state:paused}
.mq-i{display:flex;align-items:center;gap:1rem;padding:0 2rem;white-space:nowrap;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.2em;color:rgba(244,242,238,.3);text-transform:uppercase}
.mq-i span{color:rgba(244,242,238,.15);font-size:8px}
@keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
`;
const SKILLS=['Cinema 4D','After Effects','Blender','Houdini VFX','Redshift Render','Octane','UI/UX Design','Brand Identity','Motion Design','WebGL','Figma','Premiere Pro','Cinema 4D','After Effects','Blender','Houdini VFX','Redshift Render','Octane','UI/UX Design','Brand Identity','Motion Design','WebGL','Figma','Premiere Pro'];
export default function Marquee(){
  return(<><style>{S}</style><div className="mq"><div className="mq-t">{SKILLS.map((s,i)=><div className="mq-i" key={i}>{s}<span>✦</span></div>)}</div></div></>);
}
