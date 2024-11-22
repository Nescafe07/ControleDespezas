const transactionUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'))

let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => transaction.id !== ID)

    upDateBalanceValues()
    init()

}

function addTransactionIntoDOM(transaction) {
    const operator = transaction.amount < 0 ? "-" : "+"
    const CSSClass = transaction.amount < 0 ? "minus" : "plus"
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement("li")

    li.classList.add(CSSClass)
    li.innerHTML = `
        ${transaction.name}
        <span> ${operator} R$ ${amountWithoutOperator}</span>
        <button class="delete-btn" onclick = "removeTransaction(${transaction.id})">
            x
        </button>
  `
    transactionUl.append(li)

    {

    }
}


const getExpenses = transactionsAmounts => Math.abs(transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2);

const upDateBalanceValues = () => {
    const transactionsAmounts = transactions.map(transaction => transaction.amount
    );

    const total = transactionsAmounts.reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2)
    const income = transactionsAmounts
        .filter((value) => value > 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2);
    const expense = getExpenses(transactionsAmounts) 

    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
};

const init = () => {
    transactionUl.innerHTML = ''
    transactions.forEach(addTransactionIntoDOM);
    upDateBalanceValues();
};

init()

const upDateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}



const generateID = () => Math.round(Math.random() * 1000)

const addToTransactionsArray = (transName, transAmount) => {
    transactions.push(transaction = {
        id: generateID(),
        name: transName,
        amount: Number(transAmount)
    })
}

const cleanInputs = () => {
    inputTransactionAmount.value = ''
    inputTransactionName.value = ''
}
const handleFormSubmit = event => {
    event.preventDefault()
    const transName = inputTransactionName.value.trim()
    const transAmount = inputTransactionAmount.value.trim()
    const isSomeInputEmpaty = transName === '' || transAmount === ''

    if (isSomeInputEmpaty) {
        alert('Por gentileza preencha tanto o nome quanto o valor da transação!!!')
        return
    }
    addToTransactionsArray(transName, transAmount)

    init()

    upDateLocalStorage()

    cleanInputs();

}

form.addEventListener('submit', handleFormSubmit)