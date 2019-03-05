'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _getAllQuestions = require('./getAllQuestions');

var _getAllQuestions2 = _interopRequireDefault(_getAllQuestions);

var _getAQuestion = require('./getAQuestion');

var _getAQuestion2 = _interopRequireDefault(_getAQuestion);

var _addAQuestion = require('./addAQuestion');

var _addAQuestion2 = _interopRequireDefault(_addAQuestion);

var _addAnAnswer = require('./addAnAnswer');

var _addAnAnswer2 = _interopRequireDefault(_addAnAnswer);

var _signUp = require('./signUp');

var _signUp2 = _interopRequireDefault(_signUp);

var _logIn = require('./logIn');

var _logIn2 = _interopRequireDefault(_logIn);

var _votes = require('./votes');

var _votes2 = _interopRequireDefault(_votes);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _choosenAnswer = require('./choosenAnswer');

var _choosenAnswer2 = _interopRequireDefault(_choosenAnswer);

var _logOut = require('./logOut');

var _logOut2 = _interopRequireDefault(_logOut);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 5000;
var verifyToken = _user2.default.verifyToken;
var voteDown = _votes2.default.voteDown;
var voteUp = _votes2.default.voteUp;

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.text());
app.use(_bodyParser2.default.json({ type: 'application/json' }));
app.use(_express2.default.static("public"));
app.use((0, _cookieParser2.default)());

app.get('/', function (req, res) {
  res.sendFile(_path2.default.resolve('./public/index.html'));
});
app.get('/api/v1/questions', _getAllQuestions2.default);
app.get('/api/v1/questions/:questionId', _getAQuestion2.default);
app.post('/api/v1/questions/', verifyToken, _addAQuestion2.default);
app.post('/api/v1/questions/:questionId/answers', verifyToken, _addAnAnswer2.default);
app.post('/api/v1/auth/signUp', _signUp2.default);
app.post('/api/v1/auth/logIn', _logIn2.default);
app.post('/api/v1/voteDown/:questionId/:answerId', verifyToken, voteDown);
app.post('/api/v1/voteUp/:questionId/:answerId', verifyToken, voteUp);
app.post('/api/v1/choosenanswer/:questionId/:answerId', _choosenAnswer2.default);
app.post('/api/v1/auth/logOut', _logOut2.default);

app.listen(PORT, function () {
  console.log('server running on port ' + PORT);
});

exports.app = app;
//# sourceMappingURL=app.js.map