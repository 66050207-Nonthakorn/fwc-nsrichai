const sections = [...document.querySelectorAll('main section')];
const links = document.querySelectorAll('.nav-links a');

  function updateNavigation() {
  const current = sections
    .filter(section => section.getBoundingClientRect().top <= 65).at(-1) || sections[0];
  
  for (const link of links) {
    if (link.hash === `#${current.id}`) {
      link.setAttribute('aria-current', 'location');
    }
    else {
      link.removeAttribute('aria-current');
    }
  }
}

window.addEventListener('scroll', updateNavigation, { passive: true });
