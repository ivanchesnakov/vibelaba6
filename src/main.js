document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const nameEl = document.getElementById('nameTrigger');

  // Инициализация темы
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'light' ? '🌙' : '️';

  // Переключение темы
  themeToggle.addEventListener('click', () => {
    const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'light' ? '' : '☀️';
  });

  // Пасхалка: 3 клика по имени → конфетти + левитация
  let clickCount = 0;
  let clickTimer = null;

  nameEl.addEventListener('click', () => {
    clickCount++;
    nameEl.classList.add('pop-anim');
    setTimeout(() => nameEl.classList.remove('pop-anim'), 350);

    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => clickCount = 0, 800);

    if (clickCount === 3) {
      triggerEasterEgg();
      clickCount = 0;
    }
  });

  function triggerEasterEgg() {
    const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6'];
    for (let i = 0; i < 35; i++) {
      const p = document.createElement('div');
      p.style.cssText = `
        position: fixed; left: 50%; top: 20%; width: 8px; height: 8px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%; pointer-events: none; z-index: 9999;
      `;
      document.body.appendChild(p);

      const angle = Math.random() * Math.PI * 2;
      const dist = 120 + Math.random() * 180;
      p.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: `translate(calc(-50% + ${Math.cos(angle)*dist}px), calc(-50% + ${Math.sin(angle)*dist}px)) scale(0)`, opacity: 0 }
      ], { duration: 1500, easing: 'cubic-bezier(0, .9, .57, 1)', fill: 'forwards' })
      .onfinish = () => p.remove();
    }

    nameEl.classList.add('float-anim');
    setTimeout(() => nameEl.classList.remove('float-anim'), 2500);
  }
});
