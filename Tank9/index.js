const form = document.querySelector('form');
const fruits = document.querySelector('.fruits');
const allFruits = document.querySelectorAll('.fruit');

const editBtn = document.createElement('Edit')
const editBtnText = document.createTextNode('Edit');
editBtn.appendChild(editBtnText);
editBtn.className = 'edit-btn';

allFruits.forEach(fruit => {
    fruit.appendChild(editBtn.cloneNode(true));
})

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const fruitToAdd = document.getElementById('fruit-to-add')
    const newLi = document.createElement('li');
    const newLiText = document.createTextNode(fruitToAdd.value);
    newLi.appendChild(newLiText);
    newLi.className = "fruit";

    const deleteBtn = document.createElement('button');
    const deleteButtonText = document.createTextNode('x');
    deleteBtn.appendChild(deleteButtonText);
    deleteBtn.className = 'delete-btn';
    newLi.appendChild(deleteBtn);

    const editBtn = document.createElement('button')
    const editBtnText = document.createTextNode('Edit');
    editBtn.appendChild(editBtnText);
    editBtn.className = 'edit-btn';
    newLi.appendChild(editBtn);

    fruits.appendChild(newLi);
});

fruits.addEventListener('click', (event) => {
    if (event.target.className === 'delete-btn') {
        fruits.removeChild(event.target.parentElement);
    }
});
