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

const checkPremiumUser = () => {
    axios.get(`${baseurl}/user/isPremium`, {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then((response) => {
            const isPremium = response.data.isPremium; // Assuming the API returns { isPremium: true/false }
            if (isPremium) {
                const renderBtn = document.getElementById("renderBtn");
                if (renderBtn) {
                    renderBtn.style.display = "none"; // Hide the "Pay Now" button
                }
                const premiumMessage = document.getElementById("premiumuser");
                if (premiumMessage) {
                    premiumMessage.textContent = "You are a premium user! Enjoy unlimited access to all features.";
                    premiumMessage.style.color = "green";
                }
                const container = document.getElementById("premiumuser_container");
                if(container) {
                    const showLeaderBoard = document.createElement("button");
                    showLeaderBoard.type = "button";
                    showLeaderBoard.textContent = "Show Leaderboard";
                    showLeaderBoard.onclick = () => {
                        axios.get(`${baseurl}/expense/leaderboard`)
                        .then((response) => {
                            const leaderboardData = response.data;
                            const leaderboardContainer = document.getElementById("leaderboard_container");
                            
                            // Clear previous leaderboard data
                            leaderboardContainer.innerHTML = "<h2>Leaderboard</h2>";
                            
                            // Create a table for the leaderboard
                            const table = document.createElement("table");
                            const headerRow = document.createElement("tr");
                            
                            const nameHeader = document.createElement("th");
                            nameHeader.textContent = "Name";
                            
                            const totalExpenseHeader = document.createElement("th");
                            totalExpenseHeader.textContent = "TotalExpense";
                            
                            headerRow.appendChild(nameHeader);
                            headerRow.appendChild(totalExpenseHeader);
                            table.appendChild(headerRow);
                            
                            // Populate the table with data
                            leaderboardData.forEach((user) => {
                                const row = document.createElement("tr");
                                
                                const nameCell = document.createElement("td");
                                nameCell.textContent = user.name;
                                
                                const totalExpenseCell = document.createElement("td");
                                totalExpenseCell.textContent = user.totalExpense;
                                
                                row.appendChild(nameCell);
                                row.appendChild(totalExpenseCell);
                                table.appendChild(row);
                            });
                            
                            leaderboardContainer.appendChild(table);
                            leaderboardContainer.style.display = "block"; // Show the leaderboard container
                        })
                        .catch((error) => {
                            console.error("Error fetching leaderboard data:", error);
                            alert("Failed to fetch leaderboard data. Please try again.");
                        });
                        
                    }
                    container.appendChild(showLeaderBoard);
                }
            }
            else {

            }
        })
        .catch((error) => {
            console.error("Error checking premium user status:", error);
            alert("Failed to check user status. Please try again.");
        });
};

// Fetch expenses on page load
window.onload = () => {
    fetchExpenses();
    checkPremiumUser(); // Check if the user is a premium user
};
