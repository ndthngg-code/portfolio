import React, { useEffect, useRef } from 'react';
export default function Cursor() {
  const dot=useRef(null), ring=useRef(null), lag=useRef({x:-200,y:-200}), pos=useRef({x:-200,y:-200});
  useEffect(()=>{
    if(window.matchMedia('(max-width:900px)').matches) return;
    const mv=e=>{pos.current={x:e.clientX,y:e.clientY};if(dot.current){dot.current.style.left=e.clientX+'px';dot.current.style.top=e.clientY+'px';}};
    const en=()=>{if(dot.current)dot.current.style.transform='translate(-50%,-50%) scale(0)';if(ring.current){ring.current.style.transform='translate(-50%,-50%) scale(2.4)';ring.current.style.borderColor='rgba(244,242,238,.5)';}};
    const lv=()=>{if(dot.current)dot.current.style.transform='translate(-50%,-50%) scale(1)';if(ring.current){ring.current.style.transform='translate(-50%,-50%) scale(1)';ring.current.style.borderColor='rgba(244,242,238,.2)';}};
    document.addEventListener('mousemove',mv);
    document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('mouseenter',en);el.addEventListener('mouseleave',lv);});
    let raf;const loop=()=>{lag.current.x+=(pos.current.x-lag.current.x)*.1;lag.current.y+=(pos.current.y-lag.current.y)*.1;if(ring.current){ring.current.style.left=lag.current.x+'px';ring.current.style.top=lag.current.y+'px';}raf=requestAnimationFrame(loop);};loop();
    return()=>{document.removeEventListener('mousemove',mv);cancelAnimationFrame(raf);};
  },[]);
  return(<>
    <div ref={dot} style={{position:'fixed',width:6,height:6,background:'#f4f2ee',borderRadius:'50%',pointerEvents:'none',zIndex:9999,transform:'translate(-50%,-50%)',transition:'transform .15s',willChange:'left,top'}}/>
    <div ref={ring} style={{position:'fixed',width:36,height:36,border:'1px solid rgba(244,242,238,.2)',borderRadius:'50%',pointerEvents:'none',zIndex:9998,transform:'translate(-50%,-50%)',transition:'transform .25s,border-color .25s',willChange:'left,top'}}/>
  </>);
}
