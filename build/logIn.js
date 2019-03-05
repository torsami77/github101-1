'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pool = _user2.default.pool;
var secret = _user2.default.secret;

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.text());
app.use(_bodyParser2.default.json({ type: 'application/json' }));
app.use((0, _cookieParser2.default)());

var logIn = function logIn(req, res, next) {
    var _req$body = req.body,
        email = _req$body.email,
        password = _req$body.password;


    if (email === '' || password === '') {
        return res.status(400).json({
            success: 'false',
            message: 'All fields are required'
        });
    }

    pool.query('SELECT username, answers, password FROM users WHERE (email = $1)', [email], function (err, result) {

        if (typeof result.rows[0] !== 'undefined') {

            _bcryptjs2.default.compare(password, result.rows[0].password, function (err, response) {
                if (err) {
                    return res.status(404).json({
                        success: 'false',
                        message: 'Invalid email or password'
                    });
                }
                if (response) {
                    var token = _jsonwebtoken2.default.sign({
                        email: email,
                        password: result.rows[0].password
                    }, secret, {
                        expiresIn: '1h'
                    });

                    res.cookie("username", result.rows[0].username);
                    res.cookie("token", token);
                    res.cookie("answers", result.rows[0].answers);

                    // res.redirect('localhost:5000/userpage.html')
                    return res.status(200).json({
                        success: 'true',
                        message: 'Auth successful',
                        token: token
                    });
                } else {
                    return res.status(404).json({
                        success: 'false',
                        message: 'Invalid email or password'
                    });
                }
            });
        } else {
            return res.status(404).json({
                success: 'false',
                message: 'Invalid email or password'
            });
        }
    });
};

exports.default = logIn;
//# sourceMappingURL=logIn.js.map