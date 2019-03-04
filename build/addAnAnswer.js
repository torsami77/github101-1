'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pool = _user2.default.pool;

var addAnAnswer = function addAnAnswer(req, res) {

    var id = parseInt(req.params.questionId, 10);

    pool.query('SELECT answers FROM users WHERE username=$1', [req.body.username], function (err, ans) {

        var ansContributed = parseInt(ans.rows[0].answers) + 1;
        res.cookie("answers", ansContributed);

        pool.query('UPDATE users SET answers = $1 WHERE username = $2', [ansContributed, req.body.username], function (error, ansUpdated) {});

        pool.query('SELECT answers FROM questions WHERE id=$1', [id], function (err, result) {
            var answersArray = result.rows[0].answers;

            if (result) {
                var newAnswer = {
                    id: answersArray.length + 1,
                    user: req.body.username,
                    answer: req.body.answer,
                    upVotes: [],
                    downVotes: [],
                    reply: [],
                    time: new Date()
                };

                answersArray.push(newAnswer);

                pool.query('UPDATE questions SET answers = $1 WHERE id = $2', [answersArray, id], function (error, results) {

                    if (result) {
                        return res.status(201).send({
                            success: 'true',
                            message: 'New Answer added successfully',
                            answers: newAnswer,
                            ansContributed: ansContributed
                        });
                    } else {
                        return res.status(401).send({
                            success: 'false',
                            message: 'An error occured, please try again'
                        });
                    }
                });
            }
        });
    });
};

exports.default = addAnAnswer;
//# sourceMappingURL=addAnAnswer.js.map