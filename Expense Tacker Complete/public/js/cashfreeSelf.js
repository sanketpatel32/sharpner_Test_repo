// const createOrder = require("../utils/cashfreeService");
const cashfree = Cashfree({
    mode: "Sandbox",
});

document.getElementById("renderBtn").addEventListener("click", async () => {
    try {
        const response = await axios.post("http://localhost:3000/pay/premium", {
            headers: { Authorization: `Bearer ${token}` }, // Send token in headers
        });

        let checkoutOptions = {
            paymentSessionId: response,
            redirectTarget: "_self",
        };
        cashfree.checkout(checkoutOptions);
    } catch (error) {
        console.error("An error occurred during the payment process:", error);
        alert("Something went wrong. Please try again later.");
    }
});