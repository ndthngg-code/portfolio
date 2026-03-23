import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const S=`
.am2{font-family:'Inter',sans-serif}
.amh{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;flex-wrap:wrap;gap:1rem}
.amh h1{font-family:'Instrument Serif',serif;font-size:2rem;color:#f0ecff}
.mf{display:flex;gap:.5rem}
.mfb{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.12em;padding:6px 14px;
     border:1px solid rgba(255,255,255,.08);color:rgba(240,236,255,.5);background:none;cursor:auto;transition:all .2s}
.mfb.a,.mfb:hover{border-color:#f4f2ee;color:#f4f2ee;background:rgba(244,242,238,.07)}
.mss{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,.06);margin-bottom:1.5rem}
.msc{background:#05050c;padding:1.2rem}
.msn{font-family:'Instrument Serif',serif;font-size:2.2rem;color:#f0ecff;line-height:1}
.msl{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.2em;color:rgba(240,236,255,.35);
     margin-top:.3rem;text-transform:uppercase}
.mlist{display:flex;flex-direction:column;gap:1px;background:rgba(255,255,255,.06)}
.mc{background:#05050c;padding:1.2rem 1.5rem;cursor:auto;transition:background .15s;
    border-left:3px solid transparent}
.mc.u{border-left-color:#f4f2ee;background:rgba(244,242,238,.025)}
.mc.sel{background:rgba(255,255,255,.04)}
.mc:hover{background:rgba(255,255,255,.03)}
.mch{display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;margin-bottom:.4rem}
.mcn{font-size:14px;font-weight:500;color:#f0ecff;display:flex;align-items:center;gap:6px}
.dot{width:5px;height:5px;background:#f4f2ee;border-radius:50%;flex-shrink:0}
.mce{font-family:'JetBrains Mono',monospace;font-size:9px;color:rgba(240,236,255,.4)}
.mcd{font-family:'JetBrains Mono',monospace;font-size:9px;color:rgba(240,236,255,.22);flex-shrink:0}
.mcp{font-size:12px;color:rgba(240,236,255,.45);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mcm{display:flex;gap:.4rem;margin-top:.5rem;flex-wrap:wrap}
.mct{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.1em;padding:2px 7px;
     border:1px solid rgba(255,255,255,.08);color:rgba(240,236,255,.35)}
.empty{padding:4rem;text-align:center;font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(240,236,255,.3)}
/* Detail panel */
.dp{position:fixed;top:0;right:0;bottom:0;width:420px;background:rgba(5,5,12,.98);
    border-left:1px solid rgba(255,255,255,.08);backdrop-filter:blur(20px);
    z-index:200;padding:2rem;overflow-y:auto;display:flex;flex-direction:column;gap:1.5rem;
    transform:translateX(100%);transition:transform .3s cubic-bezier(.25,.46,.45,.94)}
.dp.open{transform:translateX(0)}
.dcl{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.14em;padding:6px 14px;
     border:1px solid rgba(255,255,255,.08);color:rgba(240,236,255,.5);background:none;cursor:auto;
     transition:all .2s;align-self:flex-start}
.dcl:hover{border-color:rgba(255,255,255,.18);color:#f0ecff}
.dsn{font-family:'Instrument Serif',serif;font-size:1.6rem;color:#f0ecff}
.dse{font-family:'JetBrains Mono',monospace;font-size:10px;color:#f4f2ee;margin-top:2px}
.di{display:flex;flex-direction:column;gap:.5rem;padding:1rem;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08)}
.dir{display:flex;gap:.8rem}
.dil{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.2em;color:rgba(240,236,255,.3);
     width:70px;flex-shrink:0;padding-top:1px;text-transform:uppercase}
.div2{font-size:12px;color:rgba(240,236,255,.6);line-height:1.5}
.dm{font-size:14px;line-height:1.85;color:rgba(240,236,255,.8);white-space:pre-wrap}
.da{display:flex;gap:.6rem;flex-wrap:wrap}
.dab{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.12em;padding:8px 16px;
     border:1px solid rgba(255,255,255,.08);color:rgba(240,236,255,.5);background:none;
     cursor:auto;text-decoration:none;display:inline-flex;align-items:center;gap:5px;transition:all .2s}
.dab:hover{border-color:#f4f2ee;color:#f4f2ee}
.dab.del:hover{border-color:rgba(239,68,68,.4);color:rgba(239,68,68,.8)}
`;

