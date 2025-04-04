// const Cashfree  = require("cashfree-pg");
// const {Cashfree} = require("cashfree-pg");
const{ Cashfree }  = require("cashfree-pg"); 


Cashfree.XClientId = "TEST430329ae80e0f32e41a393d78b923034";
Cashfree.XClientSecret = "TESTaf195616268bd6202eeb3bf8dc458956e7192a85";
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

// Cashfree.XEnvironment = "SANDBOX";

const createOrder = async (
    orderId = "devstudio_7313898506485500241",
    orderAmount = 1.00,
    orderCurrency = "INR",
    customerId = "devstudio_user",
    customerPhone = "8474090589"
) => {
    try {
        const expiryDate = new Date(Date.now() + 5 * 60 * 1000).toISOString();
        const formattedExpiryDate = expiryDate; // Fixed: Removed redundant .toISOString()
        const request = {
            order_amount: orderAmount,
            order_currency: orderCurrency,
            order_id: orderId,
            customer_details: {
                customer_id: customerId,
                customer_phone: customerPhone
            },
            order_meta: {
                return_url: "https://www.cashfree.com/devstudio/preview/pg/web/checkout?order_id={order_id}"
            },
            expiryDate: formattedExpiryDate,
        };
        const response = await Cashfree.PGCreateOrder("2023-08-01", request);
        return response.data.payment_session_id;

    } catch (error) {
        console.error('Error creating order:', error.response?.data?.message || error.message);
        throw error;
    }
};

module.exports = { createOrder };