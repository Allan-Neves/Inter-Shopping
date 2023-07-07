document.addEventListener('DOMContentLoaded', () => {

  // Cria uma instância IntersectionObserver para observar quando os elementos entram na área de visualização
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadGroup(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });

  // Função para carregar um grupo de elementos
  function loadGroup(group) {
    group.style.visibility = 'visible';
    group.querySelectorAll('.container-catalogo').forEach(container => {
      container.querySelectorAll('img.lazyload').forEach(image => {
        image.src = image.dataset.src;
      });
    });
  }

  // Função para gerar um grupo a partir dos dados contidos no arquivo "./data.js"
  function generateGroup({ title, containers }) {
    // Cria um elemento div para o grupo
    const group = document.createElement('div');
    group.classList.add('group');
    group.style.visibility = 'collapse';

    // Cria um elemento h4 para o título do grupo
    const titleElement = document.createElement('h4');
    titleElement.classList.add('titulo-catalogo');
    titleElement.textContent = title;
    titleElement.id = title.replace(/ /g, '-').toLowerCase();
    group.appendChild(titleElement);    

    // Cria um elemento div para os containers do grupo
    const containerCatalogo = document.createElement('div');
    containerCatalogo.classList.add('container-catalogo');
    group.appendChild(containerCatalogo);

    // Percorre todos os dados dos containers e gera os elementos correspondentes
    containers.forEach(containerData => {
      const container = generateContainer(containerData);
      containerCatalogo.appendChild(container);
      observer.observe(container);
    });

    return group;
  }

  // Função para gerar um container a partir dos dados contidos no arquivo "./data.js"
  function generateContainer({ images, description }) {
    // Cria um elemento div para o container
    const container = document.createElement('div');
    container.classList.add('container-catalogo');

    // Adiciona o conteúdo do container usando um template literal
    container.insertAdjacentHTML('beforeend', `
      <div class="itens-wrapper">
        <div class="itens">
          ${images
        .map(image => `<div class="item"><img class="lazyload" data-src="${image}" loading="lazy"/></div>`)
        .join('')
      }
        </div>
        <p class="descricao-imagem-catalogo">${description}</p>
      </div>
    `);

    return container;
  }

  const parentElement = document.querySelector('.main');

  // Percorre todos os dados dos grupos, gera os elementos correspondentes e os adiciona ao elemento pai
  groupsData2.map(generateGroup).forEach(group => {
    parentElement.appendChild(group);
    observer.observe(group);
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

});