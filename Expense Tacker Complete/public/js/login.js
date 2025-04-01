const baseurl = "http://127.0.0.1:3000";

const handleUserLogin = async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const loginError = document.getElementById("loginError");

    // Clear previous error message
    loginError.textContent = "";

    // Validate input fields
    if (!email || !password) {
        loginError.textContent = "Please fill in all fields.";
        return;
    }

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
            if (error.response.status === 401) {
                loginError.textContent = "Invalid credentials. Please try again.";
            } else if (error.response.status === 500) {
                loginError.textContent = "Server error. Please try again later.";
            } else {
                loginError.textContent = error.response.data.message || "An unexpected error occurred.";
            }
        } else {
            console.error("Error logging in:", error);
            loginError.textContent = "An unexpected error occurred. Please try again.";
        }
    }
};