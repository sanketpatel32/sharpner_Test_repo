const baseurl = "http://127.0.0.1:3000";

const handleUserSingup = async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;   
    const password = document.getElementById("password").value;

    const user = {
        name: name,
        email: email,
        password: password
    }
    axios.post(`${baseurl}/user/singup`, user).then((response) => {
        console.log(response.data)
    }).catch((error) => {
        console.log(error)
    }   )
}