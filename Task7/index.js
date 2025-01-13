const subHeading = document.createElement('h3');

const textNode = document.createTextNode('Buy high quality organic fruits online')

subHeading.appendChild(textNode);

const divs = document.getElementsByTagName('div');

divs[0].appendChild(subHeading);

subHeading.style.fontStyle = 'italic';

const fruitNumber= document.createElement('p');
const fruitNode = document.createTextNode('Total fruits: 4');
fruitNumber.appendChild(fruitNode);
const fruit = document.getElementById('fruits');
divs[1].insertBefore(fruitNumber, fruit);

fruitNumber.id = 'fruits-total'





