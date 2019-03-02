import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());

const logOut = (req, res) => {
    res.cookie("username", ''); 
    res.cookie("token", ''); 
    res.cookie("answers", '')
    
    return res.status(200).json({
            success: `true`,
            message: `Logout successful`,
        });

}

export default logOut;
