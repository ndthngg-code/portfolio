import React, { createContext, useContext, useState, useEffect } from 'react';
const Ctx = createContext(null);
const DEF = {
  hero:{ eyebrow:'VFX · 3D · Creative Designer', name:'Nguyen D.', nameLine2:'Thang.', role:'Brand · UI/UX · Motion · 3D/VFX', tagline:'Visual architect turning concepts into unforgettable experiences through design, motion & digital craft.', ctaLabel:'View Works', stats:[{num:'6',label:'Years'},{num:'70',label:'Projects'},{num:'30',label:'Clients'}] },
  about:{ title:'I build digital', titleAccent:'worlds', body:'With 6+ years in digital creative, I specialize in VFX, 3D rendering, and brand design.', skills:['Cinema 4D','Houdini','Blender','After Effects','Redshift','WebGL','Figma','Premiere'], ctaLabel:"Let's collaborate →", experience:[{title:'Senior VFX Artist',company:'Studio Pixel · HCMC',year:'2022–Now'},{title:'Motion Designer',company:'The Pixel Lab',year:'2020–22'},{title:'Brand Designer',company:'Freelance',year:'2018–20'}] },
  contact:{ title:'Start a new', titleAccent:'project', subtitle:"Have an idea? Let's turn it into something memorable." },
  social:{ email:'hello@thangnguyen.vn', phone:'+84 909 123 456', telegram:'https://t.me/thangnguyen', zalo:'https://zalo.me/0909123456', whatsapp:'https://wa.me/84909123456', behance:'https://behance.net/thangnguyen', instagram:'https://instagram.com/thangnguyen', linkedin:'' },
  meta:{ siteTitle:'Nguyen D. Thang — Creative Designer', footerNote:'Available for freelance · HCMC, Vietnam' },
};
export function SiteProvider({ children }) {
  const [settings, setSettings] = useState(DEF);
  useEffect(() => {
    fetch('/api/settings').then(r=>r.json()).then(d=>{ if(d.success) setSettings(d.data); }).catch(()=>{});
  }, []);
  return <Ctx.Provider value={{ settings, setSettings }}>{children}</Ctx.Provider>;
}
export const useSite = () => useContext(Ctx);