export default function AdminMessages() {
  const { authFetch, setUnread } = useOutletContext();
  const [msgs, setMsgs]   = useState([]);
  const [sel,  setSel]    = useState(null);
  const [filt, setFilt]   = useState('all');
  const [load, setLoad]   = useState(true);

  const fetch2 = () => {
    authFetch('/api/admin/messages').then(r=>r.json()).then(d=>{
      if(d.success){setMsgs(d.data);setLoad(false);}
    });
  };
  useEffect(fetch2, []);

  const open = async m => {
    setSel(m);
    if (!m.read) {
      await authFetch(`/api/admin/messages/${m.id}/read`, { method:'PATCH' });
      setMsgs(p=>p.map(x=>x.id===m.id?{...x,read:true}:x));
      setUnread(p=>Math.max(0,p-1));
    }
  };

  const del = async id => {
    await authFetch(`/api/admin/messages/${id}`,{method:'DELETE'});
    setSel(null); fetch2();
  };

  const list = filt==='all' ? msgs : filt==='unread' ? msgs.filter(m=>!m.read) : msgs.filter(m=>m.read);
  const unread = msgs.filter(m=>!m.read).length;
  const fmt = d => new Date(d).toLocaleDateString('vi-VN');
  const fmtFull = d => new Date(d).toLocaleString('vi-VN');

  return (
    <>
      <style>{S}</style>
      <div className="am2">
        <div className="amh">
          <h1>Messages</h1>
          <div className="mf">
            {[['all',`Tất cả (${msgs.length})`],['unread',`Chưa đọc (${unread})`],['read','Đã đọc']].map(([v,l])=>(
              <button key={v} className={`mfb${filt===v?' a':''}`} onClick={()=>setFilt(v)}>{l}</button>
            ))}
          </div>
        </div>

        <div className="mss">
          <div className="msc"><div className="msn">{msgs.length}</div><div className="msl">Tổng tin nhắn</div></div>
          <div className="msc"><div className="msn">{unread}</div><div className="msl">Chưa đọc</div></div>
          <div className="msc"><div className="msn">{msgs.length-unread}</div><div className="msl">Đã đọc</div></div>
        </div>

        {load ? <div className="empty">Loading...</div>
        : list.length===0 ? <div className="empty">Không có tin nhắn nào.</div>
        : (
          <div className="mlist">
            {list.map(m=>(
              <div key={m.id} className={`mc${!m.read?' u':''}${sel?.id===m.id?' sel':''}`} onClick={()=>open(m)}>
                <div className="mch">
                  <div>
                    <div className="mcn">{!m.read&&<span className="dot"/>}{m.name}</div>
                    <div className="mce">{m.email}</div>
                  </div>
                  <div className="mcd">{fmt(m.createdAt)}</div>
                </div>
                <div className="mcp">{m.message}</div>
                {(m.projectType||m.budget)&&(
                  <div className="mcm">
                    {m.projectType&&<span className="mct">{m.projectType}</span>}
                    {m.budget&&<span className="mct">{m.budget}</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail slide panel */}
      <div className={`dp${sel?' open':''}`}>
        {sel&&(
          <>
            <button className="dcl" onClick={()=>setSel(null)}>← Đóng</button>
            <div>
              <div className="dsn">{sel.name}</div>
              <div className="dse">{sel.email}</div>
            </div>
            <div className="di">
              {[['Ngày gửi',fmtFull(sel.createdAt)],['Loại dự án',sel.projectType||'—'],['Ngân sách',sel.budget||'—']].map(([l,v])=>(
                <div className="dir" key={l}>
                  <span className="dil">{l}</span>
                  <span className="div2">{v}</span>
                </div>
              ))}
            </div>
            <div className="dm">{sel.message}</div>
            <div className="da">
              <a href={`mailto:${sel.email}?subject=Re: Portfolio Inquiry`} className="dab">✉ Trả lời</a>
              <button className="dab del" onClick={()=>del(sel.id)}>✕ Xóa</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
