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

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.text());
app.use(_bodyParser2.default.json({ type: 'application/json' }));

var pool = _user2.default.pool;

var signUp = function signUp(req, res) {
    var _req$body = req.body,
        email = _req$body.email,
        username = _req$body.username,
        password = _req$body.password,
        verify = _req$body.verify;

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    username = username.replace(/[^0-9A-Za-z\,]/g, "").toLowerCase();

    if (username === '') {
        return res.status(400).send({
            success: 'false',
            message: 'All fields are required',
            field: 'username'
        });
    }

    if (!email.match(mailformat)) {
        return res.status(400).send({
            success: 'false',
            message: 'Enter a valid email',
            field: 'email'
        });
    }

    if (password === '') {
        return res.status(400).send({
            success: 'false',
            message: 'All fields are required',
            field: 'password'
        });
    }

    if (verify === '') {
        return res.status(400).send({
            success: 'false',
            message: 'All fields are required',
            field: 'verify'
        });
    }

    pool.query('SELECT * FROM users WHERE (email = $1 OR username = $2)', [email, username], function (err, result) {
        console.log(err);
        if (typeof result.rows[0] !== 'undefined') {

            var db = result.rows[0];

            if (db.username === username) {
                return res.status(400).send({
                    success: 'false',
                    message: 'Username already taken by another user',
                    field: 'username'
                });
            }

            if (db.email === email) {
                return res.status(400).send({
                    success: 'false',
                    message: 'Email is associated with another user',
                    field: 'email'
                });
            }
        } else {
            if (password !== verify) {
                return res.status(400).send({
                    success: 'false',
                    message: 'Password does not match',
                    field: 'verify'
                });
            }

            _bcryptjs2.default.hash(password, 10, function (err, hash) {
                if (err) {

                    return res.status(400).send({
                        success: 'false',
                        message: err
                    });
                } else {
                    pool.query('INSERT INTO users (email, username, password, signupdate, answers) VALUES($1, $2, $3, $4, $5)', [email, username, hash, new Date(), 0], function (err, result) {

                        if (result) {

                            return res.status(201).send({
                                success: 'true',
                                message: 'Your Signed up was successful'
                            });
                        } else {
                            console.log(err);
                            return res.status(400).send({
                                success: 'false',
                                message: err
                            });
                        }
                    });
                }
            });
        }
    });
};

exports.default = signUp;
//# sourceMappingURL=signUp.js.map