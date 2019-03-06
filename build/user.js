'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.text());
app.use(_bodyParser2.default.json({ type: 'application/json' }));

var secret = 'secret';

var pool = new _pg2.default.Pool({
    /* user: 'samipostgres',
     host: '127.0.0.1',
     database: 'mydatabase',
     password: 'samipostgres',
     port: '5432'
     */

    //heroku
    host: 'ec2-54-225-237-84.compute-1.amazonaws.com',
    Database: 'd6npb1cqus4ps1',
    User: 'dcdlhhqbgpkvxx',
    Port: '5432',
    Password: 'dfd71496b432bd5b245cc13ce7e57e1a7dc81202e7ea862919a3a86ca24d2ed2'
});

var verifyToken = function verifyToken(req, res, next) {

    var token = req.headers.authorization.split(" ")[1];

    try {
        var decoded = _jsonwebtoken2.default.verify(token, secret);
        req.userData = decoded;
        next();
    } catch (error) {
        res.cookie("userData", '');
        res.cookie("token", '');

        res.status(401).send({
            success: 'false',
            message: 'Auth failed'
        });
    }
};

exports.default = { pool: pool, verifyToken: verifyToken, secret: secret };
//# sourceMappingURL=user.js.map