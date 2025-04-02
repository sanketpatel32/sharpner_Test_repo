const baseurl = "http://127.0.0.1:3000";

const handleUserLogin = async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const loginError = document.getElementById("loginError");

    // Clear previous error message
    loginError.textContent = "";

    const user = {
        email: email,
        password: password
    };

    try {
        const response = await axios.post(`${baseurl}/user/login`, user);
        if (response.status === 200) {
            console.log("User logged in successfully");
            window.location.href = "/"; // Redirect to the home page
        }
    } catch (error) {
        if (error.response) {
            // Handle specific HTTP status codes
            if (error.response.status === 404) {
                loginError.textContent = "User not found. Please check your email.";
            } else if (error.response.status === 401) {
                loginError.textContent = "Incorrect password. Please try again.";
            } else if (error.response.status === 500) {
                loginError.textContent = "Server error. Please try again later.";
            } else {
                loginError.textContent = error.response.data.error || "An unexpected error occurred.";
            }
        } else if (error.request) {
            // Handle no response from the server
            console.error("No response received:", error.request);
            loginError.textContent = "Unable to connect to the server. Please try again later.";
        } else {
            // Handle other errors
            console.error("Error logging in:", error.message);
            loginError.textContent = "An unexpected error occurred. Please try again.";
        }
    }
};