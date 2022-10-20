const form = document.querySelector("#form");
const list = document.querySelector("#list");
const income = document.querySelector("#money-plus");
const expense = document.querySelector("#money-minus");
const balance = document.querySelector("#balance");

let transactions = [];

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.querySelector("#text").value;
  const amount = document.querySelector("#amount").value;
  if (name.trim() !== "" && amount.trim() !== "") {
    let transaction = {
      name: name,
      amount: +amount,
      id: new Date().getTime(),
    };

    transactions.push(transaction);
    addTransaction();
    modifyBalance(transactions);
    event.target.reset();
  } else {
    alert("All felds must be filled");
  }
});

list.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    const dataId = event.target.parentElement.dataset.id;
    deleteTransaction(dataId);
    modifyBalance(transactions);
  }
});

const modifyBalance = (array) => {
  let incomeCount = 0;
  let expenseCount = 0;
  let sum = 0;
  array.forEach((el) => {
    sum += el.amount;
    if (el.amount >= 0) {
      incomeCount += el.amount;
    } else {
      expenseCount -= el.amount;
    }

    income.innerHTML = incomeCount !== 0 ? `+$${incomeCount}` : `+$${incomeCount}.00`;
    expense.innerHTML =
      expenseCount !== 0 ? `-$${Math.abs(expenseCount)}` : `-$${Math.abs(expenseCount)}.00`;
  });

  if (array.length === 0) {
    income.innerHTML = "+$0.00";
    expense.innerHTML = "-$0.00";
    balance.innerHTML = "$0.00";
  }

  balance.innerHTML = sum >= 0 ? `$${sum}` : `-$${Math.abs(sum)}`;
};

const addTransaction = () => {
  const result = transactions.map((el) => {
    let className;
    let amount;
    if (el.amount >= 0) {
      className = "plus";
      amount = `$${el.amount}`;
    } else {
      className = "minus";
      amount = `-$${Math.abs(el.amount)}`;
    }

    return `<li class=${className} data-id=${+el.id}>${el.name} <span>${amount}</span>
    <button class="delete-btn">x</button></li>
        `;
  });
  list.innerHTML = result.join("");
};

const deleteTransaction = (id) => {
  const newList = transactions.filter((el) => +el.id != id);
  transactions = newList;
  console.log(transactions);
  addTransaction();
};
