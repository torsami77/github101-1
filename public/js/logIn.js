if(username !== ""){
    window.location.replace("userpage.html");
}

const logIn = () => {

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if(email.replace(/[^0-9A-Za-z\,]/g, "") === '' ){
        document.getElementById('info').innerHTML = `<p class="false" id="status">Email field can't be left empty</p>`;
        document.getElementById('email').focus();
        return;
    }

    if(password.replace(/[^0-9A-Za-z\,]/g, "") === '' ){
        document.getElementById('info').innerHTML = `<p class="false" id="status">Password field can't be left empty</p>`;
        document.getElementById('password').focus();
        return;
    }
let uri = 'http://localhost:5000/api/v1/auth/logIn';
let h = new Headers({'content-type': 'application/json'});
let body = {
    email: email,
    password: password,
}


let req = new Request(uri, {
    method: 'POST',
    headers: h,
    body:JSON.stringify(body)
});


fetch(req)
    .then((resp) => resp.json())
    .then((data) => {
     
        if(data.success === 'true'){
            window.location.replace("userpage.html");

        }else{
document.getElementById('info').innerHTML = `<p class="false" id="status">${data.message}</p>`;
        }
     
    });

}
