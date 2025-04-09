const baseurl = "http://127.0.0.1:3000";
const token = localStorage.getItem("token");

if (!token) {
    alert("You are not logged in! Please log in to continue.");
    window.location.href = "/login"; // Redirect to login if no token
}

// Fetch and display all expenses
const fetchExpenses = () => {
    axios.get(`${baseurl}/expense/getAll`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
        const expenses = response.data.expenses;
        const expenseList = document.getElementById("expense-list");

        // Build the HTML table layout
        expenseList.innerHTML = `
            <table id="expense-table" border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; font-family: sans-serif;">
                <thead style="background-color: #f0f0f0;">
                    <tr>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="expense-table-body"></tbody>
            </table>
        `;

        const tableBody = document.getElementById("expense-table-body");

        // Fill the table with expense data
        expenses.forEach((expense) => {
            const row = document.createElement("tr");

            const amountCell = document.createElement("td");
            amountCell.textContent = expense.amount;

            const descCell = document.createElement("td");
            descCell.textContent = expense.description;

            const categoryCell = document.createElement("td");
            categoryCell.textContent = expense.category;

            const actionCell = document.createElement("td");
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.style.backgroundColor = "#ff4d4d";
            deleteButton.style.color = "white";
            deleteButton.style.border = "none";
            deleteButton.style.padding = "5px 10px";
            deleteButton.style.cursor = "pointer";
            deleteButton.onclick = () => deleteExpense(expense.id);

            actionCell.appendChild(deleteButton);

            row.appendChild(amountCell);
            row.appendChild(descCell);
            row.appendChild(categoryCell);
            row.appendChild(actionCell);

            tableBody.appendChild(row);
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
        const isPremium = response.data.isPremium;
        if (isPremium) {
            const renderBtn = document.getElementById("renderBtn");
            if (renderBtn) {
                renderBtn.style.display = "none";
            }

            const premiumMessage = document.getElementById("premiumuser");
            if (premiumMessage) {
                premiumMessage.textContent = "🌟 You are a premium user! Enjoy unlimited access to all features.";
                premiumMessage.style.color = "green";
            }

            const container = document.getElementById("premiumuser_container");
            if (container) {
                const showLeaderBoard = document.createElement("button");
                showLeaderBoard.type = "button";
                showLeaderBoard.textContent = "Show Leaderboard";
                showLeaderBoard.style.marginTop = "15px";
                showLeaderBoard.style.padding = "8px 16px";
                showLeaderBoard.style.backgroundColor = "#4CAF50";
                showLeaderBoard.style.color = "white";
                showLeaderBoard.style.border = "none";
                showLeaderBoard.style.cursor = "pointer";

                showLeaderBoard.onclick = () => {
                    axios.get(`${baseurl}/expense/leaderboard`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                    .then((response) => {
                        const leaderboardData = response.data;
                        const leaderboardContainer = document.getElementById("leaderboard_container");

                        // Clear and set heading
                        leaderboardContainer.innerHTML = "<h2>Leaderboard</h2>";

                        // Create table
                        const table = document.createElement("table");
                        table.style.borderCollapse = "collapse";
                        table.style.width = "100%";
                        table.style.marginTop = "10px";
                        table.style.fontFamily = "sans-serif";

                        // Header row
                        const headerRow = document.createElement("tr");
                        headerRow.innerHTML = `
                            <th style="background-color:#f0f0f0; padding:10px; border:1px solid #ddd;">Name</th>
                            <th style="background-color:#f0f0f0; padding:10px; border:1px solid #ddd;">Total Expense</th>
                        `;
                        table.appendChild(headerRow);

                        // Data rows
                        leaderboardData.forEach(user => {
                            const row = document.createElement("tr");
                            row.innerHTML = `
                                <td style="padding:10px; border:1px solid #ddd;">${user.name}</td>
                                <td style="padding:10px; border:1px solid #ddd;">${user.totalExpense}</td>
                            `;
                            table.appendChild(row);
                        });

                        leaderboardContainer.appendChild(table);
                        leaderboardContainer.style.display = "block";
                    })
                    .catch((error) => {
                        console.error("Error fetching leaderboard data:", error);
                        alert("Failed to fetch leaderboard data. Please try again.");
                    });
                };

                container.appendChild(showLeaderBoard);
            }
            if(container){
                const downloadBtn = document.createElement("button");
                downloadBtn.type = "button";
                downloadBtn.textContent = "Download Expenses";
                downloadBtn.style.marginTop = "15px";
                downloadBtn.style.padding = "8px 16px";
                downloadBtn.style.backgroundColor = "#730316";
                downloadBtn.style.color = "white";
                downloadBtn.style.border = "none";
                downloadBtn.style.cursor = "pointer";
                console.log("Download Button Created");
                container.appendChild(downloadBtn);

            }

            
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
