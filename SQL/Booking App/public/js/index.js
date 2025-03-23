let apiUrl = "http://127.0.0.1:3000/user";

//To load the content of the page after Dom is loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
});

//To handle the form submission
let handleFormSubmit = async (e) => {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;

    let user = {
        username: username,
        email: email,
        phone: phone
    };

    try {
        let response = await axios.post(`${apiUrl}/add`, user);
        addUserToTable(response.data.user || response.data);
        // Reset the form
        document.getElementById('userForm').reset();
    } catch (error) {
        console.error('Error:', error);
    }
};

// Fetching the users from the api
let fetchUsers = async () => {
    try {
        let response = await axios.get(`${apiUrl}/getAll`);
        response.data.forEach(user => {
            addUserToTable(user);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

// Adding the user to the table
let addUserToTable = (user) => {
    let tableElement = document.getElementById('userTable');
    let listItem = document.createElement('li');
    listItem.textContent = `Username: ${user.username} - Phone: ${user.phone} - Email: ${user.email} - `;

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => {
        deleteUser(user.id, listItem);
    };

    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => {
        editUser(user, listItem);
    };

    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
    tableElement.appendChild(listItem);
};

// Deleting the user
let deleteUser = async (userId, listItem) => {
    try {
        let response = await axios.delete(`${apiUrl}/delete/${userId}`);
        listItem.remove();
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};

// Editing the user
let editUser = (user, listItem) => {
    document.getElementById('username').value = user.username;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phone;

    // Remove the user from the list
    listItem.remove();

    // Change the submit button text to "Update"
    let submitButton = document.querySelector('button[type="submit"]');
    submitButton.textContent = 'Update';
    submitButton.onclick = async (e) => {
        e.preventDefault();
        let updatedUser = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        };

        try {
            // Update the user in the database
            let response = await axios.put(`${apiUrl}/edit/${user.id}`, updatedUser);

            // Reload the users list
            document.getElementById('userTable').innerHTML = '';
            fetchUsers();

            // Reset the form and button text
            document.getElementById('userForm').reset();
            submitButton.textContent = 'Submit';
            submitButton.onclick = handleFormSubmit;
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
};