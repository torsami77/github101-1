const signUp = () => {
        
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let verify = document.getElementById('verify').value;

let uri = 'http://localhost:5000/api/v1/auth/signUp';
let h = new Headers({'content-type': 'application/json'});
let body = {
    username: username,
    email: email,
    password: password,
    verify: verify
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
            const info = `
            <div id="info">
            <p class="true" >${data.message}</p>
            </div>
            `;

            const loginform = `
            <div>
            <span>Log in</span>
            <p>Don't have an account? 
                <button class="link" onclick=memberForm('login')>Sign up here</button>
            </p>
            </div>
            <p><input type="email" name="email" id="email" placeholder="Enter your email" required /></p>
            <p><input type="password" name="password" id="password" placeholder="Create a password" required/></p>
            <p><button onclick=logIn()>Log in</button></p>
            `;

            const registered = info + loginform;
           
document.getElementById('member').innerHTML = registered;
        }else{
document.getElementById('info').innerHTML = `<p class="false" id="status">${data.message}</p>`;
document.getElementById(data.field).focus();
        }
     
    });

}
