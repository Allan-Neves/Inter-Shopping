document.addEventListener('DOMContentLoaded', () => {

  // ============ Configuração dos temas ============ \\
  const html = document.querySelector('html');
  const inputDarkMode = document.querySelector('.input-dark-mode');

  // Verificar se há um tema salvo no armazenamento local
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    // Aplicar o tema salvo
    if (savedTheme === 'dark') {
      html.setAttribute('dark', 'true');
      inputDarkMode.checked = true;
    } else {
      html.removeAttribute('dark');
      inputDarkMode.checked = false;
    }
  }

  inputDarkMode.addEventListener('change', () => {
    html.toggleAttribute('dark', inputDarkMode.checked);
    localStorage.setItem('theme', inputDarkMode.checked ? 'dark' : 'light');
  });


  // ============ Configuração de salvamento da rolagem ============ \\

  // Salva a posição de rolagem atual da página
  window.addEventListener('beforeunload', () => {
    history.scrollRestoration = 'manual';
    history.pushState({ scrollTop: window.scrollY }, '');
  });

  // Recupera a posição de rolagem salva no objeto history do navegador
  window.addEventListener('load', () => {
    if (history.state && history.state.scrollTop) {
      window.scrollTo(0, history.state.scrollTop);
    }
  });


  // ============ Configuração da tela de carregamento ============ \\

  document.body.classList.add('loading');
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.querySelector('#loading-screen').style.display = 'none';
      document.body.classList.remove('loading');
    }, 1000);
  });


  // ============ Configuração da biblioteca LazyLoad ============ \\

  var lazyLoadInstance = new LazyLoad({
    elements_selector: '.lazyload',
    threshold: 350,
    data_srcset: 'data-srcset',
    load_delay: 70
  });

  lazyLoadInstance.update();

  // ============ Configuração do menu hamburguer ============ \\

  var hamburger = document.querySelector('.hamburger');

  if (hamburger) {
    var nav = document.querySelector('nav');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      nav.classList.toggle('open');

      const opcoesCatalogo = document.querySelector('.opcoes-catalogo');
      opcoesCatalogo.style.display = nav.classList.contains('open') ? 'none' : 'block';

      ['whatsapp', 'instagram', 'twitter', 'facebook'].forEach(name => {
        const img = document.querySelector(`img[src="imagens/${name}-50.png"]`);
        const imgToggle = document.querySelector(`img[src="imagens/${name}-100.png"]`);

        if (nav.classList.contains('open')) {
          if (img) {
            img.src = `imagens/${name}-100.png`;
          }
          if (imgToggle) {
            imgToggle.src = `imagens/${name}-50.png`;
          }
        } else {
          if (img) {
            img.src = `imagens/${name}-50.png`;
          }
          if (imgToggle) {
            imgToggle.src = `imagens/${name}-100.png`;
          }
        }
      });
    });
  }
});