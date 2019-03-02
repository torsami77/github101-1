import db from './db/db';
import user from './user';

const pool = user.pool;


const getAQuestion = (req, res) => {
    const id = parseInt(req.params.questionId, 10);


    pool.query('SELECT * FROM questions WHERE id=$1', [id], (err, result)=>{
       
        if(result){
        result.rows[0].viewed  = result.rows[0].viewed + 1;
pool.query('UPDATE questions SET viewed = $1 WHERE id = $2', [result.rows[0].viewed, id], (error, viewedUpdate) => {
})
            const questionResult = {
                id: result.rows[0].id,
                username: result.rows[0].username,
                question: result.rows[0].question,
                time: result.rows[0].time,
                answers: result.rows[0].answers,
                viewed: result.rows[0].viewed
            }

            return res.status(200).send({
                success: `true`,
                message: `Task completed successfully`,
                questionData: questionResult
        })
    }else{
        return res.status(404).send({
            success: `false`,
            message: `Task not completed, no question found with specified id`
        })
    }
    })

   

}

    

export default getAQuestion;