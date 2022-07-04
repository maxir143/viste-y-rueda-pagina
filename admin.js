const urlAPI = 'https://viste-y-rueda-backend.herokuapp.com'

const userToken = JSON.parse(window.localStorage.getItem('loggedUser'))
const { token, username } = userToken

if (!token) {
    window.location.replace('/login.html');
}

const idLoginValid = (token) =>{
    fetch(`${urlAPI}/users/${username}`)
    .then((response) => {
        console.log(response)
    })
}