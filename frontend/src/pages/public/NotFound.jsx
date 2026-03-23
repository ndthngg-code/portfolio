import React from 'react';
import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#080808', fontFamily:"'Syne',sans-serif", padding:'2rem', textAlign:'center' }}>
      <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:'.3em', color:'rgba(244,242,238,.2)', textTransform:'uppercase', marginBottom:'1.5rem' }}>404 — Not Found</p>
      <h1 style={{ fontSize:'clamp(5rem,15vw,12rem)', fontWeight:800, letterSpacing:'-.05em', color:'#f4f2ee', lineHeight:.9, marginBottom:'2.5rem' }}>Lost.</h1>
      <Link to="/" style={{ display:'inline-flex', alignItems:'center', gap:10, background:'#f4f2ee', color:'#080808', fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:'.16em', textTransform:'uppercase', padding:'13px 28px' }}>← Back home</Link>
    </div>
  );
}
