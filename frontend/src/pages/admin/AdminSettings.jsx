import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const S = `
.set{font-family:'Inter',sans-serif;max-width:600px}
.set h1{font-family:'Instrument Serif',serif;font-style:italic;font-size:2rem;color:#ede8ff;margin-bottom:2rem}
.sc{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);padding:1.5rem;margin-bottom:1.5rem}
.sct{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.24em;color:rgba(244,242,238,.6);text-transform:uppercase;margin-bottom:1.2rem}
.fg{display:flex;flex-direction:column;gap:.4rem;margin-bottom:1rem}
.fg:last-of-type{margin-bottom:0}
.fl{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.22em;color:rgba(237,232,255,.38);text-transform:uppercase}
.fi{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);color:#ede8ff;padding:11px 13px;font-family:'Inter',sans-serif;font-size:13px;outline:none;transition:border-color .2s;width:100%}
.fi:focus{border-color:rgba(244,242,238,.5);background:rgba(244,242,238,.03)}
.fi::placeholder{color:rgba(237,232,255,.18)}
.sbtn{padding:11px 24px;background:#f4f2ee;border:none;color:#06060f;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.15em;text-transform:uppercase;transition:background .2s;margin-top:.5rem}
.sbtn:hover:not(:disabled){background:#ede8ff}
.sbtn:disabled{opacity:.5}
.ok{padding:.7rem 1rem;background:rgba(52,211,153,.08);border:1px solid rgba(52,211,153,.25);font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(52,211,153,.9);margin-top:.8rem}
.err{padding:.7rem 1rem;background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.25);font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(239,68,68,.9);margin-top:.8rem}
.info-row{display:flex;justify-content:space-between;align-items:center;padding:.6rem 0;border-bottom:1px solid rgba(255,255,255,.05)}
.info-row:last-child{border-bottom:none}
.info-label{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.14em;color:rgba(237,232,255,.38);text-transform:uppercase}
.info-val{font-size:13px;color:#ede8ff}
`;

export default function AdminSettings() {
  const { authFetch } = useOutletContext();
  const [pw, setPw]       = useState({ current: '', next: '', confirm: '' });
  const [pwMsg, setPwMsg] = useState({ type: '', text: '' });
  const [pwLoading, setPwLoading] = useState(false);

  const changePw = async e => {
    e.preventDefault();
    if (pw.next.length < 6) { setPwMsg({ type:'err', text:'Password mới phải ít nhất 6 ký tự' }); return; }
    if (pw.next !== pw.confirm) { setPwMsg({ type:'err', text:'Password xác nhận không khớp' }); return; }
    setPwLoading(true); setPwMsg({ type:'', text:'' });
    const r = await authFetch('/api/admin/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword: pw.current, newPassword: pw.next }),
    });
    const d = await r.json();
    if (d.success) {
      setPwMsg({ type:'ok', text: d.message });
      setPw({ current: '', next: '', confirm: '' });
    } else {
      setPwMsg({ type:'err', text: d.error });
    }
    setPwLoading(false);
  };

  const INFO = [
    { label: 'Version', val: 'Portfolio v4.0' },
    { label: 'Backend', val: 'Express + Node.js' },
    { label: 'Frontend', val: 'React + Vite' },
    { label: 'Database', val: 'JSON file store' },
    { label: 'Upload', val: '/uploads/ (local)' },
  ];

  return (
    <><style>{S}</style>
      <div className="set">
        <h1>Settings</h1>

        {/* Change password */}
        <div className="sc">
          <p className="sct">Đổi mật khẩu admin</p>
          <form onSubmit={changePw} noValidate>
            <div className="fg">
              <label className="fl">Password hiện tại</label>
              <input className="fi" type="password" placeholder="••••••••"
                value={pw.current} onChange={e => setPw(p => ({ ...p, current: e.target.value }))} required/>
            </div>
            <div className="fg">
              <label className="fl">Password mới (ít nhất 6 ký tự)</label>
              <input className="fi" type="password" placeholder="••••••••"
                value={pw.next} onChange={e => setPw(p => ({ ...p, next: e.target.value }))} required/>
            </div>
            <div className="fg">
              <label className="fl">Xác nhận mật khẩu mới</label>
              <input className="fi" type="password" placeholder="••••••••"
                value={pw.confirm} onChange={e => setPw(p => ({ ...p, confirm: e.target.value }))} required/>
            </div>
            <button className="sbtn" type="submit" disabled={pwLoading}>{pwLoading ? 'Processing...' : 'Đổi mật khẩu →'}</button>
            {pwMsg.text && <div className={pwMsg.type === 'ok' ? 'ok' : 'err'}>{pwMsg.type === 'ok' ? '✓' : '⚠'} {pwMsg.text}</div>}
          </form>
          <p style={{ fontFamily:'JetBrains Mono,monospace', fontSize:9, color:'rgba(237,232,255,.25)', marginTop:'.8rem', lineHeight:1.6 }}>
            Lưu ý: Để lưu vĩnh viễn, cập nhật ADMIN_PASSWORD trong file backend/.env
          </p>
        </div>

        {/* System info */}
        <div className="sc">
          <p className="sct">Thông tin hệ thống</p>
          {INFO.map(({ label, val }) => (
            <div className="info-row" key={label}>
              <span className="info-label">{label}</span>
              <span className="info-val">{val}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
