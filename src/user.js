import pg from 'pg';
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'})); 

const secret = 'secret';

const pool = new pg.Pool({
    user: 'samipostgres',
    host: '127.0.0.1',
    database: 'mydatabase',
    password: 'samipostgres',
    port: '5432'});


const verifyToken = (req, res, next)=>{

    const token = req.headers.authorization.split(" ")[1];

    try{
        const decoded = jwt.verify(token, secret);
        req.userData = decoded;
        next();
    }catch(error){
        res.cookie("userData", '');
        res.cookie("token", '');
        
        res.status(401).send({
            success: `false`,
            message: `Auth failed`
        })
    }

}

export default {pool, verifyToken, secret};