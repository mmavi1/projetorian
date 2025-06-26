let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function carregarProdutos() {
  fetch('./produtos.json')
    .then(response => {
      if (!response.ok) throw new Error("Erro na requisição dos produtos");
      return response.json();
    })
    .then(produtos => {
      const container = document.getElementById('produtos');
      container.innerHTML = '';

      produtos.forEach(prod => {
        const produtoHTML = `
          <div class="produto">
            <img src="${prod.img}" alt="${prod.nome}" />
            <h3>${prod.nome}</h3>
            <p>R$ ${prod.preco.toFixed(2)}</p>
            <button data-id="${prod.id}">Adicionar ao carrinho</button>
          </div>`;
        container.innerHTML += produtoHTML;
      });

      document.querySelectorAll('button[data-id]').forEach(btn => {
        btn.addEventListener('click', () => {
          const produto = produtos.find(p => p.id == btn.dataset.id);
          if (produto) adicionarCarrinho(produto);
        });
      });
    });
}

function adicionarCarrinho(produto) {
  carrinho.push(produto);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const carrinhoEl = document.getElementById('carrinho');
  if (!carrinhoEl) return;

  carrinhoEl.innerHTML = '';
  let total = 0;

  carrinho.forEach((item, index) => {
    carrinhoEl.innerHTML += `
      <li>${item.nome} - R$ ${item.preco.toFixed(2)}
        <button class="remover-item" data-index="${index}">❌</button>
      </li>`;
    total += item.preco;
  });

  const totalEl = document.getElementById('total');
  if (totalEl) totalEl.textContent = total.toFixed(2);

  document.querySelectorAll('.remover-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      carrinho.splice(idx, 1);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      atualizarCarrinho();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  carregarProdutos();
  atualizarCarrinho();

  const voltarBtn = document.getElementById('voltarLoja');
  if (voltarBtn) {
    voltarBtn.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem('carrinho');
      window.location.href = 'sorveteria.html';
    });
  }
});


// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  carregarProdutos();
  atualizarCarrinho();
});
