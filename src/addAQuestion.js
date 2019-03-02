import user from './user';



const pool = user.pool;


const addAQuestion = (req, res) => {
    if(!res.status(200)) {
       return res.status(400).send({
            success: `false`,     
            message: `question is required`
        }); 
     } 


    const newQuestion = {
        username: req.body.username,
        question: req.body.questions,
        answers: [],
        time: new Date()
      }
  
      pool.query("INSERT INTO questions (username, question, answers, viewed, time) VALUES($1, $2, $3, $4, $5) RETURNING id",
      [newQuestion.username, newQuestion.question, newQuestion.answers, 0, newQuestion.time], (err, resp)=>{ 
        return res.status(201).send({
            success: `true`,
            message: `New question added successfully`, 
            question: newQuestion,
            id: resp.rows[0].id
   
            })
  




      });
     

}

export default addAQuestion;