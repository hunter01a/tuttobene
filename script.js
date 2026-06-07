
  const mq = document.getElementById('mq');
  if(mq) mq.innerHTML += mq.innerHTML;

  const io = new IntersectionObserver(es=>{
    es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:.12});
  document.querySelectorAll('.reveal,.stagger,.sec-head').forEach(el=>io.observe(el));

  const prog = document.getElementById('progress');
  const nav = document.getElementById('nav');
  let lastY = 0;
  addEventListener('scroll',()=>{
    const max = document.documentElement.scrollHeight - innerHeight;
    prog.style.width = (scrollY/max*100)+'%';
    nav.classList.toggle('hidden', scrollY>lastY && scrollY>300);
    lastY = scrollY;
    const logo = document.getElementById('heroLogo');
    if(logo && scrollY < innerHeight) logo.style.transform = `translateY(${scrollY*0.28}px)`;
  },{passive:true});

  const dot = document.getElementById('cDot'), ring = document.getElementById('cRing');
  let rx=0, ry=0, tx=0, ty=0;
  addEventListener('mousemove',e=>{
    tx=e.clientX; ty=e.clientY;
    dot.style.left=tx+'px'; dot.style.top=ty+'px';
  });
  (function loop(){ rx+=(tx-rx)*.16; ry+=(ty-ry)*.16;
    ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(loop); })();
  document.querySelectorAll('a,button,.tilt,.cat-item,.pp').forEach(el=>{
    el.addEventListener('mouseenter',()=>ring.classList.add('hovering'));
    el.addEventListener('mouseleave',()=>ring.classList.remove('hovering'));
  });

  const fine = matchMedia('(pointer:fine)').matches;
  if(fine) document.querySelectorAll('.tilt').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r = card.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width, y = (e.clientY-r.top)/r.height;
      card.style.transform = `perspective(800px) rotateY(${(x-.5)*9}deg) rotateX(${(.5-y)*9}deg) translateY(-4px)`;
      card.style.setProperty('--mx',(x*100)+'%');
      card.style.setProperty('--my',(y*100)+'%');
    });
    card.addEventListener('mouseleave',()=>{ card.style.transform=''; });
  });

  if(fine && document.getElementById('heroLogo')){
    const logo = document.getElementById('heroLogo');
    document.querySelector('header').addEventListener('mousemove',e=>{
      const x = e.clientX/innerWidth-.5, y = e.clientY/innerHeight-.5;
      logo.style.transform = `translateY(${Math.min(scrollY,innerHeight)*0.28}px) rotateY(${x*10}deg) rotateX(${-y*8}deg)`;
    });
  }

  // ---- menu hamburger
  const burger = document.getElementById('burger');
  const mmenu = document.getElementById('mobileMenu');
  if(burger && mmenu){
    burger.addEventListener('click',()=>mmenu.classList.add('open'));
    document.getElementById('mmClose').addEventListener('click',()=>mmenu.classList.remove('open'));
    mmenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mmenu.classList.remove('open')));
  }
