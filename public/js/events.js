/*
let logInEnter = document.getElementById("password");
logInEnter.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("login").click();
  }
});
*/

document.addEventListener("keyup", (event) => {
  

  if (event.keyCode === 13) {
   event.preventDefault();
    if (document.querySelector("#password") && (!document.querySelector("#verify"))) {
        document.querySelector("#login").click();
    }

    if (document.querySelector("#verify")) {
        document.querySelector("#signup").click();
    }

    if (event.target.id !== "postQuestion") {
        document.querySelector("#addcomment").click();
        return false;
    }

    if (event.target.id === "postQuestion") {
        document.querySelector("#submitQuestion").click();
        return false;
    }
  
  }
});
