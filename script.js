//eventually hide the loader 
function hideLoader(){
  const loader = document.getElementById('loader');
  if (loader) loader.classList.add('hide');
}
if (document.readyState === 'complete') {
  setTimeout(hideLoader, 200);
} else {
  window.addEventListener('load', () => setTimeout(hideLoader, 200));
}
setTimeout(hideLoader, 4000); 

const root = document.documentElement;
const lightToggle = document.getElementById('lightToggle');
const darkToggle = document.getElementById('darkToggle');

function applyTheme(theme){
  root.setAttribute('data-theme', theme);
  lightToggle.classList.toggle('active', theme === 'light');
  darkToggle.classList.toggle('active', theme === 'dark');
}

lightToggle.addEventListener('click', () => applyTheme('light'));
darkToggle.addEventListener('click', () => applyTheme('dark'));

applyTheme('dark');

// --- language toggle ---
const langToggle = document.getElementById('langToggle');
let lang = 'en';

const placeholders = {
  name: { en: 'Your name', de: 'Dein Name' },
  email: { en: 'Your email', de: 'Deine E-Mail' },
  message: { en: 'Say something nice (or just say hi)', de: 'Sag etwas Nettes (oder einfach hallo)' },
};

function setLanguage(newLang){
  lang = newLang;
  langToggle.textContent = lang === 'en' ? '🇩🇪' : '🇬🇧';
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.getAttribute('data-' + lang);
  });
  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('emailInput');
  const messageInput = document.getElementById('messageInput');
  if (nameInput) nameInput.placeholder = placeholders.name[lang];
  if (emailInput) emailInput.placeholder = placeholders.email[lang];
  if (messageInput) messageInput.placeholder = placeholders.message[lang];
}

langToggle.addEventListener('click', () => {
  setLanguage(lang === 'en' ? 'de' : 'en');
});

// --- stars ---
(function(){
  const wrap = document.getElementById('starsBg');
  const n = 36;
  for(let i=0;i<n;i++){
    const s = document.createElement('div');
    s.className = 'star';
    const size = 2 + Math.random()*3;
    s.style.width = size+'px';
    s.style.height = size+'px';
    s.style.left = (Math.random()*100)+'%';
    s.style.top = (Math.random()*100)+'%';
    s.style.animationDelay = (Math.random()*3.4)+'s';
    s.style.animationDuration = (2.6 + Math.random()*2.2)+'s';
    wrap.appendChild(s);
  }
})();

// --- name typing effect thingy ---
function typeName(){
  const el = document.getElementById('heroName');
  const text = 'Anusha Bhat';
  let i = 0;
  el.textContent = '';
  const iv = setInterval(() => {
    el.textContent = text.slice(0, i + 1);
    el.setAttribute('data-text', text.slice(0, i + 1));
    i++;
    if (i >= text.length) clearInterval(iv);
  }, 85);
}
window.addEventListener('load', () => setTimeout(typeName, 300));

// --- scroll zoom intro ---
(function(){
  const pin = document.getElementById('heroPin');
  const img = document.getElementById('heroZoomImg');
  const cue = document.getElementById('scrollCue');
  if (!pin || !img) return;
  function onScroll(){
    const rect = pin.getBoundingClientRect();
    const total = pin.offsetHeight - window.innerHeight;
    const progress = Math.min(Math.max(-rect.top / total, 0), 1);
    const scale = 1 + progress * 1.3;
    img.style.transform = `scale(${scale})`;
    if (cue) cue.style.opacity = progress > 0.04 ? 0 : 0.9;
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();
})();

// ---  3D tilt ---
(function(){
  const el = document.getElementById('photoFrame');
  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const rx = ((y / r.height) - 0.5) * -14;
    const ry = ((x / r.width) - 0.5) * 14;
    el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;
  });
  el.addEventListener('mouseleave', () => { el.style.transform = ''; });
})();