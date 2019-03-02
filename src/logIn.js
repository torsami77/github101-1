import pg from 'pg';
import bcrypt from 'bcryptjs';
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import user from './user';
import cookieParser from 'cookie-parser';

const pool = user.pool;
const secret = user.secret;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'})); 
app.use(cookieParser());


const logIn = (req, res, next) => {

        let {email, password} = (req.body);

        if(email === '' || password === ''){
            return res.status(400).json({
                success: `false`,
                message: `All fields are required`
            })
        }

    pool.query('SELECT username, answers, password FROM users WHERE (email = $1)', [email], (err, result) => {

            if(result.rows.length > 0){
            
                bcrypt.compare(password, result.rows[0].password, (err, response) => {
                    if(err){
                        return res.status(404).json({
                            success: `false`,
                            message: `Invalid email or password`
                        });
                    }
                    if(response){
                        const token = jwt.sign({
                            email: email,
                            password: result.rows[0].password
                        }, 
                        secret,
                        {
                            expiresIn: `1h`
                        });
                    
                    
                    res.cookie("username", result.rows[0].username); 
                    res.cookie("token", token); 
                    res.cookie("answers", result.rows[0].answers)
                    
                           // res.redirect('localhost:5000/userpage.html')
                    return res.status(200).json({
                            success: `true`,
                            message: `Auth successful`,
                            token: token
                        });
                        
                    }else{
                        return res.status(404).json({
                        success: `false`,
                        message: `Invalid email or password`
                    });
                }
                })
            }else{
                return res.status(404).json({
                success: `false`,
                message: `Invalid email or password`
            });
        }
          
        })
        

}

export default logIn;
