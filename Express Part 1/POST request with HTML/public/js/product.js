const submitHandler = (e) =>{
    e.preventDefault();
    const products = e.target.productName.value;
    
    const obj = {
        "productName" : products
    }
    axios.post("http://localhost:4000/products",obj)
    .then((response) => {
        console.log(response.data.value); 
    })
    .catch((error) => {
        console.log(error);
    })
    
    }