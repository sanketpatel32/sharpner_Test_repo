
// Api so that we can change it whenever the links expire
// https://crudcrud.com/

let apiUrl = "https://crudcrud.com/api/d092dec870b64fdf8f565b9738e5bd2e";

//To load the content of the page after Dom is loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchOrders();
});

//To handle the form submission
let handleFormSubmit = (e) => {
    e.preventDefault();

    let price = document.getElementById('price').value;
    let dish = document.getElementById('dish').value;
    let table = document.getElementById('table').value;

    let order = {
        price: price,
        dish: dish,
        table: table
    };

    // axios.post(`${apiUrl}/orders`, order)
    //     .then(response => {
    //         console.log('Success:', response.data);
    //         addOrderToTable(response.data);
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });

    async function  postRequest() {
        try {
        let response = await axios.post(`${apiUrl}/orders`, order)   
            console.log('Success:', response.data);
            addOrderToTable(response.data)
            
        }
        catch {
            error => {
                console.error('Error:', error);
            }
        }
    }
    postRequest();
        
};

// Fetching the orders from the api
let fetchOrders = () => {
    axios.get(`${apiUrl}/orders`)
        .then(response => {
            response.data.forEach(order => {
                addOrderToTable(order);
            });
        })
        .catch(error => {
            console.error('Error fetching orders:', error);
        });
};

// Adding the order to the table
let addOrderToTable = (order) => {
    let tableElement = document.getElementById(order.table);
    let listItem = document.createElement('li');
    listItem.textContent = `Dish: ${order.dish} - Table: ${order.table} - Price: ${order.price} - `;

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => {
        deleteOrder(order._id, listItem);
    };

    listItem.appendChild(deleteButton);
    tableElement.appendChild(listItem);
};

// Deleting the order
let deleteOrder = (orderId, listItem) => {
    axios.delete(`${apiUrl}/orders/${orderId}`)
        .then(response => {
            console.log('Order deleted:', response.data);
            listItem.remove();
        })
        .catch(error => {
            console.error('Error deleting order:', error);
        });
};