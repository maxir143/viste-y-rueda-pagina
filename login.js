const urlAPI = 'https://viste-y-rueda-backend.herokuapp.com'
const usertoken = window.localStorage.getItem('loggedUser')
if (usertoken) {
    window.location.replace('admin.html')
}

const requestLogin = () => {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    fetch(`${urlAPI}/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then((response) => response.json())
    .then((user) => {
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
        window.location.replace('admin.html');
    })
}

document.getElementById('formSubmit').addEventListener('click', () => requestLogin() )
