// script.js

let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let products = JSON.parse(localStorage.getItem('products')) || [];

// Função para mostrar a tela de login
function showLogin() {
  document.getElementById('login-section').style.display = 'block';
  document.getElementById('register-section').style.display = 'none';
  document.getElementById('product-section').style.display = 'none';
}

// Função para mostrar a tela de cadastro
function showRegister() {
  document.getElementById('login-section').style.display = 'none';
  document.getElementById('register-section').style.display = 'block';
  document.getElementById('product-section').style.display = 'none';
}

// Função para registrar um novo usuário
function register() {
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  if (name && email && password) {
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Usuário cadastrado com sucesso!');
    showLogin();
  } else {
    alert('Por favor, preencha todos os campos!');
  }
}

// Função para fazer login
function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    showProductSection();
  } else {
    alert('E-mail ou senha incorretos!');
  }
}

// Função para mostrar a tela de cadastro de produtos
function showProductSection() {
  document.getElementById('login-section').style.display = 'none';
  document.getElementById('register-section').style.display = 'none';
  document.getElementById('product-section').style.display = 'block';
  renderProductList();
}

// Função para cadastrar um produto
function registerProduct() {
  const name = document.getElementById('product-name').value;
  const description = document.getElementById('product-description').value;
  const price = parseFloat(document.getElementById('product-price').value);

  if (name && description && !isNaN(price)) {
    products.push({ name, description, price });
    localStorage.setItem('products', JSON.stringify(products));
    renderProductList();
    alert('Produto cadastrado com sucesso!');
  } else {
    alert('Por favor, preencha todos os campos!');
  }
}

// Função para renderizar a lista de produtos
function renderProductList() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  products.forEach((product, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${product.name} - ${product.description} - R$${product.price.toFixed(2)}`;
    
    // Adicionar o botão de excluir
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Excluir';
    deleteButton.onclick = () => deleteProduct(index);
    
    li.appendChild(deleteButton);
    productList.appendChild(li);
  });
}

// Função para excluir um produto
function deleteProduct(index) {
  products.splice(index, 1);  // Remove o produto da lista
  localStorage.setItem('products', JSON.stringify(products));  // Atualiza o localStorage
  renderProductList();  // Re-renderiza a lista de produtos
}

// Função para fazer logout
function logout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  showLogin();
}

// Iniciar a tela de login
if (!currentUser) {
  showLogin();
}

