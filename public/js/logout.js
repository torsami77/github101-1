const logOut = () => {
    let uri = `${URL}/api/v1/auth/logOut`;
    let h = new Headers({'content-type': 'application/json'});


let req = new Request(uri, {
    headers: h,
    method: 'POST'
});


fetch(req)
    .then((resp) => resp.json())
    .then((data) => {
     
        if(data.success === 'true'){
            window.location.replace("index.html");

        }
    })

}