function handleFormSubmit(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    const userDetails = {
        username: username,
        email: email,
        phone: phone
    };

    localStorage.setItem('User Details', JSON.stringify(userDetails));
}



module.exports = handleFormSubmit;