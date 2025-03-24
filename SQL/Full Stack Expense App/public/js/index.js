const apiUrl = "http://127.0.0.1:3000/expense"; 
let editingExpenseId = null;

async function handleFormSubmit(event) {
    event.preventDefault();
    const description = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;

    const expense = {
        description: description,
        amount: amount,
        category: category
    };

    try {
        if (editingExpenseId) {
            await axios.put(`${apiUrl}/edit/${editingExpenseId}`, expense);
            editingExpenseId = null;
        } else {
            await axios.post(`${apiUrl}/add`, expense);
        }
        event.target.reset();
        displayExpenses();
    } catch (error) {
        console.error('Error adding/updating expense:', error);
    }
}

async function displayExpenses() {
    try {
        const response = await axios.get(`${apiUrl}/getall`);
        const expenses = response.data;
        const list = document.getElementById('list');
        list.innerHTML = '';

        expenses.forEach(expense => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                <span>${expense.description} - ${expense.amount} - ${expense.category}</span>
                <div>
                    <button class="btn btn-warning btn-sm mr-2" onclick="editExpense(${expense.id})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteExpense(${expense.id})">Delete</button>
                </div>
            `;
            list.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching expenses:', error);
    }
}

async function deleteExpense(id) {
    try {
        await axios.delete(`${apiUrl}/delete/${id}`);
        displayExpenses();
    } catch (error) {
        console.error('Error deleting expense:', error);
    }
}

async function editExpense(id) {
    try {
        const response = await axios.get(`${apiUrl}/getall`);
        const expense = response.data.find(exp => exp.id === id);
        document.getElementById('description').value = expense.description;
        document.getElementById('amount').value = expense.amount;
        document.getElementById('category').value = expense.category;

        editingExpenseId = id;
    } catch (error) {
        console.error('Error editing expense:', error);
    }
}

// Initial call to display expenses on page load
document.addEventListener('DOMContentLoaded', displayExpenses);