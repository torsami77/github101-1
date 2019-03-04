'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pool = _user2.default.pool;

var choosenAnser = function choosenAnser(req, res) {

    var id = parseInt(req.params.questionId, 10);
    var answer = parseInt(req.params.answerId, 10);

    pool.query('SELECT answers FROM questions WHERE id=$1', [id], function (err, result) {
        if (result) {
            var answersArray = result.rows[0].answers;

            var newAns = void 0,
                newArray = [];
            if (answersArray.length > 1) {

                answersArray.forEach(function (checker) {
                    checker = JSON.parse(checker);
                    checker.choosen = null;
                    newArray.push(checker);
                });
                newArray[answer].choosen = 'choosen';
            } else {
                newArray = JSON.parse(answersArray[answer]);
                newArray.choosen = 'choosen';
                newArray = [newArray];
            }

            pool.query('UPDATE questions SET answers = $1 WHERE id = $2', [newArray, id], function (error, resp) {

                if (resp) {
                    res.status(201).send({
                        success: 'true',
                        message: 'Preferred answer updated',
                        Alength: newArray.length - 1,
                        choosen: answer
                    });
                }
            });
        }
    });
};

exports.default = choosenAnser;
//# sourceMappingURL=choosenAnswer.js.map