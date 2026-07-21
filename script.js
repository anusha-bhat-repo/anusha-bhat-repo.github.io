window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hide'), 1600);
  setTimeout(typeName, 1700);
});

// scroll intro:
(function(){
  const pin = document.getElementById('heroPin');
  const img = document.getElementById('heroZoomImg');
  const cue = document.getElementById('scrollCue');
  if (!pin || !img) return;
  function onScroll(){
    if (document.documentElement.getAttribute('data-theme') === 'boring') return;
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

function typeName(){
  const el = document.getElementById('heroName');
  const cursor = document.getElementById('typeCursor');
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

//  stars
(function(){
  const wrap = document.getElementById('starsBg');
  const n = 42;
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

// 3D tilt on the photo frame
(function(){
  const el = document.getElementById('photoFrame');
  el.addEventListener('mousemove', (e) => {
    if (document.documentElement.getAttribute('data-theme') === 'boring') return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const rx = ((y / r.height) - 0.5) * -16;
    const ry = ((x / r.width) - 0.5) * 16;
    el.style.transform = `rotate(-1deg) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`;
  });
  el.addEventListener('mouseleave', () => { el.style.transform = ''; });
})();


(function(){
  const containers = document.querySelectorAll('.project-grid, .awards-grid, .logo-grid');
  const cardSelector = '.project-card, .award-card, .logo-card';
  const maxTilt = 10;

  containers.forEach(container => {
    container.addEventListener('mousemove', (e) => {
      if (document.documentElement.getAttribute('data-theme') === 'boring') return;
      const card = e.target.closest(cardSelector);
      if (!card || !container.contains(card)) return;
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const rx = ((y / r.height) - 0.5) * -maxTilt;
      const ry = ((x / r.width) - 0.5) * maxTilt;
      card.style.transform = `translateY(-4px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    container.addEventListener('mouseleave', () => {
      container.querySelectorAll(cardSelector).forEach(c => c.style.transform = '');
    });
  });

  document.querySelectorAll('.win98-widget').forEach(widget => {
    widget.addEventListener('mousemove', (e) => {
      if (document.documentElement.getAttribute('data-theme') === 'boring') return;
      const r = widget.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const rx = ((y / r.height) - 0.5) * -8;
      const ry = ((x / r.width) - 0.5) * 8;
      widget.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    widget.addEventListener('mouseleave', () => { widget.style.transform = ''; });
  });
})();

const scrollBar = document.getElementById('scrollBar');
function updateScrollBar(){
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  scrollBar.style.width = (isFinite(scrolled) ? scrolled : 0) + '%';
}
window.addEventListener('scroll', updateScrollBar);
updateScrollBar();

const root = document.documentElement;
const lightToggle = document.getElementById('lightToggle');
const darkToggle = document.getElementById('darkToggle');
const boringToggle = document.getElementById('boringToggle');

function applyTheme(t){
  root.setAttribute('data-theme', t);
  [lightToggle, darkToggle, boringToggle].forEach(b => b.classList.remove('active'));
  if (t === 'light') lightToggle.classList.add('active');
  if (t === 'dark') darkToggle.classList.add('active');
  if (t === 'boring') boringToggle.classList.add('active');
}

lightToggle.addEventListener('click', () => applyTheme('light'));
darkToggle.addEventListener('click', () => applyTheme('dark'));
boringToggle.addEventListener('click', () => applyTheme('boring'));

applyTheme('dark');

const langToggle = document.getElementById('langToggle');
let lang = 'en';

const placeholders = {
  name: { en: 'Your name', de: 'Dein Name' },
  email: { en: 'Your email', de: 'Deine E-Mail' },
  message: { en: 'Say something nice (or just say hi)', de: 'Sag etwas Nettes (oder einfach hallo)' },
};
const logoWord = { en: 'logo', de: 'Logo' };

function setLanguage(newLang){
  lang = newLang;
  langToggle.textContent = lang === 'en' ? '🇩🇪' : '🇬🇧';
  langToggle.title = lang === 'en' ? 'Switch to German' : 'Switch to English';
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.getAttribute('data-' + lang);
  });
  const formNote = document.getElementById('formNote');
  if (formNote) {
    formNote.innerHTML = lang === 'en'
      ? 'Powered by <a href="https://formspree.io/" target="_blank" rel="noopener">Formspree</a> — goes straight to my inbox ♡'
      : 'Läuft über <a href="https://formspree.io/" target="_blank" rel="noopener">Formspree</a> — kommt direkt in meinem Postfach an ♡';
  }
  document.getElementById('nameInput').placeholder = placeholders.name[lang];
  document.getElementById('emailInput').placeholder = placeholders.email[lang];
  document.getElementById('messageInput').placeholder = placeholders.message[lang];
  renderTimeline();
  renderSkills();
  renderFilters();
  renderCerts();
  renderAwards();
  renderProjects();
  drawRadar();
}

langToggle.addEventListener('click', () => {
  setLanguage(lang === 'en' ? 'de' : 'en');
});

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.mobile-menu a, nav.desktop-nav a').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      mobileMenu.classList.remove('open');
    }
  });
});

const experience = [
  {
    role: { en: 'Working Student, Digitalization, QA & AI Automation', de: 'Werkstudentin, Digitalisierung, QA & KI-Automatisierung' },
    org: 'Siemens Energy AG',
    date: { en: 'Jan 2026 — Present · Mülheim an der Ruhr', de: 'Jan 2026 — heute · Mülheim an der Ruhr' },
    desc: {
      en: 'I test Salesforce Field Service workflows and validate enterprise reports for data integrity, and I build out Agentforce AI agents in Flow Builder that summarise work orders and track service milestones for the team.',
      de: 'Ich teste Salesforce-Field-Service-Workflows und prüfe Unternehmensberichte auf Datenintegrität, und ich entwickle Agentforce-KI-Agenten in Flow Builder, die Arbeitsaufträge zusammenfassen und Servicemeilensteine für das Team verfolgen.'
    }
  },
  {
    role: { en: 'Technical Intern, Digital Twin & 3D Measurement', de: 'Technische Praktikantin, Digital Twin & 3D-Messtechnik' },
    org: 'Siemens Energy AG',
    date: { en: 'Sep 2025 — Dec 2025 · Mülheim an der Ruhr', de: 'Sep 2025 — Dez 2025 · Mülheim an der Ruhr' },
    desc: {
      en: 'I supported digital twin workflows with PolyWorks and photogrammetry, ran 3D scanners and laser trackers for precision measurement, and wrote Python scripts to automate parts of the measurement pipeline.',
      de: 'Ich unterstützte Digital-Twin-Workflows mit PolyWorks und Photogrammetrie, bediente 3D-Scanner und Lasertracker für Präzisionsmessungen und schrieb Python-Skripte zur Automatisierung von Teilen der Messpipeline.'
    }
  },
  {
    role: { en: 'Student Intern, Web Development', de: 'Praktikantin, Webentwicklung' },
    org: 'Freshman Institute, FH Aachen',
    date: { en: 'Oct 2022 — Dec 2022 · Aachen', de: 'Okt 2022 — Dez 2022 · Aachen' },
    desc: {
      en: 'My first real dev job: building responsive pages with HTML, CSS, PHP, and JavaScript, plus backend scripting and functional testing.',
      de: 'Mein erster richtiger Entwicklerjob: responsive Seiten mit HTML, CSS, PHP und JavaScript, dazu Backend-Skripting und funktionale Tests.'
    }
  },
];
const timeline = document.getElementById('timeline');
function renderTimeline(){
  timeline.innerHTML = '';
  experience.forEach(e => {
    const item = document.createElement('div');
    item.className = 'tl-item';
    item.innerHTML = `
      <div class="tl-role">${e.role[lang]}</div>
      <div class="tl-org">${e.org}</div>
      <span class="tl-date">${e.date[lang]}</span>
      <p class="tl-desc">${e.desc[lang]}</p>
    `;
    timeline.appendChild(item);
  });
}

const skills = [
  { name: { en: 'Python', de: 'Python' }, icon: 'python', cat: 'Languages' },
  { name: { en: 'C++', de: 'C++' }, icon: 'cplusplus', cat: 'Languages' },
  { name: { en: 'C', de: 'C' }, icon: 'c', cat: 'Languages' },
  { name: { en: 'Java', de: 'Java' }, icon: 'openjdk', cat: 'Languages' },
  { name: { en: 'JavaScript', de: 'JavaScript' }, icon: 'javascript', cat: 'Languages' },
  { name: { en: 'SQL', de: 'SQL' }, icon: '', cat: 'Languages' },
  { name: { en: 'PHP', de: 'PHP' }, icon: 'php', cat: 'Languages' },
  { name: { en: 'React Native', de: 'React Native' }, icon: 'react', cat: 'Frontend' },
  { name: { en: 'Expo', de: 'Expo' }, icon: 'expo', cat: 'Frontend' },
  { name: { en: 'HTML5', de: 'HTML5' }, icon: 'html5', cat: 'Frontend' },
  { name: { en: 'CSS3', de: 'CSS3' }, icon: 'css3', cat: 'Frontend' },
  { name: { en: 'MySQL', de: 'MySQL' }, icon: 'mysql', cat: 'Backend' },
  { name: { en: 'Kafka', de: 'Kafka' }, icon: 'apachekafka', cat: 'Backend' },
  { name: { en: 'Spring Boot', de: 'Spring Boot' }, icon: 'springboot', cat: 'Backend' },
  { name: { en: 'OpenCV', de: 'OpenCV' }, icon: 'opencv', cat: 'Backend' },
  { name: { en: 'AWS', de: 'AWS' }, icon: 'amazonaws', cat: 'CloudAI' },
  { name: { en: 'Azure', de: 'Azure' }, icon: 'microsoftazure', cat: 'CloudAI' },
  { name: { en: 'Salesforce', de: 'Salesforce' }, icon: 'salesforce', cat: 'CloudAI' },
  { name: { en: 'UiPath RPA', de: 'UiPath RPA' }, icon: 'uipath', cat: 'CloudAI' },
  { name: { en: 'Power BI', de: 'Power BI' }, icon: 'powerbi', cat: 'CloudAI' },
  { name: { en: 'Figma', de: 'Figma' }, icon: 'figma', cat: 'Design' },
  { name: { en: 'Canva', de: 'Canva' }, icon: 'canva', cat: 'Design' },
  { name: { en: 'Git', de: 'Git' }, icon: 'git', cat: 'Tools' },
  { name: { en: 'GitHub', de: 'GitHub' }, icon: 'github', cat: 'Tools' },
  { name: { en: 'Docker', de: 'Docker' }, icon: 'docker', cat: 'Tools' },
];

const coreConcepts = [
  { en: 'Data Structures & Algorithms', de: 'Datenstrukturen & Algorithmen' },
  { en: 'OOP', de: 'OOP' },
  { en: 'Multithreading', de: 'Multithreading' },
  { en: 'Computer Networks', de: 'Rechnernetze' },
  { en: 'Network Security', de: 'Netzwerksicherheit' },
  { en: 'Operating Systems', de: 'Betriebssysteme' },
  { en: 'Software QA', de: 'Software-QA' },
  { en: 'AI Agent Development', de: 'KI-Agentenentwicklung' },
  { en: 'Regression Testing', de: 'Regressionstests' },
  { en: 'Database Systems', de: 'Datenbanksysteme' },
  { en: 'Graph Theory', de: 'Graphentheorie' },
  { en: 'Serverless Architecture', de: 'Serverlose Architektur' },
  { en: 'UI/UX Design', de: 'UI/UX-Design' },
  { en: 'Digital Logic', de: 'Digitale Logik' },
  { en: 'Embedded Systems', de: 'Eingebettete Systeme' },
];
const coreConceptsRow = document.getElementById('coreConceptsRow');
function renderCoreConcepts(){
  coreConceptsRow.innerHTML = '';
  coreConcepts.forEach(c => {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.textContent = c[lang];
    coreConceptsRow.appendChild(chip);
  });
}

const radarSkills = [
  { name: { en: 'Frontend', de: 'Frontend' }, level: 9 },
  { name: { en: 'Networks', de: 'Netzwerke' }, level: 8 },
  { name: { en: 'Automation', de: 'Automatisierung' }, level: 8 },
  { name: { en: 'Testing & QA', de: 'Testing & QA' }, level: 9 },
  { name: { en: 'Cloud', de: 'Cloud' }, level: 6 },
  { name: { en: 'Cybersecurity', de: 'Cybersicherheit' }, level: 5 },
];
const skillsGrid = document.getElementById('skillsGrid');
function renderSkills(){
  skillsGrid.innerHTML = '';
  skills.forEach(s => {
    const card = document.createElement('div');
    card.className = 'logo-card';
    card.dataset.cat = s.cat;
    card.innerHTML = `
      ${s.icon ? `<img src="https://cdn.simpleicons.org/${s.icon}" alt="${s.name[lang]} ${logoWord[lang]}" onerror="this.style.display='none'">` : ''}
      <span class="lname">${s.name[lang]}</span>
    `;
    skillsGrid.appendChild(card);
  });
  const activeCat = document.querySelector('.filter-btn.active')?.dataset.cat || 'All';
  applyFilter(activeCat);
  renderCoreConcepts();
}

const filterBar = document.getElementById('filterBar');
const catLabels = {
  All: { en: 'All', de: 'Alle' },
  Languages: { en: 'Languages', de: 'Sprachen' },
  Frontend: { en: 'Frontend', de: 'Frontend' },
  Backend: { en: 'Backend', de: 'Backend' },
  CloudAI: { en: 'Cloud + AI', de: 'Cloud & KI' },
  Design: { en: 'Design', de: 'Design' },
  Tools: { en: 'Tools', de: 'Tools' },
};
function applyFilter(cat){
  document.querySelectorAll('.logo-card').forEach(card => {
    card.style.display = (cat === 'All' || card.dataset.cat === cat) ? 'flex' : 'none';
  });
  document.querySelectorAll('.project-card').forEach(card => {
    const tags = card.dataset.cats ? card.dataset.cats.split(',') : [];
    card.style.display = (cat === 'All' || tags.includes(cat)) ? 'flex' : 'none';
  });
}
function renderFilters(){
  const prevActive = document.querySelector('.filter-btn.active')?.dataset.cat || 'All';
  filterBar.innerHTML = '';
  const categories = ['All', ...new Set(skills.map(s => s.cat))];
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (cat === prevActive ? ' active' : '');
    btn.dataset.cat = cat;
    btn.textContent = catLabels[cat][lang];
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(cat);
    });
    filterBar.appendChild(btn);
  });
  applyFilter(prevActive);
}

function drawRadar(){
  const size = 280, center = size/2, maxR = 100;
  const n = radarSkills.length;
  const angle = i => (Math.PI*2*i/n) - Math.PI/2;
  const point = (i, r) => [center + r*Math.cos(angle(i)), center + r*Math.sin(angle(i))];

  let rings = '';
  [0.25,0.5,0.75,1].forEach(f => {
    const pts = radarSkills.map((_,i) => point(i, maxR*f).join(',')).join(' ');
    rings += `<polygon points="${pts}" fill="none" stroke="var(--border)" stroke-width="1.5"/>`;
  });
  let spokes = '';
  radarSkills.forEach((s,i) => {
    const [x,y] = point(i, maxR);
    spokes += `<line x1="${center}" y1="${center}" x2="${x}" y2="${y}" stroke="var(--border)" stroke-width="1.5"/>`;
  });
  const dataPts = radarSkills.map((s,i) => point(i, maxR*(s.level/10)).join(',')).join(' ');
  let labels = '';
  radarSkills.forEach((s,i) => {
    const [x,y] = point(i, maxR + 26);
    labels += `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" font-family="Space Mono" font-size="9" fill="var(--text-soft)">${s.name[lang]}</text>`;
  });

  document.getElementById('radarWrap').innerHTML = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      ${rings}${spokes}
      <polygon points="${dataPts}" fill="var(--pink)" fill-opacity="0.35" stroke="var(--purple)" stroke-width="2.5"/>
      ${radarSkills.map((s,i)=>{ const [x,y]=point(i, maxR*(s.level/10)); return `<circle cx="${x}" cy="${y}" r="4" fill="var(--purple)"/>`; }).join('')}
      ${labels}
    </svg>
  `;
}

const certs = [
  'Salesforce · Agentforce', 'Salesforce · Flow Builder', 'Microsoft · Power BI',
  'Microsoft · Fabric', 'UiPath · RPA', 'DataCamp · Generative AI', 'HubSpot · Inbound Marketing'
];
const certRow = document.getElementById('certRow');
function renderCerts(){
  certRow.innerHTML = '';
  certs.forEach(c => {
    const b = document.createElement('span');
    b.className = 'cert-badge';
    b.textContent = c;
    certRow.appendChild(b);
  });
}

const projects = [
  {
    title: { en: 'Budgeted Multipath Overlays', de: 'Budgeted Multipath Overlays' },
    desc: {
      en: 'My bachelor thesis: a graph simulation framework that decides where to place backup network links so a backbone stays resilient even when nodes fail, without blowing the budget. Written in Python with NetworkX, tested against backbone and grid topologies.',
      de: 'Meine Bachelorarbeit: ein Graph-Simulationsframework, das entscheidet, wo Backup-Netzwerkverbindungen platziert werden, damit ein Backbone auch bei Knotenausfällen belastbar bleibt, ohne das Budget zu sprengen. Geschrieben in Python mit NetworkX, getestet an Backbone- und Grid-Topologien.'
    },
    tags: ['Python', 'NetworkX', 'Graph Theory'],
    cats: ['Languages', 'CloudAI'],
    link: null,
    linkText: { en: 'In progress', de: 'In Arbeit' },
    image: 'images/projects/multipath-overlays.png'
  },
  {
    title: { en: 'Realistic Ray Tracer Engine', de: 'Realistic Ray Tracer Engine' },
    desc: {
      en: 'A ray tracer built from nothing but math and C++: reflection, refraction, Phong lighting, and global illumination, with multithreading so it does not take all night to render a single scene.',
      de: 'Ein Ray Tracer, gebaut aus reiner Mathematik und C++: Reflexion, Brechung, Phong-Beleuchtung und globale Beleuchtung, mit Multithreading, damit das Rendern einer Szene nicht die ganze Nacht dauert.'
    },
    tags: ['C++', 'OOP', 'Multithreading'],
    cats: ['Languages'],
    link: 'https://github.com/anusha-bhat-repo/RayTracer-Cpp',
    linkText: { en: 'View repo', de: 'Repo ansehen' },
    image: 'images/projects/ray-tracer.jpg'
  },
  {
    title: { en: 'HalloHub', de: 'HalloHub' },
    desc: {
      en: 'A mobile app for international students landing in Germany, built at a hackathon and good enough to place as a finalist. It walks new arrivals through visas, housing, and the university paperwork nobody explains properly.',
      de: 'Eine mobile App für internationale Studierende, die neu in Deutschland ankommen, entwickelt auf einem Hackathon und gut genug für einen Finalplatz. Sie führt Neuankömmlinge durch Visum, Wohnungssuche und den Uni-Papierkram, den einem sonst niemand richtig erklärt.'
    },
    tags: ['React Native', 'Expo'],
    cats: ['Frontend'],
    link: 'https://github.com/anusha-bhat-repo/HalloHub',
    linkText: { en: 'View repo', de: 'Repo ansehen' },
    image: 'images/projects/hallohub.jpg'
  },
  {
    title: { en: 'Financial Data Streamer', de: 'Financial Data Streamer' },
    desc: {
      en: 'A JP Morgan Chase Forage simulation project: a live-updating financial data dashboard that streams and renders trading data in real time.',
      de: 'Ein JP-Morgan-Chase-Forage-Simulationsprojekt: ein live aktualisiertes Finanzdaten-Dashboard, das Handelsdaten in Echtzeit streamt und darstellt.'
    },
    tags: ['JavaScript', 'Data Visualisation'],
    cats: ['Frontend'],
    link: 'https://github.com/anusha-bhat-repo/financial-data-streamer',
    linkText: { en: 'View repo', de: 'Repo ansehen' },
    image: 'images/projects/financial-data-streamer.jpg'
  },
  {
    title: { en: 'Student-Teacher Dashboard', de: 'Student-Teacher Dashboard' },
    desc: {
      en: 'A role-based dashboard system for schools, with separate views for students and teachers, secure logins, an attendance tracker, and a notifications module.',
      de: 'Ein rollenbasiertes Dashboard-System für Schulen mit getrennten Ansichten für Schüler und Lehrer, sicheren Logins, einer Anwesenheitsverfolgung und einem Benachrichtigungsmodul.'
    },
    tags: ['Java', 'Authentication', 'GUI'],
    cats: ['Languages', 'Frontend'],
    link: 'https://github.com/anusha-bhat-repo/dpsd-b-nova',
    linkText: { en: 'View repo', de: 'Repo ansehen' },
    image: 'images/projects/student-teacher-dashboard.jpg'
  },
  {
    title: { en: 'Face Recognition System', de: 'Face Recognition System' },
    desc: {
      en: 'A real-time face detection and recognition app with a MySQL backend and a simple desktop interface, reaching 90% accuracy on a controlled dataset.',
      de: 'Eine Echtzeit-Gesichtserkennungs-App mit MySQL-Backend und einer einfachen Desktop-Oberfläche, die auf einem kontrollierten Datensatz 90% Genauigkeit erreicht.'
    },
    tags: ['Python', 'OpenCV', 'MySQL'],
    cats: ['Languages', 'Backend'],
    link: null,
    linkText: { en: 'Repo coming soon', de: 'Repo folgt bald' },
    image: 'images/projects/face-recognition.jpg'
  },
  {
    title: { en: 'Inventory Management System', de: 'Inventory Management System' },
    desc: {
      en: 'A desktop inventory tool with search, live updates, and auto-generated reports. Currently rebuilding it with a few new features before it goes public.',
      de: 'Ein Desktop-Inventartool mit Suche, Live-Updates und automatisch generierten Berichten. Wird gerade mit ein paar neuen Funktionen überarbeitet, bevor es veröffentlicht wird.'
    },
    tags: ['Python', 'MySQL', 'Tkinter'],
    cats: ['Languages', 'Backend'],
    link: null,
    linkText: { en: 'Repo coming soon', de: 'Repo folgt bald' },
    image: 'images/projects/inventory-management.jpg'
  },
];
const grid = document.getElementById('projectGrid');
function renderProjects(){
  grid.innerHTML = '';
  projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.cats = p.cats.join(',');
    card.innerHTML = `
      <div class="project-thumb">
        ${p.image ? `<img class="thumb-img" src="${p.image}" alt="${p.title[lang]}" onerror="this.remove()">` : ''}
      </div>
      <div class="project-body">
        <h3>${p.title[lang]}</h3>
        <p>${p.desc[lang]}</p>
        <div class="tag-row">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        ${p.link ? `<a class="project-link" href="${p.link}" target="_blank" rel="noopener">${p.linkText[lang]} →</a>` : `<span class="project-link disabled">${p.linkText[lang]}</span>`}
      </div>
    `;
    grid.appendChild(card);
  });
  document.querySelectorAll('.project-thumb').forEach(t => {
    for (let i=0;i<5;i++){
      const d = document.createElement('div');
      d.className = 'mini-pixel';
      d.style.left = Math.random()*90+'%';
      d.style.top = Math.random()*80+'%';
      t.appendChild(d);
    }
  });
}

const awards = [
  { icon: '🏅', title: { en: 'Deutschlandstipendium Scholar 2026', de: 'Deutschlandstipendium-Stipendiatin 2026' }, desc: { en: 'Merit-based national scholarship at UDE, sponsored by DEICHMANN.', de: 'Leistungsstipendium an der UDE, gefördert von DEICHMANN.' } },
  { icon: '🏆', title: { en: 'International Coding Combat — Winner', de: 'International Coding Combat — Siegerin' }, desc: { en: 'First place across 30+ competing countries.', de: 'Erster Platz unter mehr als 30 teilnehmenden Ländern.' } },
  { icon: '🎯', title: { en: 'Curtin University Hackathon — Finalist', de: 'Curtin University Hackathon — Finalistin' }, desc: { en: 'Built a smart scheduling tool in Python.', de: 'Ein intelligentes Terminplanungstool in Python entwickelt.' } },
  { icon: '🤖', title: { en: 'Robotic Arm Arduino Workshop — Winner', de: 'Robotic-Arm-Arduino-Workshop — Siegerin' }, desc: { en: 'Interdisciplinary engineering competition.', de: 'Interdisziplinärer Ingenieurwettbewerb.' } },
  { icon: '📊', title: { en: 'Top Grades at UDE', de: 'Bestnoten an der UDE' }, desc: { en: 'Computer Engineering 1.0 · Logic Design 1.0 · Probability & Statistics 1.3', de: 'Technische Informatik 1,0 · Logik-Design 1,0 · Wahrscheinlichkeit & Statistik 1,3' } },
  { icon: '🌐', title: { en: '5+ Hackathons', de: '5+ Hackathons' }, desc: { en: 'Web, AI and automation tracks across university and national-level events.', de: 'Web-, KI- und Automatisierungs-Tracks bei Uni- und landesweiten Events.' } },
];
const awardsGrid = document.getElementById('awardsGrid');
function renderAwards(){
  awardsGrid.innerHTML = '';
  awards.forEach(a => {
    const card = document.createElement('div');
    card.className = 'award-card';
    card.innerHTML = `
      <div class="award-icon">${a.icon}</div>
      <div>
        <div class="award-title">${a.title[lang]}</div>
        <div class="award-desc">${a.desc[lang]}</div>
      </div>
    `;
    awardsGrid.appendChild(card);
  });
}

renderTimeline();
renderSkills();
renderFilters();
renderCerts();
renderAwards();
renderProjects();
drawRadar();

const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

document.getElementById('mobileResume').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('resumeBtn').click();
});
