'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _cookieParser2.default)());

var logOut = function logOut(req, res) {
    res.cookie("username", '');
    res.cookie("token", '');
    res.cookie("answers", '');

    return res.status(200).json({
        success: 'true',
        message: 'Logout successful'
    });
};

exports.default = logOut;
//# sourceMappingURL=logOut.js.map