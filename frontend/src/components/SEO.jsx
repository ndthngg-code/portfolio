import { useEffect } from 'react';
export default function SEO({ title, description, image }) {
  useEffect(() => {
    const base = 'Nguyen D. Thang — Creative Designer';
    document.title = title ? `${title} · ${base}` : base;
    const m = (n,v) => { let el=document.querySelector(`meta[name="${n}"]`)||Object.assign(document.createElement('meta'),{name:n}); el.content=v; document.head.appendChild(el); };
    const og = (p,v) => { let el=document.querySelector(`meta[property="${p}"]`)||Object.assign(document.createElement('meta'),{}); el.setAttribute('property',p); el.content=v; document.head.appendChild(el); };
    const desc = description||'VFX & Creative Designer. Brand Identity · UI/UX · Motion · 3D. Ho Chi Minh City.';
    m('description',desc); og('og:title',document.title); og('og:description',desc); og('og:type','website');
    if(image){og('og:image',image);}
  },[title,description,image]);
  return null;
}
