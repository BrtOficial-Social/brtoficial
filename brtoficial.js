// Regra I e III: Bloqueia o clique com botão direito / toque longo
document.addEventListener('contextmenu', function(event) {
  event.preventDefault();
});

// Regra I: Proteção extra para impedir que arrastem imagens para salvar
document.addEventListener('dragstart', function(event) {
  if (event.target.tagName === 'IMG') {
    event.preventDefault();
  }
});

// Regra II: Impede o zoom de pinça (multi-toque) no celular
document.addEventListener('touchstart', function(event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}, { passive: false });

// Regra II: Impede o zoom ao dar dois toques rápidos na tela
let ultimoToque = 0;
document.addEventListener('touchend', function(event) {
  const agora = new Date().getTime();
  if (agora - ultimoToque <= 300) {
    event.preventDefault();
  }
  ultimoToque = agora;
}, { passive: false });

// Regra IV: Gerenciamento dos botões (Atraso e Efeito de Brilho Infinito)
document.addEventListener('DOMContentLoaded', function() {
  const botoes = document.querySelectorAll('.link-btn');
  
  botoes.forEach(botao => {
    const brilho = botao.querySelector('.brilho');
    
    // Função para disparar a animação reiniciando-a do zero
    function dispararBrilho() {
      if (brilho) {
        brilho.style.animation = 'none'; // Reseta a animação
        brilho.offsetHeight; // Força o navegador a reconhecer o reset (Reflow)
        brilho.style.animation = 'passarBrilho 0.6s ease-out'; // Aplica novamente
      }
    }
    
    // Dispara ao passar o mouse (computador)
    botao.addEventListener('mouseenter', dispararBrilho);
    
    // Dispara ao clicar/tocar
    botao.addEventListener('click', function(event) {
      event.preventDefault();
      
      const url = this.getAttribute('href');
      const target = this.getAttribute('target') || '_self';
      
      // Força o brilho a rodar no clique de forma limpa
      dispararBrilho();
      
      // Feedback visual de clique (opacidade reduzida)
      this.style.opacity = '0.79';
      
      // Aguarda os 2 segundos
      setTimeout(function() {
        botao.style.opacity = '1';
        if (target === '_blank') {
          window.open(url, '_blank');
        } else {
          window.location.href = url;
        }
      }, 2000);
    });
  });
});