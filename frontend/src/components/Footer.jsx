import React from 'react';
import { useSite } from '../context/SiteContext.jsx';

const S = `
.footer{padding:4rem 3.5rem 2.5rem;border-top:1px solid rgba(244,242,238,.07);background:#080808}
.ft-top{display:grid;grid-template-columns:1.2fr 1fr 1fr 1fr;gap:3rem;margin-bottom:3rem;padding-bottom:3rem;border-bottom:1px solid rgba(244,242,238,.06)}
.ft-brand-name{font-family:'Syne',sans-serif;font-size:18px;font-weight:800;color:#f4f2ee;letter-spacing:-.02em;margin-bottom:4px}
.ft-brand-role{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.26em;color:rgba(244,242,238,.25);text-transform:uppercase;margin-bottom:.8rem}
.ft-brand-tagline{font-family:'Syne',sans-serif;font-size:12px;color:rgba(244,242,238,.28);line-height:1.6;max-width:200px}
.ft-col-title{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.24em;color:rgba(244,242,238,.22);text-transform:uppercase;margin-bottom:1.2rem}
.ft-col-links{display:flex;flex-direction:column;gap:.5rem}
.ft-link{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.1em;color:rgba(244,242,238,.35);text-decoration:none;text-transform:uppercase;transition:color .2s;display:flex;align-items:center;gap:.6rem}
.ft-link::before{content:'';width:10px;height:1px;background:currentColor;opacity:.4;transition:width .2s}
.ft-link:hover{color:#f4f2ee}
.ft-link:hover::before{width:18px}
.ft-bottom{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem}
.ft-copy{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.12em;color:rgba(244,242,238,.2)}
.ft-note{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.12em;color:rgba(244,242,238,.18)}
@media(max-width:900px){.ft-top{grid-template-columns:1fr 1fr;gap:2rem}.footer{padding:3rem 2rem 2rem}}
@media(max-width:600px){.ft-top{grid-template-columns:1fr}.footer{padding:3rem 1.25rem 2rem}}
`;

export default function Footer() {
  const { settings } = useSite();
  const s = settings?.social || {};
  const m = settings?.meta   || {};

  const messaging = [
    s.telegram  && { href:s.telegram,  label:'Telegram' },
    s.zalo      && { href:s.zalo,      label:'Zalo' },
    s.whatsapp  && { href:s.whatsapp,  label:'WhatsApp' },
  ].filter(Boolean);

  const portfolio = [
    s.behance   && { href:s.behance,   label:'Behance' },
    s.instagram && { href:s.instagram, label:'Instagram' },
    s.linkedin  && { href:s.linkedin,  label:'LinkedIn' },
  ].filter(Boolean);

  const direct = [
    s.email && { href:`mailto:${s.email}`, label:s.email },
    s.phone && { href:`tel:${s.phone?.replace(/\s/g,'')}`, label:s.phone },
  ].filter(Boolean);

  return (
    <>
      <style>{S}</style>
      <footer className="footer">
        <div className="ft-top">
          <div>
            <div className="ft-brand-name">Nguyen D. Thang</div>
            <div className="ft-brand-role">VFX · Creative Designer</div>
            <div className="ft-brand-tagline">{m.footerNote || 'Available for freelance · HCMC, Vietnam'}</div>
          </div>
          <div>
            <div className="ft-col-title">Navigate</div>
            <div className="ft-col-links">
              {[['/', 'Home'], ['/works', 'Works'], ['/playground', 'Lab'], ['/#about', 'About']].map(([h, l]) => (
                <a key={h} href={h} className="ft-link">{l}</a>
              ))}
            </div>
          </div>
          {(messaging.length > 0 || direct.length > 0) && (
            <div>
              <div className="ft-col-title">Contact</div>
              <div className="ft-col-links">
                {[...messaging, ...direct].map(l => (
                  <a key={l.label} href={l.href} target={l.href.startsWith('http')?'_blank':undefined} rel="noopener" className="ft-link">{l.label}</a>
                ))}
              </div>
            </div>
          )}
          {portfolio.length > 0 && (
            <div>
              <div className="ft-col-title">Portfolio</div>
              <div className="ft-col-links">
                {portfolio.map(l => (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener" className="ft-link">{l.label}</a>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="ft-bottom">
          <span className="ft-copy">© {new Date().getFullYear()} Nguyen D. Thang. All rights reserved.</span>
          <span className="ft-note">HCMC, Vietnam</span>
        </div>
      </footer>
    </>
  );
}
