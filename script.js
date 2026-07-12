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