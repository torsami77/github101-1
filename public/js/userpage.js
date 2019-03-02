let getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

const token = getCookie('token');
let username = getCookie('username');
let ansContributed = getCookie('answers');

overFlowingQuestions();




let postQuestion = () => {
    let postedQ = document.getElementById('postQuestion').value;
    
    if(postedQ.replace(/[^0-9A-Za-z\,]/g, "") === ''){
        document.getElementById('info').innerHTML = `<p class="false" id="status">Field can't be left empty</p>`;
        document.getElementById('postQuestion').focus();
    }else{


let bearer = `Bearer ${token}`;


let uri = 'http://localhost:5000/api/v1/questions';
let h = new Headers({'content-type': 'application/json', 'authorization': bearer});
let body = {
    questions: postedQ,
    username: username
}

let req = new Request(uri, {
    method: 'POST',
    headers: h,
    body:JSON.stringify(body)
});

fetch(req)
        .then((resp) => resp.json())
        .then((data) => {
            if(data.success === 'false'){
                alert('Your login session has expired, you will need to login again')
                window.location.replace("index.html");
            }else{
                document.getElementById('info').innerHTML = `<p class="true" >${data.message}</p>`;
           
                const el = document.getElementById('overflowing'),
                elChild = document.createElement('div');
                elChild.innerHTML = `<div class="question" id="question${data.id}">
                <div>
                    <div class="question-status">
                        <p><strong id="answers${data.id}">0</strong></br><a href="#"><img  class="icons" src="images/comment.png"/></a></p>
                    </div>
                    <div class="question-status">
                        <p><strong id="votes${data.id}">0</strong></br><a href="#"><img  class="icons" src="images/votes.jpg"/></a></p>
                    </div>
                    <div class="question-status">
                        <p><strong id="views${data.id}">0</strong></br><a href="#"><img  class="icons" src="images/view.png"/></a></p>
                    </div>
                </div>
                <div class="cursor" onClick="showAnswers(${data.id})">
                    <strong>${username}</strong>
                    <p id="q1">
                        ----- ${postedQ} 
                    </p>
                    <p class="timing-details">
                            Just now
                    </p>
                </div>
                <div id="answersDiv${data.id}">
                </div>
                </div>`;
                
                el.prepend(elChild);            
            }
           })


    }
    document.getElementById('postQuestion').value = '';
    document.getElementById('asked').innerHTML = Number(document.getElementById('asked').innerHTML)+1 ;
}



