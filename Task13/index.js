function handleFormSubmit(event) {
    event.preventDefault();

    // const username = document.getElementById('username').value;
    // const email = document.getElementById('email').value;
    // const phone = document.getElementById('phone').value;

    const username = event.target.username.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;

    const userDetails = {
        username: username,
        email: email,
        phone: phone
    };


    localStorage.setItem(email, JSON.stringify(userDetails));

    displayUsers();
}

function displayUsers() {
    const userList = document.getElementById('list');
    userList.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        const email = localStorage.key(i);
        const user = JSON.parse(localStorage.getItem(email));
        const li = document.createElement('li');
        li.textContent = `${user.username}-${user.email}-${user.phone}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
            localStorage.removeItem(email);
            displayUsers();
        };

        li.appendChild(deleteButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function () {
            localStorage.removeItem(email);
            document.getElementById('username').value = user.username;
            document.getElementById('email').value = user.email;
            document.getElementById('phone').value = user.phone;
            displayUsers();
        };
        li.appendChild(editButton);
        userList.appendChild(li);
    }
}

document.addEventListener('DOMContentLoaded', displayUsers);

module.exports = handleFormSubmit;