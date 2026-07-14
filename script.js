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

applyTheme('light');

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