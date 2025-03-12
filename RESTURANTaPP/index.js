let api = "https://crudcrud.com/api/6723c62fe6784bba8092c25779f09337"

document.addEventListener('DOMContentLoaded', () => {
    fetchOrders();
});

const handleFormSubmit = (e) => {
    e.preventDefault();
    let price = document.getElementById('price').value;
    let dish = document.getElementById('dish').value;
    let table = document.getElementById('table').value;

    let order = {
        price: price,
        dish: dish,
        table: table
    }
    axios.post(`${api}/orders`, order).
        then(res => {
            console.log(res.data)
            fetchOrders();
        })
        .catch(err => console.log(err))

}

const fetchOrders = () => {
    axios.get(`${api}/orders`)
        .then(res => {
            res.data.forEach(order => {
                addOrderToTable(order)
            })
        })
        .catch(err => console.log(err))
 }

 let addOrderToTable = (order) => {
    let tableElement = document.getElementById(order.table);
    let listItem = document.createElement('li');  
    listItem.textContent = `Dish: ${order.dish} - Table: ${order.table} - Price: ${order.price} - `;
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = ()=>{
        deleteOrder(order._id,listItem)
    }
    listItem.appendChild(deleteButton);
    tableElement.appendChild(listItem);

}

let deleteOrder = (id, listItem) => {
    axios.delete(`${api}/orders/${id}`)
        .then(res => {
            listItem.remove();
        })
        .catch(err => console.log(err))
    
}
