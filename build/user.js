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
var connectionString = 'postgres://fgxmlcmztjlnqa:78ed6f0c9e151eb1f3fbb6e8a7a50ba3d4a9bf471e6498ea527119a2169ea645@ec2-107-20-167-11.compute-1.amazonaws.com:5432/da9ssf8703fkcj';

var pool = new _pg2.default.Pool({

    user: 'samipostgres',
    host: '127.0.0.1',
    database: 'mydatabase',
    password: 'samipostgres',
    port: '5432'

    //connectionString: 'postgres://fgxmlcmztjlnqa:78ed6f0c9e151eb1f3fbb6e8a7a50ba3d4a9bf471e6498ea527119a2169ea645@ec2-107-20-167-11.compute-1.amazonaws.com:5432/da9ssf8703fkcj'

});

var verifyToken = function verifyToken(req, res, next) {

    //const token = req.headers.authorization.split(" ")[1];
    var token = req.cookies.token;

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