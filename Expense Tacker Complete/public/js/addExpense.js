const baseurl = "http://127.0.0.1:3000";
const token = localStorage.getItem("token");

if (!token) {
    alert("You are not logged in! Please log in to continue.");
    window.location.href = "/login"; // Redirect to login if no token
}

// Fetch and display all expenses
const fetchExpenses = () => {
    axios.get(`${baseurl}/expense/getAll`, {
        headers: { Authorization: `Bearer ${token}` } // Send token in headers
    })
    .then((response) => {
        const expenses = response.data.expenses;
        const expenseList = document.getElementById("expense-list");

        // Clear the existing list
        expenseList.innerHTML = "";

        // Render each expense
        expenses.forEach((expense) => {
            const listItem = document.createElement("li");
            listItem.textContent = `Amount: ${expense.amount}, Description: ${expense.description}, Category: ${expense.category}`;

            // Create delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.style.marginLeft = "10px";
            deleteButton.onclick = () => deleteExpense(expense.id);

            // Append delete button to the list item
            listItem.appendChild(deleteButton);
            expenseList.appendChild(listItem);
        });
    })
    .catch((error) => {
        console.error("Error fetching expenses:", error);
        alert("Failed to fetch expenses. Please try again.");
    });
};

// Handle adding an expense
const handleAddExpense = (event) => {
    event.preventDefault();

    const amount = document.getElementById("amount").value.trim();
    const description = document.getElementById("description").value.trim();
    const category = document.getElementById("category").value;

    if (!amount || !description || !category) {
        alert("Please fill in all fields before submitting.");
        return;
    }

    const expense = { amount, description, category };

    axios.post(`${baseurl}/expense/add`, expense, {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
        document.getElementById("amount").value = "";
        document.getElementById("description").value = "";
        document.getElementById("category").value = "food"; // Reset category

        fetchExpenses();
    })
    .catch((error) => {
        console.error("Error adding expense:", error);
        alert("Failed to add expense. Please try again.");
    });
};

// Handle deleting an expense
const deleteExpense = (expenseId) => {
    axios.delete(`${baseurl}/expense/delete/${expenseId}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
        console.log("Expense deleted successfully:", response.data);
        fetchExpenses();
    })
    .catch((error) => {
        console.error("Error deleting expense:", error);
        alert("Failed to delete expense. Please try again.");
    });
};

// Fetch expenses on page load
window.onload = fetchExpenses;
