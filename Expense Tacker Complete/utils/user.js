let currentUserEmail = "sanpatel323@gmail.com"; // Variable to store the logged-in user's email

const setUserEmail = (email) => {
    currentUserEmail = email; // Set the email
};

const getUserEmail = () => {
    return currentUserEmail; // Get the email
};

module.exports = { setUserEmail, getUserEmail };