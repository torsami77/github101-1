
let overFlowingQuestions = () => {

    let uri = 'http://localhost:5000/api/v1/questions';
    let h = new Headers({'content-type': 'application/json'});
    
    let req = new Request(uri, {
        method: 'GET',
        headers: h,
    });

    fetch(req)
        .then((resp) => resp.json())
        .then((data) => {
                        
                let asked = 0;

                let allQuestions = `<div>
                                        <h2>Overflowing Questions</h2>
                                    </div><div id="overflowing">`;
               
                data.entireQuestionDb.forEach(each => {
                    if(each.username === username){
                    asked ++;}

                    let  totalVotes = 0;
               
                   each.answers.forEach(parseVote => {
                    vote = JSON.parse(parseVote);
                    totalVotes = totalVotes + vote.upVotes.length + vote.downVotes.length               
                   })

                    allQuestions += `<div class="question" id="question${each.id}">
					<div>
						<div class="question-status">
							<p><strong id="answers${each.id}">${each.answers.length}</strong></br><a href="#"><img  class="icons" src="images/comment.png"/></a></p>
						</div>
						<div class="question-status">
							<p><strong id="votes${each.id}">${totalVotes}</strong></br><a href="#"><img  class="icons" src="images/votes.jpg"/></a></p>
						</div>
						<div class="question-status">
							<p><strong id="views${each.id}">${each.viewed}</strong></br><a href="#"><img  class="icons" src="images/view.png"/></a></p>
						</div>
					</div>
                    <div class="cursor" onClick="showAnswers(${each.id})">
                        <strong>${each.username}</strong>
						<p id="q1">
							----- ${each.question} 
						</p>
						<p class="timing-details">
                        ${stringDate(each.time)}
						</p>
                    </div>
                    <div id="answersDiv${each.id}">
                    </div>
                </div>`;
                }); 

                allQuestions += `</div>` ;
                document.getElementById('interactions').innerHTML = allQuestions;
    
                const profile = `<p><h2>${username}<br/><img src="images/menu.png"/></h2></p>
                <h2>Questions Asked: <strong id="asked">${asked}</strong>!</br>
                Answers contributed: <strong id="ansContributed">${ansContributed}!</h2>`;
    
                if(profDiv = document.getElementById('profile')){
                    profDiv.innerHTML = profile;
                }

                const over = document.getElementById("over"),
                mostans = document.getElementById("mostans"),
                mostask = document.getElementById("mostask");

                mostask.classList.remove("high-light-bar-1");
                mostans.classList.remove("high-light-bar-1");
                over.classList.add("high-light-bar-1");
            
        })

}

let myRecentlyAskQuestions = () => {

    let uri = 'http://localhost:5000/api/v1/questions';
    let h = new Headers({'content-type': 'application/json'});
    
    let req = new Request(uri, {
        method: 'GET',
        headers: h,
    });

    fetch(req)
        .then((resp) => resp.json())
        .then((data) => {
           
            if(typeof(data.userData) === 'undefined'){
                window.location.replace("index.html");
            }else{

                let allQuestions = `<div>
                                        <h2>My Recently Ask Questions</h2>
                                    </div><div id="overflowing">`;
               
                let questionArray = [];
                data.entireQuestionDb.forEach(each => {
                    if(each.username === username){
                   questionArray.push(each)
                    }})

                questionArray.sort(function(a, b) { 
                        return a.id - b.id ;
                      });

                questionArray.reverse();

                questionArray.forEach(each => {

                    let  totalVotes = 0;
               
                   each.answers.forEach(parseVote => {
                    vote = JSON.parse(parseVote);
                    totalVotes = totalVotes + vote.upVotes.length + vote.downVotes.length               
                   })

                    allQuestions += `<div class="question" id="question${each.id}">
					<div>
						<div class="question-status">
							<p><strong id="answers${each.id}">${each.answers.length}</strong></br><a href="#"><img  class="icons" src="images/comment.png"/></a></p>
						</div>
						<div class="question-status">
							<p><strong id="votes${each.id}">${totalVotes}</strong></br><a href="#"><img  class="icons" src="images/votes.jpg"/></a></p>
						</div>
						<div class="question-status">
							<p><strong id="views${each.id}">${each.viewed}</strong></br><a href="#"><img  class="icons" src="images/view.png"/></a></p>
						</div>
					</div>
                    <div class="cursor" onClick="showAnswers(${each.id})">
                        <strong>${each.username}</strong>
						<p id="q1">
							----- ${each.question} 
						</p>
						<p class="timing-details">
								${stringDate(each.time)}
						</p>
                    </div>
                    <div id="answersDiv${each.id}">
                    </div>
                </div>`;
                }); 

                allQuestions += `</div>` ;
                document.getElementById('interactions').innerHTML = allQuestions;

                const over = document.getElementById("over"),
                mostans = document.getElementById("mostans"),
                mostask = document.getElementById("mostask");

                mostask.classList.add("high-light-bar-1");
                mostans.classList.remove("high-light-bar-1");
                over.classList.remove("high-light-bar-1");
                
            }  
        })

}


