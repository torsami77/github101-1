
let commentSection ;

const signupform = `
<div id="info">
</div>
<div>
<span>Sign up</span>
<p>Already have an account? 
<button class="link" onclick=memberForm('signup')>Log in here</button>
</p>
</div>
<p><input type="text" name="username" id="username" placeholder="Create Username" required pattern="[a-z]{4,8}"/></p>
<p><input type="email" name="email" id="email" placeholder="Enter your email" required /></p>
<p><input type="password" name="password" id="password" placeholder="Create a password" required/></p>
<p><input type="password" name="verify" id="verify" placeholder="Verify your password" required /></p>
<p><button onclick='signUp()'>Sign up</button></p>
`;

const loginform = `
<div id="info">
</div>
<div>
<span>Log in</span>
<p>Don't have an account? 
    <button class="link" onclick=memberForm('login')>Sign up here</button>
</p>
</div>
<p><input type="email" name="email" id="email" placeholder="Enter your email" required /></p>
<p><input type="password" name="password" id="password" placeholder="Create a password" required/></p>
<p><button onclick=logIn()>Log in</button></p>
<p class="link">Forgot password? Click here</p>
`;

const memberForm = (status) => {

let form;

    if(status === 'login'){
        form = signupform;
    }else{
        form = loginform;
    }

document.getElementById('member').innerHTML = form;
}


const validateForm=()=> {
    const x = document.forms["myForm"]["textCheck"].value;
    if (x.replace(/^\s+|\s+$/, "") == "") {
        alert("Enter a vaid input ");
        return false;
    }
}

const logOut = () => {
    
}