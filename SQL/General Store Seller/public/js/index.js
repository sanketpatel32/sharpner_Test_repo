document.getElementById('itemForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;

    axios.post('http://127.0.0.1:3000/items/addItem', {
        name: name,
        description: description,
        price: price,
        quantity: quantity
    })
    .then(function(response) {
        console.log('Item added:', response.data);
        fetchItems(); // Fetch the updated list of items
        clearForm();
    })
    .catch(function(error) {
        console.error('Error adding item:', error);
    });
});

function addItemToList(item) {
    const container = document.querySelector('.container');
    const itemDiv = document.createElement('div');
    itemDiv.innerHTML = `
        ${item.name} -- ${item.description} -- ${item.price}Rs -- ${item.quantity} --
        <button onclick="buyItem(${item.id}, 1)">Buy 1</button>
        <button onclick="buyItem(${item.id}, 2)">Buy 2</button>
        <button onclick="buyItem(${item.id}, 3)">Buy 3</button>
        
    `;
    container.appendChild(itemDiv);
    container.appendChild(document.createElement('br'));
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('description').value = '';
    document.getElementById('price').value = '';
    document.getElementById('quantity').value = '';
}

function fetchItems() {
    axios.get('http://127.0.0.1:3000/items/getItem')
    .then(function(response) {
        const container = document.querySelector('.container');
        container.innerHTML = ''; // Clear the container before appending items
        response.data.forEach(item => addItemToList(item));
    })
    .catch(function(error) {
        console.error('Error fetching items:', error);
    });
}

function buyItem(itemId, amount) {
    axios.put(`http://127.0.0.1:3000/items/remove/${itemId}/${amount}`)
    .then(function(response) {
        console.log('Item bought:', response.data);
        fetchItems(); // Fetch the updated list of items
    })
    .catch(function(error) {
        console.error('Error buying item:', error);
    });
}

// Fetch items when the page loads
window.onload = fetchItems;