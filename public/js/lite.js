
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
<form onsubmit="return signUp();">
<p><input type="text" name="username" id="username" class="input-field" placeholder="Create Username" autofocus required pattern="[a-z]{4,8}"/></p>
<p><input type="email" name="email" id="email" class="input-field" placeholder="Enter your email" required /></p>
<p><input type="password" name="password" id="password" class="input-field" placeholder="Create a password" required/></p>
<p><input type="password" name="verify" id="verify" class="input-field" placeholder="Verify your password" required /></p>
<p><button onclick='signUp()'>Sign up</button></p>
</form>
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
<form onsubmit="return logIn();">
    <p><input type="email" name="email" id="email" class="input-field" placeholder="Enter your email" autofocus required /></p>
    <p><input type="password" name="password" id="password" class="input-field" placeholder="Create a password" required/></p>
    <p><button type="submit" onclick=logIn()>Log in</button></p>
</form>
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

let IS_DEV_MODE = false;


const URL = IS_DEV_MODE
  ? 'http://localhost:5000'
  : 'https://github101.herokuapp.com';
