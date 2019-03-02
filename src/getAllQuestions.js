import db from './db/db';
import user from './user';


const pool = user.pool;

const getAllQuestions = (req, res) => {


  pool.query('SELECT * FROM questions', (err, result)=>{

    if(result){
      const entireQuestionDb = result.rows;

      res.status(200).send({
        success: `true`,
        message: `All Questions retrieved successfully`,
        entireQuestionDb: entireQuestionDb,
        userData: req.cookies.username
        });
    }
    
  })
  
};

export default getAllQuestions;