let showAnswers = (questionId) => {

    if(username === ''){
    commentSection = `<div>
    <p class="important">You must be logged in to contribute, </br>either sign up or log in on the member area</p>
    `}else{
        commentSection = `
        <p>
        <textarea id="comment${questionId}" rows="10" cols="40" placeholder="Add comment to this thread..." required></textarea>
        </p>
        <p><button onClick="addComment(${questionId})">Add comment</button></p>
        </form>
    </div></div>`;
    }
    
    
    
    if(document.getElementById(`answersDiv${questionId}`).innerHTML.replace(/[^0-9A-Za-z\,]/g, "") === ''){

    let uri = `http://localhost:5000/api/v1/questions/${questionId}`;
    let h = new Headers({'content-type': 'application/json'});
 
    
    let req = new Request(uri, {
        method: 'GET',
        headers: h
    });
    
    fetch(req)
            .then((resp) => resp.json())
            .then((data) => {
                
                let allAnswers = `<div class="ques-with-ans" ><div id="allAnswers${questionId}">`;
                let ans;
                let answersArray;
                if(data.questionData.answers.length === 1){
                    
                         ans = JSON.parse(data.questionData.answers);
                         let thumpsDown = 'downvote.jpg';
                         let thumpsUp = 'upvote.jpg';
                         if(ans.upVotes.includes(username)){
                             thumpsUp = 'upvoted.jpg';
                         }
                         if(ans.downVotes.includes(username)){
                             thumpsDown = 'downvoted.jpg';
                         }

                         if(data.questionData.username === username){
                         if(ans.choosen === 'choosen')
                         {choosenText = '<p class="choosen">Choosen Answer</p>';}
                         else{choosenText = '<p class="important">Choose this answer</p>';}
                         }else{
                             choosenText = '';
                         }



                        allAnswers += `
                        <div class="ans-for-ques">
                        <div>
                        <p>
                        <strong>${ans.user}</strong>
                        </p>
                        </div>
                        <p id="answerId0">
                        ${ans.answer}
                        </p>
                        <div>
        
                        <div class="answer-status">${timeDifference(ans.time)}</div> 
                        <div class="answer-status" id="down${questionId}${0}" onClick="voteDown(${questionId}, ${0})">
                        <img  class="icons" src="images/${thumpsDown}"/></br>${ans.downVotes.length}
                        </div>
                        <div class="answer-status" id="up${questionId}${0}" onClick="voteUp(${questionId}, ${0})">
                        <img  class="icons" src="images/${thumpsUp}"/></br>${ans.upVotes.length}
                        </div>
                        <div class="answer-status" id="choosen${questionId}${0}" onClick="choosen(${questionId}, ${0})">
                        ${choosenText}
                        </div>
        
                        </p>
                        </div>
                        </div>
                `;

                }else if(data.questionData.answers.length > 1){
                    let i = 0;
                    answersArray = data.questionData.answers;
                    answersArray.forEach(ansToParse => {
                    
                        ans = JSON.parse(ansToParse);
                       
                        let thumpsDown = 'downvote.jpg';
                        let thumpsUp = 'upvote.jpg';
                        if(ans.upVotes.includes(username)){
                            thumpsUp = 'upvoted.jpg';
                        }
                        if(ans.downVotes.includes(username)){
                            thumpsDown = 'downvoted.jpg';
                        }
                        if(data.questionData.username === username){
                            if(ans.choosen === 'choosen')
                            {choosenText = '<p class="choosen">Choosen Answer</p>';}
                            else{choosenText = '<p class="important">Choose this answer</p>';}
                            }else{
                                choosenText = '';
                            }


                        allAnswers += `
                        <div class="ans-for-ques">
                        <div>
                        <p>
                        <strong>${ans.user}</strong>
                        </p>
                        </div>
                        <p id="answerId${ansToParse[i]}">
                        ${ans.answer}
                        </p>
                        <div>
        
                        <div class="answer-status">${timeDifference(ans.time)}</div> 
                        <div class="answer-status" id="down${questionId}${i}" onClick="voteDown(${questionId}, ${i})">
                        <img  class="icons" src="images/${thumpsDown}"/></br>${ans.downVotes.length}
                        </div>
                        <div class="answer-status" id="up${questionId}${i}" onClick="voteUp(${questionId}, ${i})">
                        <img  class="icons" src="images/${thumpsUp}"/></br>${ans.upVotes.length}
                        </div>
                        <div class="answer-status" id="choosen${questionId}${i}" onClick="choosen(${questionId}, ${i})">
                        ${choosenText}
                        </div>
        
                        </p>
                        </div>
                        </div>
                `;
                i++;
                    });
                    
                }

document.getElementById(`views${questionId}`).innerHTML = Number(document.getElementById(`views${questionId}`).innerHTML) + 1;


    document.getElementById(`answersDiv${questionId}`).innerHTML = `${allAnswers}
    </div>
    <div class="justify">
    <div id="info${questionId}"></div>
    </br></br>${commentSection}
    `
            })

        }else{
            document.getElementById(`answersDiv${questionId}`).innerHTML = '';
        }
}




