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
const connectionString = 'postgres://fgxmlcmztjlnqa:78ed6f0c9e151eb1f3fbb6e8a7a50ba3d4a9bf471e6498ea527119a2169ea645@ec2-107-20-167-11.compute-1.amazonaws.com:5432/da9ssf8703fkcj';

const pool = new pg.Pool({
   /*
    password: '',
    user: 'postgres',
    database: 'postgres',
    */
    
    user: 'samipostgres',
    password: 'samipostgres',
    database: 'mydatabase',


    host: '127.0.0.1',
    port: '5432'

//connectionString: 'postgres://fgxmlcmztjlnqa:78ed6f0c9e151eb1f3fbb6e8a7a50ba3d4a9bf471e6498ea527119a2169ea645@ec2-107-20-167-11.compute-1.amazonaws.com:5432/da9ssf8703fkcj'

});


const verifyToken = (req, res, next) => {

    //const token = req.headers.authorization.split(" ")[1];
    const token = req.cookies.token;

    try{
        const decoded = jwt.verify(token, secret);
        req.userData = decoded;
        next();
    }catch(error){
        res.cookie("userData", null);
        res.cookie("token", null);
        
        res.status(401).send({
            success: `false`,
            message: `Auth failed`
        })
    }

}

export default {pool, verifyToken, secret};