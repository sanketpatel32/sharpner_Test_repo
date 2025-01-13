// Write your code below:
const var1 = document.getElementById("main-heading");
// 1st change
var1.textContent = "Fruit World";
// // 2nd change
var1.style.fontColor = "orange";

const var2 = document.getElementById("header");
// 3rd change
var2.style.backgroundColor = "green";
// 4th change
var2.style.borderBottom = '2px solid orange'


const var3 = document.getElementById("basket-heading");
// 5th change
var3.style.color = "green";

const var4 = document.getElementById("thanks");
var para = document.createElement("p");
para.textContent =  "Please visit us again";
// 6th change
var4.appendChild(para);
