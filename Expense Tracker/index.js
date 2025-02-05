function handleFormSubmit(event) {
    event.preventDefault();
    const description = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;

    const expense = {
        description: description,
        amount: amount,
        category: category
    };
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    localStorage.setItem('expenses', JSON.stringify([...expenses, expense]));

    event.target.reset();
    displayExpenses();
}

function displayExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const list = document.getElementById('list');
    list.innerHTML = '';

    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span>${expense.description} - ${expense.amount} - ${expense.category}</span>
            <div>
                <button class="btn btn-warning btn-sm mr-2" onclick="editExpense(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteExpense(${index})">Delete</button>
            </div>
        `;
        list.appendChild(li);
    });
}

function deleteExpense(index) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
}

function editExpense(index) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const expense = expenses[index];
    document.getElementById('description').value = expense.description;
    document.getElementById('amount').value = expense.amount;
    document.getElementById('category').value = expense.category;
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
}

// Initial call to display expenses on page load
document.addEventListener('DOMContentLoaded', displayExpenses);