const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  navigation.classList.remove('is-open');
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  navigation.classList.toggle('is-open', isOpen);
});

navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia('(min-width: 701px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

document.querySelectorAll('[data-message]').forEach(link => {
  link.href = `https://wa.me/558698340636?text=${encodeURIComponent(link.dataset.message)}`;
});
document.querySelector('#year').textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reduceMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('is-pending');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => {
    element.classList.add('is-pending');
    observer.observe(element);
  });
}

const questions = document.querySelectorAll('.faq-list details');
questions.forEach(question => {
  question.addEventListener('toggle', () => {
    if (question.open) questions.forEach(other => {
      if (other !== question) other.open = false;
    });
  });
});

// Indica a seção atual no menu, inclusive depois de rolar a página.
if ('IntersectionObserver' in window) {
  const links = [...navigation.querySelectorAll('a[href^="#"]')];
  const sectionObserver = new IntersectionObserver(entries => {
    const current = entries.find(entry => entry.isIntersecting);
    if (!current) return;
    links.forEach(link => {
      if (link.hash === `#${current.target.id}`) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
}
