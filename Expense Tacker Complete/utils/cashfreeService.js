
const { Cashfree } = require("cashfree-pg");
const { or } = require("sequelize");

Cashfree.XClientId = "TEST430329ae80e0f32e41a393d78b923034";
Cashfree.XClientSecret = "TESTaf195616268bd6202eeb3bf8dc458956e7192a85";
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

orderId, orderAmount, orderCurrency, customerId, customerPhone
exports.createOrder = async (

    orderId,
    orderAmount,
    orderCurrency = "INR",
    customerId,
    customerPhone
) => {
    try {
        const expiryDate = new Date(Date.now() + 5 * 60 * 1000).toISOString();
        const formattedExpiryDate = expiryDate.toISOString();
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
            }
        };
        const response = await Cashfree.PGCreateOrder("2023-08-01", request);
        return response.data.payment_session_id;

    }
    catch (error) {
        console.error('Error creating order:', error.response.data.message);
        throw error;
    }
}


// var request = {
//     "order_amount": 1.00,
//     "order_currency": "INR",
//     "order_id": "devstudio_7313898506485500241",
//     "customer_details": {
//         "customer_id": "devstudio_user",
//         "customer_phone": "8474090589"
//     },
//     "order_meta": {
//         "return_url": "https://www.cashfree.com/devstudio/preview/pg/web/checkout?order_id={order_id}"
//     }
// };

// Cashfree.PGCreateOrder("2025-01-01", request).then((response) => {
//     console.log('Order created successfully:',response.data);
// }).catch((error) => {
//     console.error('Error:', error.response.data.message);
// });