let myMostAnsweredQuestions = () => {

    let uri = 'http://localhost:5000/api/v1/questions';
    let h = new Headers({'content-type': 'application/json'});
    
    let req = new Request(uri, {
        method: 'GET',
        headers: h,
    });

    fetch(req)
        .then((resp) => resp.json())
        .then((data) => {
           
            if(typeof(data.userData) === 'undefined'){
                window.location.replace("index.html");
            }else{

                let allQuestions = `<div>
                                        <h2>My Most Answered Questions</h2>
                                    </div><div id="overflowing">`;
               
                let questionArray = [];
                data.entireQuestionDb.forEach(each => {
                    if(each.username === username){
                   questionArray.push(each)
                    }})

                questionArray.sort(function(a, b) { 
                        return a.answers.length - b.answers.length ;
                      });

                questionArray.reverse();
                questionArray.forEach(each => {

                    let  totalVotes = 0;
               
                   each.answers.forEach(parseVote => {
                    vote = JSON.parse(parseVote);
                    totalVotes = totalVotes + vote.upVotes.length + vote.downVotes.length               
                   })

                    allQuestions += `<div class="question" id="question${each.id}">
					<div>
						<div class="question-status">
							<p><strong id="answers${each.id}">${each.answers.length}</strong></br><a href="#"><img  class="icons" src="images/comment.png"/></a></p>
						</div>
						<div class="question-status">
							<p><strong id="votes${each.id}">${totalVotes}</strong></br><a href="#"><img  class="icons" src="images/votes.jpg"/></a></p>
						</div>
						<div class="question-status">
							<p><strong id="views${each.id}">${each.viewed}</strong></br><a href="#"><img  class="icons" src="images/view.png"/></a></p>
						</div>
					</div>
                    <div class="cursor" onClick="showAnswers(${each.id})">
                        <strong>${each.username}</strong>
						<p id="q1">
							----- ${each.question} 
						</p>
						<p class="timing-details">
                        ${stringDate(each.time)}
						</p>
                    </div>
                    <div id="answersDiv${each.id}">
                    </div>
                </div>`;
                }); 

                allQuestions += `</div>` ;
                document.getElementById('interactions').innerHTML = allQuestions;

                const over = document.getElementById("over"),
                mostans = document.getElementById("mostans"),
                mostask = document.getElementById("mostask");

                mostask.classList.remove("high-light-bar-1");
                mostans.classList.add("high-light-bar-1");
                over.classList.remove("high-light-bar-1");
            }  
        })
}

let stringDate = (time) => {
    let value = new Date(time).toLocaleDateString('en-GB', {  
        day : 'numeric',
        month : 'short',
        year : 'numeric'
    })
    
    return value;
    }
    
    
let timeDifference = (date1) => {
    let result,
  date2 = new Date(),
  difference = date2.getTime() - new Date(date1).getTime();
  
    let minute=60000;   
    result = Math.round(difference/minute); 
      if(result < 1){
      return `some few seconds ago`;
      }else if(result === 1){
      return `1 minute ago`;	
      }else if(result < 61){
      return `${result} minutes ago`;
      }
  
    let hour = minute*60;
    result = Math.round(difference/hour);  
      if(result === 1){
      return `1 hour ago`;	
      }else if(result < 25){
      return `${result} hours ago`;	
      }
  
    let day = hour*24;
    result = Math.round(difference/day); 
        if(result === 1){
      return `1 day ago`;	
      }else if(result < 31){
      return `${result} days ago`;
      }
  
    let month = day*30;
    result = Math.round(difference/month);
      if(result === 1){
      return `1 month ago`;	
      }else if(result < 13){
      return `${result} months ago`
      }
  
    let year = month * 12;
    result = Math.round(difference/year);
      if(result === 1){
      return `1 year ago`;	
      }else{
      return `${result} years ago`;
      }
  
  }


  