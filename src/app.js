import express from 'express';
import getAllQuestions from './getAllQuestions';
import getAQuestion from './getAQuestion';
import addAQuestion from './addAQuestion';
import addAnAnswer from './addAnAnswer';
import signUp from './signUp';
import logIn from './logIn';
import votes from './votes';
import bodyParser from 'body-parser';
import path from 'path';
import user from './user';
import cookieParser from 'cookie-parser';
import choosenAnswer from './choosenAnswer';


const verifyToken = user.verifyToken;
const voteDown = votes.voteDown;
const voteUp = votes.voteUp;


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  
app.use(express.static("public"));
app.use(cookieParser());


app.get('/', (req, res)=>{
  res.sendFile(path.resolve('./public/index.html'));
})
app.get('/api/v1/questions', getAllQuestions);
app.get('/api/v1/questions/:questionId', getAQuestion);
app.post('/api/v1/questions/', verifyToken, addAQuestion);
app.post('/api/v1/questions/:questionId/answers', verifyToken, addAnAnswer);
app.post('/api/v1/auth/signUp', signUp);
app.post('/api/v1/auth/logIn', logIn);
app.post('/api/v1/voteDown/:questionId/:answerId', verifyToken, voteDown);
app.post('/api/v1/voteUp/:questionId/:answerId', verifyToken, voteUp);
app.post('/api/v1/choosenanswer/:questionId/:answerId', choosenAnswer);



const PORT = 5000;

app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`)
    });

export {app};
