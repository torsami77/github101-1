import user from './user';

const pool = user.pool;


const choosenAnser = (req, res) => {
 
    const id = parseInt(req.params.questionId, 10);
    const answer = parseInt(req.params.answerId, 10);

    pool.query('SELECT answers FROM questions WHERE id=$1', [id], (err, result)=>{
    if(result){
        let answersArray = result.rows[0].answers;
        
        
        let newAns, newArray = [];
        if(answersArray.length > 1){
        
        answersArray.forEach(checker =>{
            checker = JSON.parse(checker);
            checker.choosen = null;
            newArray.push(checker);
           
        })
        newArray[answer].choosen = 'choosen';
       
        }else{
            newArray = JSON.parse(answersArray[answer]);
            newArray.choosen = 'choosen';
            newArray = [newArray]
        }
        
        
        pool.query('UPDATE questions SET answers = $1 WHERE id = $2', [newArray, id], (error, resp) => {


            if(resp){
                    res.status(201).send({
                        success: `true`,
                        message: `Preferred answer updated`, 
                        Alength: newArray.length -1,
                        choosen: answer
                    })

                }
            })
        }
})

    
}

export default choosenAnser;