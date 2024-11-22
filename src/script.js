const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');
console.log(inputTransactionName) 
const form = document.querySelector('#form');
console.log(form); 
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const balanceDisplay = document.querySelector('#balance');
console.log({incomeDisplay, expenseDisplay, balanceDisplay});

const transactionUl = document.querySelector("#transactions");
console.log(transactionUl); 

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

const removeTransactions = ID => { 
  transactions = transactions.filter(transaction => transaction.id != ID);
  console.log(transactions);
  upDateLocalStorage();
  init();
}

const addTransactionIntoDOM = transaction => {

  const operator = transaction.amount < 0 ? '-' : '+';
  const CSSClass = transaction.amount < 0 ? "minus" : "plus";
  const amountWithoutOperator = Math.abs(transaction.amount);
  const li = document.createElement("li");

  li.classList.add(CSSClass);
  li.innerHTML = `${transaction.name} <span> ${operator}  R$ ${amountWithoutOperator}</span><button class="delete-btn" onclick= "removeTransaction(${transaction.id})">x</button>`; // feito por OsmarAmaral
  transactionUl.append(li);

  console.log(li); 
  console.log(operator); 

  {
   }
};

addTransactionIntoDOM(transactions[1]); 

const upDateBalanceValues = () => {
 const transactionsAmounts = transactions.map((transaction) => transaction.amount);
 console.log(transactionsAmounts);


const income = transactionsAmounts.filter((value) => value > 0).reduce((accumulator, value) => accumulator + value, 0).toFixed(2);
const expense = Math.abs (transactionsAmounts.filter((value) => value < 0 ). reduce((accumulator, value) => accumulator + value, 0)).toFixed(2);
console.log(expense); 
const total = transactionsAmounts.reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2);
console.log(income); 

balanceDisplay.textContent = `R$ ${total}`;
incomeDisplay.textContent = `R$ ${income}`;
expenseDisplay.textContent = `R$ ${expense}`;

}

const init = () => {
  transactionUl.innerHTML = ''; 
  transactions.forEach(addTransactionIntoDOM);
  upDateBalanceValues();
};

init();

const upDateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

const generateID = () => Math.round(Math.random()*1000); 

form.addEventListener('submit', event => {
  event.preventDefault();
  const transName = inputTransactionName.value.trim(); 
  const transAmount = inputTransactionAmount.value.trim(); 
  if(transName === '' || transAmount === '' ) {
    alert('Por gentileza preencha tanto o nome quanto o valor da transação!!!');
    return
  }
  const transaction = {
    id: generateID(), 
    name: transName, 
    amount: Number(transAmount) 
  }
  console.log(transaction); 

  transactions.push(transaction);

  init();

  upDateLocalStorage();

  inputTransactionAmount.value = ''; 
  inputTransactionName.value = ''; 
})