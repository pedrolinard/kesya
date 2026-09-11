const WHATSAPP_NUMBER = '558698340636';
const header = document.querySelector('.header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const menuClose = navigation.querySelector('.menu-close');
const menuBackdrop = document.querySelector('.menu-backdrop');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Menu lateral no celular.
function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  navigation.classList.toggle('is-open', open);
  menuBackdrop.hidden = !open;
  document.body.classList.toggle('menu-open', open);
}

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  setMenu(open);
  if (open) menuClose.focus();
});
menuClose.addEventListener('click', () => {
  setMenu(false);
  menuButton.focus();
});
menuBackdrop.addEventListener('click', () => setMenu(false));
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', event => {
  if (!navigation.classList.contains('is-open')) return;
  if (event.key === 'Escape') {
    setMenu(false);
    menuButton.focus();
  } else if (event.key === 'Tab') {
    // Mantém o foco dentro do menu enquanto ele está aberto.
    const items = navigation.querySelectorAll('a, button');
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});
window.matchMedia('(min-width: 981px)').addEventListener('change', event => {
  if (event.matches) setMenu(false);
});

const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// Saudação e mensagens de acordo com o horário de quem visita.
const hour = new Date().getHours();
const period = hour >= 5 && hour < 12 ? 'bom dia' : hour >= 12 && hour < 18 ? 'boa tarde' : 'boa noite';
document.querySelector('#greeting').textContent = `${period[0].toUpperCase()}${period.slice(1)}!`;
document.querySelector('#year').textContent = new Date().getFullYear();

const whatsappLink = message => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
document.querySelectorAll('[data-message]').forEach(link => {
  link.href = whatsappLink(link.dataset.message.replace(/^Olá!/, `Olá, ${period}!`));
});

// Monta a mensagem da escolha guiada. Nada é enviado sem o clique do cliente.
const chooser = document.querySelector('.chooser-card');
if (chooser) {
  const preview = chooser.querySelector('#chooser-preview');
  const sendLink = chooser.querySelector('#chooser-send');
  const nameInput = chooser.querySelector('#cliente-nome');
  const questions = ['para', 'peca', 'ocasiao'];
  const answer = name => chooser.querySelector(`input[name="${name}"]:checked`)?.value;

  const composeMessage = () => {
    const [recipient, piece, occasion] = questions.map(answer);
    const name = nameInput.value.replace(/\s+/g, ' ').trim().slice(0, 40);
    const couple = recipient === 'para nós dois';
    const parts = [`Olá, ${period}!`];
    if (name) parts.push(`Aqui é ${name}.`);
    if (!recipient && !piece && !occasion) {
      parts.push('Vim pelo site e gostaria de ajuda para escolher uma joia.');
      return parts.join(' ');
    }
    const pieceText = !piece || piece === 'indefinido' ? 'uma joia' : piece;
    parts.push(`${couple ? 'Estamos' : 'Estou'} procurando ${pieceText}${recipient ? ` ${recipient}` : ''}.`);
    if (occasion) parts.push(`É ${occasion}.`);
    if (piece === 'indefinido') parts.push(couple ? 'Ainda não sabemos qual peça.' : 'Ainda não sei qual peça.');
    parts.push(`Pode ${couple ? 'nos' : 'me'} mostrar algumas opções em ouro 18k?`);
    return parts.join(' ');
  };

  const updateMessage = animate => {
    const message = composeMessage();
    preview.textContent = message;
    sendLink.href = whatsappLink(message);
    chooser.dataset.answered = String(questions.filter(answer).length);
    if (animate && !reduceMotion.matches) {
      preview.classList.remove('is-updated');
      void preview.offsetWidth;
      preview.classList.add('is-updated');
    }
  };

  chooser.addEventListener('change', event => {
    if (event.target.type === 'radio') updateMessage(true);
  });
  nameInput.addEventListener('input', () => updateMessage(false));
  updateMessage(false);
}

// Aparição suave dos blocos ao rolar.
if ('IntersectionObserver' in window && !reduceMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('is-pending');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(element => {
    element.classList.add('is-pending');
    observer.observe(element);
  });
}

const questionsList = document.querySelectorAll('.faq-list details');
questionsList.forEach(question => {
  question.addEventListener('toggle', () => {
    if (question.open) questionsList.forEach(other => {
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

// Convite discreto para conversar, exibido uma vez depois que a pessoa passa da abertura.
const hint = document.querySelector('.float-hint');
const hero = document.querySelector('.hero');
if (hint && hero && 'IntersectionObserver' in window) {
  let hintState = 'waiting';
  let hintTimer;
  const closeHint = () => {
    hintState = 'closed';
    hint.hidden = true;
    clearTimeout(hintTimer);
  };
  hint.querySelector('.float-hint-close').addEventListener('click', closeHint);
  document.querySelector('.floating-contact').addEventListener('click', closeHint);
  new IntersectionObserver(([entry]) => {
    clearTimeout(hintTimer);
    if (entry.isIntersecting) {
      if (hintState === 'shown') hint.hidden = true;
    } else if (hintState === 'waiting') {
      hintTimer = setTimeout(() => {
        hintState = 'shown';
        hint.hidden = false;
      }, 7000);
    } else if (hintState === 'shown') {
      hint.hidden = false;
    }
  }, { threshold: 0.2 }).observe(hero);
}
