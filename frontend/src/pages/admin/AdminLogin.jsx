import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const tok = () => localStorage.getItem('admin_token');

export default function AdminLogin() {
  const nav = useNavigate();
  const [form, setForm]   = useState({ username:'admin', password:'' });
  const [err,  setErr]    = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const t = tok();
    if (!t) { setLoading(false); return; }
    fetch('/api/admin/verify', { headers:{ Authorization:`Bearer ${t}` } })
      .then(r => r.json())
      .then(d => { if (d.success) nav('/admin'); else { localStorage.removeItem('admin_token'); setLoading(false); } })
      .catch(() => setLoading(false));
  }, []);

  const submit = async e => {
    e.preventDefault();
    if (!form.username || !form.password) { setErr('Please fill in all fields.'); return; }
    setErr(''); setSubmitting(true);
    try {
      const r = await fetch('/api/admin/login', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
      const d = await r.json();
      if (d.success) { localStorage.setItem('admin_token', d.token); nav('/admin'); }
      else setErr(d.error || 'Invalid credentials');
    } catch { setErr('Cannot connect to backend. Make sure the server is running.'); }
    setSubmitting(false);
  };

  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#080808' }}>
      <div style={{ width:24, height:24, border:'1px solid rgba(244,242,238,.1)', borderTopColor:'rgba(244,242,238,.5)', borderRadius:'50%', animation:'spin .7s linear infinite' }}/>
    </div>
  );

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#080808', fontFamily:"'Syne',sans-serif", padding:'2rem' }}>
      <div style={{ width:'100%', maxWidth:400 }}>
        <div style={{ marginBottom:'3rem' }}>
          <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:'.3em', color:'rgba(244,242,238,.2)', textTransform:'uppercase', marginBottom:'.8rem' }}>Admin</p>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:'2.5rem', fontWeight:800, color:'#f4f2ee', letterSpacing:'-.04em', lineHeight:.95 }}>Sign In</h1>
        </div>

        {err && (
          <div style={{ padding:'.85rem 1rem', background:'rgba(239,68,68,.06)', border:'1px solid rgba(239,68,68,.2)', fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:'rgba(239,68,68,.8)', marginBottom:'1.5rem' }}>
            ⚠ {err}
          </div>
        )}

        <form onSubmit={submit} noValidate>
          {[
            { key:'username', label:'Username', type:'text', ph:'admin' },
            { key:'password', label:'Password', type:'password', ph:'••••••••' },
          ].map(f => (
            <div key={f.key} style={{ marginBottom:'1rem' }}>
              <label style={{ display:'block', fontFamily:"'JetBrains Mono',monospace", fontSize:8, letterSpacing:'.22em', color:'rgba(244,242,238,.3)', textTransform:'uppercase', marginBottom:'.4rem' }}>{f.label}</label>
              <input
                type={f.type}
                placeholder={f.ph}
                value={form[f.key]}
                onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))}
                style={{ width:'100%', background:'rgba(244,242,238,.03)', border:'1px solid rgba(244,242,238,.1)', color:'#f4f2ee', padding:'12px 14px', fontFamily:"'Syne',sans-serif", fontSize:14, outline:'none' }}
              />
            </div>
          ))}

          <button type="submit" disabled={submitting} style={{ width:'100%', padding:'13px', background:'#f4f2ee', border:'none', color:'#080808', fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:'.18em', textTransform:'uppercase', cursor:'auto', marginTop:'.5rem', opacity: submitting ? .6 : 1, transition:'opacity .2s' }}>
            {submitting ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:'.12em', color:'rgba(244,242,238,.18)', marginTop:'2rem', textAlign:'center' }}>
          Default: admin / Admin@2025
        </p>
      </div>
    </div>
  );
}
