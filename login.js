const requestLogin = () => {
    const user = document.getElementById('username').value
    const pass = document.getElementById('password').value
    if (user && pass) {
        console.log(user, pass)
    }
}

document.getElementById('formSubmit').addEventListener('click', () => requestLogin() )
