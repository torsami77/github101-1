if(username === ""){
    window.location.replace("index.html");
}


let choosen = (qId, aId) => {

        let bearer = `Bearer ${token}`;
        
        let uri = `http://localhost:5000/api/v1/choosenanswer/${qId}/${aId}`;
        let h = new Headers({'content-type': 'application/json', 'authorization': bearer});
    
        
        let req = new Request(uri, {
            method: 'POST',
            headers: h,
        });
        
        fetch(req)
                .then((resp) => resp.json())
                .then((data) => {
                    
                    if(data.message === `Auth failed`){
                        alert('Inactive logging session, Kindly login or signup to cast your vote!');
                        window.location.replace("index.html");
                    }
                    if(data.success === `true`){
                        while(-1 < data.Alength){
                        document.getElementById(`choosen${qId}${data.Alength}`).innerHTML = `
                        <p class="important">Choose this answer</p>`;
                            data.Alength -= 1;
                        }
                        document.getElementById(`choosen${qId}${data.choosen}`).innerHTML = `
                        <p class="choosen">Choosen Answer'</p>`;
    
                    }
                }
            )
    }