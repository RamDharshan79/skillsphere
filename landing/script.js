const body=document.body;const year=document.getElementById('year');if(year)year.textContent=String(new Date().getFullYear());
const themeToggle=document.querySelector('.theme-toggle');const stored=localStorage.getItem('theme');if(stored){body.setAttribute('data-theme',stored)}
function toggleTheme(){const cur=body.getAttribute('data-theme');const next=cur==='dark'?'light':'dark';body.setAttribute('data-theme',next);localStorage.setItem('theme',next)}
if(themeToggle)themeToggle.addEventListener('click',toggleTheme)
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth',block:'start'})})})
const mobileToggle=document.querySelector('.mobile-menu-toggle');const navLinks=document.querySelector('.nav-links');if(mobileToggle)mobileToggle.addEventListener('click',()=>{navLinks.classList.toggle('mobile-active')})
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})},{threshold:.1,rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el))
const ill=document.querySelector('.hero-illustration');let lastY=0;function parallax(){const y=window.scrollY;const dy=y-lastY;lastY=y;if(!ill)return;ill.querySelectorAll('.shape').forEach((s,i)=>{const f=(i+1)*0.2;s.style.transform=`translateY(${y*f}px)`})}
window.addEventListener('scroll',parallax,{passive:true})
