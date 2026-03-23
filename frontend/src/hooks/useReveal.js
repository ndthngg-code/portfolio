import { useEffect } from 'react';
export default function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.rv');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); }),
      { threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}
