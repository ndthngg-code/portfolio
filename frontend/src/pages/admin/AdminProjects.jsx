import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

const S=`
.ap{font-family:'Inter',sans-serif}
.aph{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;flex-wrap:wrap;gap:1rem}
.aph h1{font-family:'Instrument Serif',serif;font-size:2rem;color:#f0ecff}
.add{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.14em;padding:10px 20px;
     background:#f4f2ee;border:none;color:#05050c;text-decoration:none;transition:background .2s;cursor:auto}
.add:hover{background:#f0ecff}
.fbar{display:flex;gap:.5rem;margin-bottom:1.5rem;flex-wrap:wrap}
.fb{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.12em;padding:6px 14px;
    border:1px solid rgba(255,255,255,.08);color:rgba(240,236,255,.5);background:none;cursor:auto;transition:all .2s}
.fb.a,.fb:hover{border-color:#f4f2ee;color:#f4f2ee;background:rgba(244,242,238,.07)}
table{width:100%;border-collapse:collapse;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08)}
th{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.2em;color:rgba(240,236,255,.3);
   padding:.8rem 1rem;text-align:left;border-bottom:1px solid rgba(255,255,255,.08);text-transform:uppercase}
td{padding:.9rem 1rem;border-bottom:1px solid rgba(255,255,255,.04);vertical-align:middle;font-size:13px;color:#f0ecff}
tr:last-child td{border-bottom:none}
tr:hover td{background:rgba(255,255,255,.02)}
.th{width:56px;height:40px;flex-shrink:0}
.tc{display:flex;align-items:center;gap:.8rem}
.tn{font-weight:500;color:#f0ecff;font-size:13px}
.ts2{font-family:'JetBrains Mono',monospace;font-size:9px;color:rgba(240,236,255,.4);margin-top:1px}
.bx{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.1em;padding:3px 8px;border:1px solid rgba(255,255,255,.08);color:rgba(240,236,255,.4)}
.bx.l{border-color:rgba(52,211,153,.3);color:rgba(52,211,153,.9)}
.acts{display:flex;gap:.4rem}
.ab{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.1em;padding:5px 10px;
    border:1px solid rgba(255,255,255,.08);color:rgba(240,236,255,.4);background:none;cursor:auto;
    text-decoration:none;display:inline-block;transition:all .2s}
.ab:hover{border-color:#f4f2ee;color:#f4f2ee}
.ab.del:hover{border-color:rgba(239,68,68,.4);color:rgba(239,68,68,.8)}
.empty{padding:4rem;text-align:center;font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(240,236,255,.3)}
.ov{position:fixed;inset:0;background:rgba(5,5,12,.88);backdrop-filter:blur(12px);
    display:flex;align-items:center;justify-content:center;z-index:999}
.ob{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);padding:2rem;max-width:360px;width:90%}
.oh1{font-family:'Instrument Serif',serif;font-size:1.3rem;color:#f0ecff;margin-bottom:.5rem}
.oh2{font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(240,236,255,.5);margin-bottom:1.5rem;line-height:1.6}
.oa{display:flex;gap:.8rem}
.oc{flex:1;padding:10px;background:none;border:1px solid rgba(255,255,255,.08);color:rgba(240,236,255,.5);
    font-family:'JetBrains Mono',monospace;font-size:10px;cursor:auto}
.od{flex:1;padding:10px;background:rgba(239,68,68,.85);border:none;color:#fff;
    font-family:'JetBrains Mono',monospace;font-size:10px;cursor:auto}
`;

const CATS=[{id:'all',l:'Tất cả'},{id:'brand',l:'Brand'},{id:'ui',l:'UI/UX'},{id:'motion',l:'Motion'},{id:'3d',l:'3D'},{id:'print',l:'Print'},{id:'web',l:'Web'}];
const CAT_L={brand:'Brand',ui:'UI/UX',motion:'Motion','3d':'3D',print:'Print',web:'Web'};

export default function AdminProjects() {
  const { authFetch } = useOutletContext();
  const [projs, setProjs] = useState([]);
  const [filter, setFilter] = useState('all');
  const [del, setDel] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    authFetch('/api/admin/projects').then(r=>r.json()).then(d=>{
      if(d.success) setProjs(d.data);
      setLoading(false);
    });
  };
  useEffect(load, []);

  const toggle = async p => {
    await authFetch(`/api/admin/projects/${p.id}`, { method:'PUT', body: JSON.stringify({ published: !p.published }) });
    load();
  };

  const confirmDel = async () => {
    await authFetch(`/api/admin/projects/${del.id}`, { method:'DELETE' });
    setDel(null); load();
  };

  const list = filter==='all' ? projs : projs.filter(p=>p.category===filter);

  return (
    <>
      <style>{S}</style>
      <div className="ap">
        <div className="aph">
          <h1>Dự án</h1>
          <Link to="/admin/projects/new" className="add">+ Thêm mới</Link>
        </div>
        <div className="fbar">
          {CATS.map(c=>(
            <button key={c.id} className={`fb${filter===c.id?' a':''}`} onClick={()=>setFilter(c.id)}>
              {c.l} {c.id!=='all'&&`(${projs.filter(p=>p.category===c.id).length})`}
            </button>
          ))}
        </div>

        {loading ? <div className="empty">Loading...</div>
        : list.length===0 ? <div className="empty">No projects yet. <Link to="/admin/projects/new" style={{color:'#f4f2ee'}}>Thêm mới →</Link></div>
        : (
          <table>
            <thead>
              <tr><th>Dự án</th><th>Lĩnh vực</th><th>Năm</th><th>Trạng thái</th><th>Thao tác</th></tr>
            </thead>
            <tbody>
              {list.map(p=>(
                <tr key={p.id}>
                  <td>
                    <div className="tc">
                      <div className="th" style={{background:p.coverGradient}}/>
                      <div>
                        <div className="tn">{p.title}</div>
                        <div className="ts2">{p.subtitle}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="bx">{(CAT_L[p.category]||p.category).toUpperCase()}</span></td>
                  <td style={{fontFamily:'DM Mono,monospace',fontSize:11,color:'rgba(240,236,255,.5)'}}>{p.year}</td>
                  <td><span className={`bx${p.published!==false?' l':''}`}>{p.published!==false?'Live':'Draft'}</span></td>
                  <td>
                    <div className="acts">
                      <Link to={`/admin/projects/edit/${p.id}`} className="ab">Sửa</Link>
                      <button className="ab" onClick={()=>toggle(p)}>{p.published!==false?'Ẩn':'Hiện'}</button>
                      <a href={`/project/${p.slug}`} target="_blank" rel="noopener" className="ab">↗</a>
                      <button className="ab del" onClick={()=>setDel(p)}>Xóa</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {del && (
        <div className="ov">
          <div className="ob">
            <div className="oh1">Xóa dự án?</div>
            <div className="oh2">Bạn sắp xóa <strong style={{color:'#f0ecff'}}>{del.title}</strong>. Không thể hoàn tác.</div>
            <div className="oa">
              <button className="oc" onClick={()=>setDel(null)}>Hủy</button>
              <button className="od" onClick={confirmDel}>Xóa vĩnh viễn</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
