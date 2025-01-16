const form = document.querySelector('form');
const fruitInput = document.getElementById('fruit-to-add');
const fruitsList = document.querySelector('.fruits');
const filterInput = document.getElementById('filter');

// Step 1: Add another input element for description
const descriptionInput = document.createElement('input');
descriptionInput.type = 'text';
descriptionInput.name = 'description';
descriptionInput.id = 'description'; // Updated id to "description"
descriptionInput.placeholder = 'Enter fruit description';
form.insertBefore(descriptionInput, form.querySelector('button'));

// Add fruit with description
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fruitName = fruitInput.value.trim();
    const fruitDescription = descriptionInput.value.trim();
    

    if (fruitName && fruitDescription) {
        const li = document.createElement('li');
        li.className = 'fruit';
        li.innerHTML = `${fruitName}<button class="delete-btn">x</button><p><i>${fruitDescription}</i></p>`;
        fruitsList.appendChild(li);

        // Clear inputs
        fruitInput.value = '';
        descriptionInput.value = '';
    }
});

// Delete fruit
fruitsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
    }
});

// Step 3: Filter fruits
filterInput.addEventListener('keyup', (e) => {
    const filterText = e.target.value.toLowerCase();
    const fruits = fruitsList.getElementsByClassName('fruit');

    for (let i = 0; i < fruits.length; i++) {
        const fruit = fruits[i];
        const fruitName = fruit.firstChild.textContent.toLowerCase();
        const fruitDescriptionElement = fruit.querySelector('p');
        const fruitDescription = fruitDescriptionElement ? fruitDescriptionElement.textContent.toLowerCase() : '';
        if (fruitName.includes(filterText) || fruitDescription.includes(filterText)) {
            fruit.style.display = '';
        } else {
            fruit.style.display = 'none';
        }
    }
});