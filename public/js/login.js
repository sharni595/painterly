async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#signup-username').value.trim();
    const email = document.querySelector("#signup-email").value.trim();
    const password = document.querySelector('#signup-password').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('success');
            const success = document.createElement("p")
            success.innerHTML = 'Sign up successful!';
            document.querySelector('#success-message').appendChild(success);
            setTimeout(function(){
                document.location.reload();
            }, 2000);
        } else {
            const error = document.createElement("p")
            error.innerHTML = 'Something went wrong. Make sure all areas are filled and password is at least 6 characters.';
            document.querySelector('#success-message').appendChild(error);
            //alert(response.statusText);
        }
    } else {
        const error = document.createElement("p")
        error.innerHTML = 'Something went wrong. Make sure all areas are filled and password is at least 6 characters.';
        document.querySelector('#success-message').appendChild(error);
    }
}

async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            const error = document.createElement("p")
            error.innerHTML = 'Incorrect email or password! Try again.';
            document.querySelector('#login-error').appendChild(error);
        }
    }
}

document.querySelector('#sign-up').addEventListener('submit', signupFormHandler);
document.querySelector('#login').addEventListener('submit', loginFormHandler);