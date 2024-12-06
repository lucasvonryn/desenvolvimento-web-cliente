const tbody = document.querySelector("tbody");
const descItem = document.querySelector("#desc");
const amount = document.querySelector("#amount");
const type = document.querySelector("#type");
const btnNew = document.querySelector("#btnNew");

const incomes = document.querySelector(".incomes");
const expenses = document.querySelector(".expenses");
const total = document.querySelector(".total");

const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

if (!usuarioLogado) {
  alert("Você precisa estar logado para acessar esta página.");
  window.location.href = "/Projeto02/Login/login.html";
}

const usuarioEmail = usuarioLogado.email;  

let items = [];

btnNew.onclick = () => {
  if (descItem.value === "" || amount.value === "" || type.value === "") {
    return alert("Preencha todos os campos!");
  }

  const item = {
    desc: descItem.value,
    amount: Math.abs(amount.value).toFixed(2),
    type: type.value,
    user: usuarioEmail,
  };

  items = getItensBD(usuarioEmail);

  items.push(item);

  setItensBD(usuarioEmail, items);

  loadItens();

  descItem.value = "";
  amount.value = "";
};

function deleteItem(index) {
  items.splice(index, 1);
  setItensBD(usuarioEmail, items);
  loadItens();
}

function insertItem(item, index) {
  let tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${item.desc}</td>
    <td>R$ ${item.amount}</td>
    <td class="columnType">${item.type === "Entrada" ? '<i class="fa-solid fa-circle-arrow-up" style="color: #63E6BE;"></i>' : '<i class="fa-solid fa-circle-arrow-down" style="color: #ea3939;"></i>'}</td>
    <td class="columnAction">
      <button onclick="deleteItem(${index})"><i class="fas fa-trash"></i></button>
    </td>
  `;

  tbody.appendChild(tr);
}

function loadItens() {
  items = getItensBD(usuarioEmail);
  tbody.innerHTML = ""; 
  items.forEach((item, index) => {
    insertItem(item, index);
  });
  getTotals();
}

function getTotals() {
  const amountIncomes = items.filter(item => item.type === "Entrada").map(item => Number(item.amount));
  const amountExpenses = items.filter(item => item.type === "Saída").map(item => Number(item.amount));

  const totalIncomes = amountIncomes.reduce((acc, cur) => acc + cur, 0).toFixed(2);
  const totalExpenses = Math.abs(amountExpenses.reduce((acc, cur) => acc + cur, 0)).toFixed(2);
  const totalItems = (totalIncomes - totalExpenses).toFixed(2);

  incomes.innerHTML = totalIncomes;
  expenses.innerHTML = totalExpenses;
  total.innerHTML = totalItems;
}

const getItensBD = (email) => {
  const data = JSON.parse(localStorage.getItem(`db_items_${email}`));
  return data ? data : [];
};

const setItensBD = (email, items) => {
  localStorage.setItem(`db_items_${email}`, JSON.stringify(items));
};

loadItens();