let addComment = (qId) => {
  

    let newComment = document.getElementById(`comment${qId}`).value;

    if(newComment.replace(/[^0-9A-Za-z\,]/g, "") === ''){
        document.getElementById(`info${qId}`).innerHTML = `<p class="false" id="status">Comment field can't be left empty</p>`;
        document.getElementById(`comment${qId}`).focus();
    }else{


let bearer = `Bearer ${token}`;


let uri = `http://localhost:5000/api/v1/questions/${qId}/answers`;
let h = new Headers({'content-type': 'application/json', 'authorization': bearer});
let body = {
    username: username,
    answer: newComment
}

let req = new Request(uri, {
    method: 'POST',
    headers: h,
    body:JSON.stringify(body)
});

fetch(req)
        .then((resp) => resp.json())
        .then((data) => {
            if(data.success === 'false'){
                alert('Your login session has expired, you will need to login again')
                window.location.replace("index.html");
            }else{
                document.getElementById(`info${qId}`).innerHTML = `<p class="true" >${data.message}</p>`;
let ansId = Number(document.getElementById(`answers${qId}`).innerHTML);
document.getElementById(`answers${qId}`).innerHTML = ansId + 1 ;
document.getElementById(`ansContributed`).innerHTML = data.ansContributed ;
document.getElementById(`comment${qId}`).value = '';


const el = document.getElementById(`allAnswers${qId}`),
    elChild = document.createElement('div');

elChild.innerHTML = `<div class="ans-for-ques">
<div>
<p>
<strong>${username}</strong>
</p>
</div>
<p id="answerId${ansId}">
${newComment}
</p>
<div>

<div class="answer-status">some few seconds ago</div> 
<div class="answer-status" id="down${qId}${ansId}" onClick="voteDown(${qId}, ${ansId})">
<img  class="icons" src="images/downvote.jpg"/></br>0
</div>
<div class="answer-status" id="up${qId}${ansId}" onClick="voteUp(${qId}, ${ansId})">
<img  class="icons" src="images/upvote.jpg"/></br>0
</div>
<div class="answer-status" id="choosen${qId}${ansId}" onClick="choosen(${qId}, ${ansId})">
<p class="important">Choose this answer</p>
</div>`;

el.appendChild(elChild);

}
           })
    }
}



let voteDown = (qId, aId) => {
    
    let bearer = `Bearer ${token}`;
    
    
    let uri = `http://localhost:5000/api/v1/voteDown/${qId}/${aId}`;
    let h = new Headers({'content-type': 'application/json', 'authorization': bearer});
    let body = {
        username: username
    }
    
    let req = new Request(uri, {
        method: 'POST',
        headers: h,
        body:JSON.stringify(body)
    });
    
    fetch(req)
            .then((resp) => resp.json())
            .then((data) => {
                if(data.message === `Auth failed`){
                    alert('Inactive logging session, Kindly login or signup to cast your vote!');
                    window.location.replace("index.html");
                }

                if(data.success === `true`){
            document.getElementById(`down${qId}${aId}`).innerHTML = `
            <img  class="icons" src="images/downvoted.jpg"/></br>${data.ansTotVotes}`;

            if(typeof(data.opposition) !== 'undefined'){
                document.getElementById(`up${qId}${aId}`).innerHTML = `
                <img  class="icons" src="images/upvote.jpg" /></br>${data.opposition}`;
                }

        }else{
            document.getElementById(`down${qId}${aId}`).innerHTML = `
            <img  class="icons" src="images/downvote.jpg"/></br>${data.ansTotVotes}`;
        }
   document.getElementById(`votes${qId}`).innerHTML = Number(document.getElementById(`votes${qId}`).innerHTML) + data.count;

    })
    
}


let voteUp = (qId, aId) => {

    let bearer = `Bearer ${token}`;
    
    
    let uri = `http://localhost:5000/api/v1/voteUp/${qId}/${aId}`;
    let h = new Headers({'content-type': 'application/json', 'authorization': bearer});
    let body = {
        username: username
    }
    
    let req = new Request(uri, {
        method: 'POST',
        headers: h,
        body:JSON.stringify(body)
    });
    
    fetch(req)
            .then((resp) => resp.json())
            .then((data) => {
                if(data.message === `Auth failed`){
                    alert('Inactive logging session, Kindly login or signup to cast your vote!');
                    window.location.replace("index.html");
                }

                if(data.success === `true`){
                    document.getElementById(`up${qId}${aId}`).innerHTML = `
                    <img  class="icons" src="images/upvoted.jpg" /></br>${data.ansTotVotes}`;

                    if(typeof(data.opposition) !== 'undefined'){
                    document.getElementById(`down${qId}${aId}`).innerHTML = `
                    <img  class="icons" src="images/downvote.jpg" /></br>${data.opposition}`;
                    }
}else{
    document.getElementById(`up${qId}${aId}`).innerHTML = `
    <img  class="icons" src="images/upvote.jpg"/></br>${data.ansTotVotes}`;

}

document.getElementById(`votes${qId}`).innerHTML = Number(document.getElementById(`votes${qId}`).innerHTML) + data.count;

    })

}