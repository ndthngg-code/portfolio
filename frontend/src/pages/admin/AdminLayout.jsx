import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';

const S = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
/* FORCE normal cursor on ALL admin elements */
.aw,.aw *{cursor:auto!important}
:root{--bg:#06060f;--bg2:rgba(255,255,255,.04);--bdr:rgba(255,255,255,.08);--bdrh:rgba(255,255,255,.16);--txt:#ede8ff;--mut:rgba(237,232,255,.42);--acc:#f4f2ee;--sw:240px;font-family:'Inter',sans-serif}
.aw{display:flex;min-height:100vh;background:var(--bg);color:var(--txt)}
.as{width:var(--sw);flex-shrink:0;background:rgba(255,255,255,.025);border-right:1px solid var(--bdr);display:flex;flex-direction:column;position:fixed;top:0;bottom:0;left:0;z-index:100;overflow-y:auto}
.ah{padding:1.8rem 1.5rem 1.5rem;border-bottom:1px solid var(--bdr)}
.al{font-family:'Instrument Serif',serif;font-style:italic;font-size:18px;color:var(--txt)}
.ar{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.26em;color:var(--acc);margin-top:2px}
.ap{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.18em;color:rgba(244,242,238,.4);margin-top:3px}
.an{flex:1;padding:1.5rem 0}
.as-sec{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.25em;color:rgba(237,232,255,.2);padding:.5rem 1.5rem;margin-bottom:.3rem;text-transform:uppercase}
.sl{display:flex;align-items:center;gap:10px;padding:.75rem 1.5rem;text-decoration:none;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.1em;color:var(--mut);transition:all .2s;border-left:2px solid transparent}
.sl:hover{color:var(--txt);background:rgba(255,255,255,.03);border-left-color:rgba(244,242,238,.3)}
.sl.active{color:var(--acc);background:rgba(244,242,238,.07);border-left-color:var(--acc)}
.si{font-size:13px;width:16px;text-align:center;flex-shrink:0}
.bdg{background:rgba(239,68,68,.2);color:rgba(239,68,68,.9);font-size:8px;padding:2px 6px;border-radius:2px;margin-left:auto;font-family:'JetBrains Mono',monospace}
.af{padding:1.2rem 1.5rem;border-top:1px solid var(--bdr)}
.au{font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--mut);margin-bottom:.8rem}
.vs{display:block;padding:7px;text-align:center;background:rgba(244,242,238,.08);border:1px solid rgba(244,242,238,.2);color:var(--acc);font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.12em;text-decoration:none;transition:all .2s;margin-bottom:.6rem}
.vs:hover{background:rgba(244,242,238,.15)}
.lb2{width:100%;padding:8px;background:none;border:1px solid var(--bdr);color:var(--mut);font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.14em;transition:all .2s}
.lb2:hover{border-color:rgba(239,68,68,.4);color:rgba(239,68,68,.8)}
.am{flex:1;margin-left:var(--sw);min-height:100vh;display:flex;flex-direction:column}
.atb{padding:1.2rem 2rem;border-bottom:1px solid var(--bdr);display:flex;justify-content:space-between;align-items:center;background:rgba(6,6,15,.88);backdrop-filter:blur(12px);position:sticky;top:0;z-index:50}
.att{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.18em;color:var(--mut);text-transform:uppercase}
.atz{font-family:'JetBrains Mono',monospace;font-size:9px;color:rgba(237,232,255,.2)}
.ac{flex:1;padding:2.5rem 2rem}
.ls{display:flex;align-items:center;justify-content:center;min-height:100vh;background:var(--bg);font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(237,232,255,.4);letter-spacing:.15em}
`;

const NAV = [
  { to: '/admin',          label: 'Dashboard', icon: '◈', end: true },
  { to: '/admin/projects', label: 'Dự án',     icon: '▣' },
  { to: '/admin/messages', label: 'Messages',  icon: '◉', badge: true },
  { to: '/admin/pages',    label: 'Page Builder', icon: '⊞' },
  { to: '/admin/site',     label: 'Site Content', icon: '✦' },
  { to: '/admin/settings', label: 'Settings',   icon: '⚙' },
];

export default function AdminLayout() {
  const nav  = useNavigate();
  const loc  = useLocation();
  const [ready,  setReady]  = useState(false);
  const [unread, setUnread] = useState(0);
  const [time,   setTime]   = useState('');
  const user = localStorage.getItem('admin_user') || 'admin';

  const tok = () => localStorage.getItem('admin_token');
  const authFetch = (url, opts = {}) => {
    const isFormData = opts.body instanceof FormData;
    return fetch(url, {
      ...opts,
      headers: {
        Authorization: `Bearer ${tok()}`,
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(opts.headers || {}),
      },
    });
  };

  const logout = () => {
    localStorage.removeItem('admin_token'); localStorage.removeItem('admin_user');
    nav('/admin/login', { replace: true });
  };

  useEffect(() => {
    const t = localStorage.getItem('admin_token');
    if (!t) { nav('/admin/login', { replace: true }); return; }
    fetch('/api/admin/verify', { method: 'POST', headers: { Authorization: `Bearer ${t}` } })
      .then(r => r.json())
      .then(d => {
        if (!d.success) { logout(); return; }
        setReady(true);
        authFetch('/api/admin/stats').then(r => r.json()).then(s => {
          if (s.success) setUnread(s.data.unreadMessages || 0);
        }).catch(() => {});
      })
      .catch(logout);
  }, []); // eslint-disable-line

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleString('vi-VN'));
    tick(); const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const title = loc.pathname === '/admin' ? 'Dashboard'
    : loc.pathname.startsWith('/admin/projects') ? 'Projects'
    : loc.pathname.startsWith('/admin/messages') ? 'Messages'
    : loc.pathname.startsWith('/admin/settings') ? 'Settings'
    : loc.pathname.startsWith('/admin/site') ? 'Site Content'
    : loc.pathname.startsWith('/admin/pages') ? 'Page Builder' : 'Admin';

  if (!ready) return <><style>{S}</style><div className="ls">Loading...</div></>;

  return (
    <><style>{S}</style>
      <div className="aw">
        <aside className="as">
          <div className="ah">
            <div className="al">Thắng Nguyễn</div>
            <div className="ar">Creative Designer</div>
            <div className="ap">Admin Panel</div>
          </div>
          <nav className="an">
            <div className="as-sec">Menu</div>
            {NAV.map(item => (
              <NavLink key={item.to} to={item.to} end={item.end}
                className={({ isActive }) => `sl${isActive ? ' active' : ''}`}>
                <span className="si">{item.icon}</span>
                {item.label}
                {item.badge && unread > 0 && <span className="bdg">{unread}</span>}
              </NavLink>
            ))}
          </nav>
          <div className="af">
            <a href="/" target="_blank" rel="noopener" className="vs">↗ View portfolio</a>
            <div className="au">Logged in as: {user}</div>
            <button className="lb2" onClick={logout}>Sign Out</button>
          </div>
        </aside>
        <main className="am">
          <div className="atb">
            <span className="att">{title}</span>
            <span className="atz">{time}</span>
          </div>
          <div className="ac">
            <Outlet context={{ authFetch, setUnread }} />
          </div>
        </main>
      </div>
    </>
  );
}
