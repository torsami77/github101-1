import user from './user';

const pool = user.pool;


const addAnAnswer = (req, res) => {
 

    const id = parseInt(req.params.questionId, 10);

    pool.query('SELECT answers FROM users WHERE username=$1', [req.body.username], (err, ans)=>{

        let ansContributed = parseInt(ans.rows[0].answers) + 1;
        res.cookie("answers", ansContributed);
       
       
        pool.query('UPDATE users SET answers = $1 WHERE username = $2', [ansContributed, req.body.username], (error, ansUpdated) => {
        })



pool.query('SELECT answers FROM questions WHERE id=$1', [id], (err, result)=>{
    const answersArray = result.rows[0].answers;

        if(result){
            const newAnswer = {
                id: answersArray.length + 1,
                user: req.body.username,
                answer: req.body.answer,
                upVotes: [],
                downVotes:[],
                reply: [],
                time: new Date()
                };

                answersArray.push(newAnswer);

                
                pool.query('UPDATE questions SET answers = $1 WHERE id = $2', [answersArray, id], (error, results) => {
            
                if(result){
                return res.status(201).send({
                    success: 'true',
                    message: 'New Answer added successfully', 
                    answers: newAnswer,
                    ansContributed: ansContributed
                    })
                }else{
                return res.status(401).send({
                    success: `false`,
                    message: `An error occured, please try again`
                })
                }
            })
        }

        
    })
    })


    
}

export default addAnAnswer;