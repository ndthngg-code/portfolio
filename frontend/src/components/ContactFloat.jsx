import React, { useState } from 'react';
import { useSite } from '../context/SiteContext.jsx';

const S = `
.cf-w{position:fixed;bottom:2rem;right:2rem;z-index:500;display:flex;flex-direction:column;align-items:flex-end;gap:.4rem}
.cf-tog{width:46px;height:46px;border-radius:50%;background:#f4f2ee;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 1px rgba(244,242,238,.15),0 8px 32px rgba(0,0,0,.6);transition:all .3s;font-family:'Syne',sans-serif;font-size:18px;font-weight:800;color:#080808;line-height:1}
.cf-tog:hover{background:#e8e6e2;transform:scale(1.06)}
.cf-panel{display:flex;flex-direction:column;gap:2px;background:#0d0d0d;border:1px solid rgba(244,242,238,.1);backdrop-filter:blur(20px);padding:.6rem;transform-origin:bottom right;transform:scale(.85) translateY(8px);opacity:0;pointer-events:none;transition:all .22s cubic-bezier(.25,.46,.45,.94);min-width:180px}
.cf-panel.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all}
.cf-grp-lbl{font-family:'JetBrains Mono',monospace;font-size:7px;letter-spacing:.26em;color:rgba(244,242,238,.2);text-transform:uppercase;padding:.4rem .8rem .2rem}
.cf-link{display:flex;align-items:center;justify-content:space-between;padding:.55rem .8rem;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.1em;color:rgba(244,242,238,.55);text-decoration:none;white-space:nowrap;transition:all .2s;border-left:2px solid transparent;text-transform:uppercase}
.cf-link:hover{color:#f4f2ee;border-left-color:#f4f2ee;background:rgba(244,242,238,.04)}
.cf-link-arr{opacity:.3;transition:opacity .2s}
.cf-link:hover .cf-link-arr{opacity:.7}
.cf-div{height:1px;background:rgba(244,242,238,.07);margin:.3rem .8rem}
@media(max-width:600px){.cf-w{bottom:1.2rem;right:1.2rem}}
`;

export default function ContactFloat() {
  const [open, setOpen] = useState(false);
  const { settings } = useSite();
  const s = settings?.social || {};

  const groups = [
    {
      label: 'Message',
      links: [
        s.telegram  && { href:s.telegram,  label:'Telegram' },
        s.zalo      && { href:s.zalo,       label:'Zalo' },
        s.whatsapp  && { href:s.whatsapp,   label:'WhatsApp' },
      ].filter(Boolean),
    },
    {
      label: 'Direct',
      links: [
        s.email && { href:`mailto:${s.email}`, label:'Email' },
        s.phone && { href:`tel:${s.phone?.replace(/\s/g,'')}`, label:s.phone },
      ].filter(Boolean),
    },
    {
      label: 'Portfolio',
      links: [
        s.behance   && { href:s.behance,   label:'Behance' },
        s.instagram && { href:s.instagram, label:'Instagram' },
      ].filter(Boolean),
    },
  ].filter(g => g.links.length > 0);

  if (!groups.some(g => g.links.length)) return null;

  return (
    <>
      <style>{S}</style>
      <div className="cf-w">
        <div className={`cf-panel${open?' open':''}`}>
          {groups.map((g, gi) => (
            <React.Fragment key={g.label}>
              {gi > 0 && <div className="cf-div"/>}
              <div className="cf-grp-lbl">{g.label}</div>
              {g.links.map(l => (
                <a key={l.label} href={l.href} target={l.href.startsWith('http')?'_blank':undefined} rel="noopener" className="cf-link">
                  {l.label}<span className="cf-link-arr">→</span>
                </a>
              ))}
            </React.Fragment>
          ))}
        </div>
        <button className="cf-tog" onClick={() => setOpen(o => !o)} title="Contact">
          {open ? '×' : '+'}
        </button>
      </div>
    </>
  );
}
