'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pool = _user2.default.pool;

var voteDown = function voteDown(req, res) {

    var id = parseInt(req.params.questionId, 10);
    var answer = parseInt(req.params.answerId, 10);

    pool.query('SELECT answers FROM questions WHERE id=$1', [id], function (err, result) {
        if (result) {
            var theAnswer = JSON.parse(result.rows[0].answers[answer]);
            var success = void 0,
                message = void 0,
                ansTotVotes = void 0,
                opposition = void 0,
                count = 0;

            var checker = theAnswer.upVotes.indexOf(req.body.username);
            if (checker > -1) {
                theAnswer.upVotes.splice(checker, 1);
                opposition = theAnswer.upVotes.length;
                count = count - 1;
            }

            checker = theAnswer.downVotes.indexOf(req.body.username);

            if (checker === -1) {
                theAnswer.downVotes.push(req.body.username);

                success = 'true';
                message = 'Vote casted successfully';
                ansTotVotes = theAnswer.downVotes.length;
                count = count + 1;
            } else {
                theAnswer.downVotes.splice(checker, 1);
                success = 'false';
                message = 'Casted vote reversed successfully';
                ansTotVotes = theAnswer.downVotes.length - 1;
                count = count - 1;
            }

            result.rows[0].answers[answer] = theAnswer;

            pool.query('UPDATE questions SET answers = $1 WHERE id = $2', [result.rows[0].answers, id], function (error, resp) {

                if (resp) {
                    res.status(201).send({
                        success: success,
                        message: message,
                        opposition: opposition,
                        ansTotVotes: theAnswer.downVotes.length,
                        count: count

                    });
                }
            });
        }
    });
};

var voteUp = function voteUp(req, res) {

    var id = parseInt(req.params.questionId, 10);
    var answer = parseInt(req.params.answerId, 10);

    pool.query('SELECT answers FROM questions WHERE id=$1', [id], function (err, result) {
        if (result) {
            var theAnswer = JSON.parse(result.rows[0].answers[answer]);
            var success = void 0,
                message = void 0,
                ansTotVotes = void 0,
                opposition = void 0,
                count = 0;

            var checker = theAnswer.downVotes.indexOf(req.body.username);
            if (checker > -1) {
                theAnswer.downVotes.splice(checker, 1);
                opposition = theAnswer.downVotes.length;
                count = count - 1;
            }

            checker = theAnswer.upVotes.indexOf(req.body.username);
            if (checker === -1) {
                theAnswer.upVotes.push(req.body.username);

                success = 'true';
                message = 'Vote casted successfully';
                ansTotVotes = theAnswer.upVotes.length;
                count = count + 1;
            } else {
                theAnswer.upVotes.splice(checker, 1);
                success = 'false';
                message = 'Casted vote reversed successfully';
                ansTotVotes = theAnswer.upVotes.length - 1;
                count = count - 1;
            }

            result.rows[0].answers[answer] = theAnswer;

            pool.query('UPDATE questions SET answers = $1 WHERE id = $2', [result.rows[0].answers, id], function (error, resp) {

                if (resp) {
                    res.status(201).send({
                        success: success,
                        message: message,
                        opposition: opposition,
                        ansTotVotes: theAnswer.upVotes.length,
                        count: count

                    });
                }
            });
        }
    });
};

exports.default = { voteDown: voteDown, voteUp: voteUp };
//# sourceMappingURL=votes.js.map