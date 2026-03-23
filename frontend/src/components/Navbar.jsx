import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

const css = `
.nav{position:fixed;top:0;left:0;right:0;z-index:500;display:flex;justify-content:space-between;align-items:center;padding:1.4rem 3.5rem;transition:all .4s;background:linear-gradient(to bottom,rgba(8,8,8,.9) 0%,rgba(8,8,8,.5) 65%,transparent 100%)}
.nav.scrolled{background:rgba(8,8,8,.96);backdrop-filter:blur(24px);border-bottom:1px solid rgba(244,242,238,.07)}
.nav-logo{display:flex;flex-direction:column;line-height:1;cursor:none}
.nav-logo-n{font-family:'Syne',sans-serif;font-size:16px;font-weight:800;color:#f4f2ee;letter-spacing:-.015em}
.nav-logo-s{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.28em;color:rgba(244,242,238,.3);margin-top:3px;text-transform:uppercase}
.nav-links{display:flex;list-style:none;gap:0;align-items:center}
.nav-links a{font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:.12em;color:rgba(244,242,238,.42);text-decoration:none;padding:8px 16px;transition:color .2s;position:relative;text-transform:uppercase}
.nav-links a::after{content:'';position:absolute;bottom:4px;left:16px;width:calc(100% - 32px);height:1px;background:#f4f2ee;transform:scaleX(0);transition:transform .25s;transform-origin:left}
.nav-links a:hover,.nav-links a.active{color:#f4f2ee}
.nav-links a:hover::after,.nav-links a.active::after{transform:scaleX(1)}
.nav-avail{display:flex;align-items:center;gap:.5rem;font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.18em;color:rgba(244,242,238,.28);text-transform:uppercase}
.nav-avail-dot{width:5px;height:5px;background:#f4f2ee;border-radius:50%;animation:blink 2.5s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.1}}

/* Hamburger */
.nav-hbg{display:none;flex-direction:column;gap:6px;border:none;background:none;cursor:none;padding:4px;z-index:601}
.nav-hbg span{display:block;height:1px;background:#f4f2ee;transition:all .35s}
.nav-hbg span:nth-child(1){width:24px}
.nav-hbg span:nth-child(2){width:16px}

/* Mobile fullscreen */
.nav-mob{position:fixed;inset:0;z-index:600;background:#080808;display:none;flex-direction:column;align-items:flex-start;justify-content:center;padding:3rem 3rem 3rem}
.nav-mob.open{display:flex}
.nav-mob-close{position:absolute;top:1.5rem;right:1.5rem;width:44px;height:44px;border:1px solid rgba(244,242,238,.12);background:none;cursor:pointer;font-size:20px;color:rgba(244,242,238,.5);display:flex;align-items:center;justify-content:center;transition:all .2s}
.nav-mob-close:hover{border-color:rgba(244,242,238,.5);color:#f4f2ee}
.nav-mob-link{font-family:'Syne',sans-serif;font-size:clamp(2.4rem,9vw,4.5rem);font-weight:800;color:#f4f2ee;letter-spacing:-.035em;line-height:1.1;padding:.15rem 0;opacity:0;transform:translateY(20px);transition:opacity .4s,transform .4s,color .2s}
.nav-mob.open .nav-mob-link{opacity:1;transform:none}
.nav-mob.open .nav-mob-link:nth-child(2){transition-delay:.04s}
.nav-mob.open .nav-mob-link:nth-child(3){transition-delay:.08s}
.nav-mob.open .nav-mob-link:nth-child(4){transition-delay:.12s}
.nav-mob.open .nav-mob-link:nth-child(5){transition-delay:.16s}
.nav-mob.open .nav-mob-link:nth-child(6){transition-delay:.20s}
.nav-mob-link:hover{color:rgba(244,242,238,.35)}
.nav-mob-foot{position:absolute;bottom:2.5rem;left:3rem;right:3rem;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1rem}
.nav-mob-social{display:flex;gap:1.5rem;flex-wrap:wrap}
.nav-mob-social a{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.14em;color:rgba(244,242,238,.3);text-transform:uppercase;transition:color .2s}
.nav-mob-social a:hover{color:#f4f2ee}
@media(max-width:1024px){.nav{padding:1.2rem 2rem}}
@media(max-width:900px){.nav-links,.nav-avail{display:none}.nav-hbg{display:flex}.nav{padding:1.2rem 1.5rem}}
@media(max-width:480px){.nav{padding:1rem 1.25rem}}
`;

const LINKS = [
  { to:'/',           label:'Home',    exact:true },
  { to:'/works',      label:'Works' },
  { to:'/playground', label:'Lab' },
  { to:'/#about',     label:'About' },
  { to:'/#contact',   label:'Contact' },
];

export default function Navbar({ social = {} }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const { pathname } = useLocation();
  const navigate     = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);

  const go = (to) => {
    setOpen(false);
    if (!to.startsWith('/#')) return;
    const id = to.slice(2);
    if (pathname === '/') document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    else { navigate('/'); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 400); }
  };

  const socLinks = [
    social.telegram  && { href: social.telegram,  l: 'Telegram' },
    social.behance   && { href: social.behance,   l: 'Behance'  },
    social.instagram && { href: social.instagram, l: 'Instagram' },
    social.email     && { href: `mailto:${social.email}`, l: 'Email' },
  ].filter(Boolean);

  return (
    <>
      <style>{css}</style>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <Link to="/" className="nav-logo">
          <span className="nav-logo-n">Nguyen D. Thang</span>
          <span className="nav-logo-s">VFX · Creative Designer</span>
        </Link>

        <ul className="nav-links">
          {LINKS.map(({ to, label, exact }) => (
            <li key={to}>
              {to.startsWith('/#')
                ? <a href={to} onClick={e => { e.preventDefault(); go(to); }}>{label}</a>
                : <NavLink to={to} end={exact} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>
              }
            </li>
          ))}
        </ul>

        <div className="nav-avail">
          <span className="nav-avail-dot" />Available for hire
        </div>

        <button className="nav-hbg" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
          <span style={{ transform: open ? 'rotate(45deg) translate(5px, 5px)' : '' }} />
          <span style={{ width: open ? 24 : 16, transform: open ? 'rotate(-45deg) translate(0, -1px)' : '' }} />
        </button>
      </nav>

      <div className={`nav-mob${open ? ' open' : ''}`}>
        <button className="nav-mob-close" onClick={() => setOpen(false)}>×</button>

        {LINKS.map(({ to, label, exact }) => (
          to.startsWith('/#')
            ? <a key={to} className="nav-mob-link" href={to} onClick={e => { e.preventDefault(); go(to); }}>{label}</a>
            : <Link key={to} className="nav-mob-link" to={to}>{label}</Link>
        ))}

        <div className="nav-mob-foot">
          <div className="nav-mob-social">
            {socLinks.map(l => (
              <a key={l.l} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener">{l.l}</a>
            ))}
          </div>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: 'rgba(244,242,238,.18)', letterSpacing: '.16em' }}>© 2025</span>
        </div>
      </div>
    </>
  );
}
