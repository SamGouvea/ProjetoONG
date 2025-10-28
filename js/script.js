// Helper: Máscaras de Input
document.addEventListener("input", function (e) {
    const target = e.target;
  
    if (target.id === "cpf") {
      target.value = target.value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
  
    if (target.id === "telefone") {
      target.value = target.value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d{4})$/, "$1-$2");
    }
  
    if (target.id === "cep") {
      target.value = target.value
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d{3})$/, "$1-$2");
    }
  });
  
  // Feedback visual para formulários
  const form = document.getElementById("form-cadastro");
  const feedback = document.getElementById("form-feedback");
  
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      // Verificação básica de consistência
      const nome = document.getElementById("nome").value.trim();
      const email = document.getElementById("email").value.trim();
      const cpf = document.getElementById("cpf").value.trim();
      const telefone = document.getElementById("telefone").value.trim();
      const nascimento = document.getElementById("nascimento").value;
      const cep = document.getElementById("cep").value.trim();
      const endereco = document.getElementById("endereco").value.trim();
      const cidade = document.getElementById("cidade").value.trim();
      const estado = document.getElementById("estado").value;
  
      let erros = [];
  
      if (nome.length < 3) erros.push("O nome deve ter pelo menos 3 caracteres.");
      if (!email.includes("@")) erros.push("Email inválido.");
      if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) erros.push("CPF inválido.");
      if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(telefone)) erros.push("Telefone inválido.");
      if (!nascimento) erros.push("Data de nascimento obrigatória.");
      if (!cep) erros.push("CEP obrigatório.");
      if (!endereco) erros.push("Endereço obrigatório.");
      if (!cidade) erros.push("Cidade obrigatória.");
      if (!estado) erros.push("Estado obrigatório.");
  
      // Limpa feedback anterior
      feedback.innerHTML = "";
  
      if (erros.length > 0) {
        feedback.innerHTML = erros
          .map(err => `<div class="alert alert-error">${err}</div>`)
          .join("");
      } else {
        // Sucesso
        feedback.innerHTML = `<div class="alert alert-success">Cadastro enviado com sucesso!</div>`;
  
        // Opcional: salvar no localStorage (simula persistência)
        const cadastro = { nome, email, cpf, telefone, nascimento, cep, endereco, cidade, estado };
        let cadastros = JSON.parse(localStorage.getItem("cadastros") || "[]");
        cadastros.push(cadastro);
        localStorage.setItem("cadastros", JSON.stringify(cadastros));
  
        // Limpa o formulário
        form.reset();
      }
    });
  }
  
  // SPA básico e templates
  
  // Função para carregar conteúdo dinamicamente
  function loadPage(page) {
    const main = document.getElementById("main");
    if (!main) return;
  
    fetch(page)
      .then(res => res.text())
      .then(html => {
        main.innerHTML = html;
      })
      .catch(err => {
        main.innerHTML = `<p class="alert alert-error">Erro ao carregar a página.</p>`;
        console.error(err);
      });
  }
  
  // Exemplo: uso de template para projeto
  function createProjectCard({ titulo, descricao, imagem }) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${imagem}" alt="${titulo}">
      <h3>${titulo}</h3>
      <p>${descricao}</p>
    `;
    return card;
  }
  
  // Menu hambúrguer mobile
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-header nav ul");
  
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }
  