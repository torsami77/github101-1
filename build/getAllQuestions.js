'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('./db/db');

var _db2 = _interopRequireDefault(_db);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pool = _user2.default.pool;

var getAllQuestions = function getAllQuestions(req, res) {

  pool.query('SELECT * FROM questions', function (err, result) {

    if (result) {
      var entireQuestionDb = result.rows;

      res.status(200).send({
        success: 'true',
        message: 'All Questions retrieved successfully',
        entireQuestionDb: entireQuestionDb,
        userData: req.cookies.username
      });
    }
  });
};

exports.default = getAllQuestions;
//# sourceMappingURL=getAllQuestions.js.map