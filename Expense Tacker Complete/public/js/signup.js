const baseurl = "http://127.0.0.1:3000";

const handleUserSignup = async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const signupError = document.getElementById("signupError");

    const user = {
        name: name,
        email: email,
        password: password
    };

    try {
        const response = await axios.post(`${baseurl}/user/signup`, user);
        if (response.status === 201) {
            console.log("User created successfully");
            window.location.href = "/"; 
        }
    } catch (error) {
        if (error.response) {
            // Handle specific HTTP status codes
            if (error.response.status === 409) {
                signupError.textContent = "Signup failed: User already exists.";
            } else if (error.response.status === 500) {
                signupError.textContent = "Server error. Please try again later.";
            } else {
                signupError.textContent = error.response.data.message || "An unexpected error occurred.";
            }
        } else {
            console.error("Error signing up user:", error);
            signupError.textContent = "An unexpected error occurred. Please try again.";
        }
    }
};
