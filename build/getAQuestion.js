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

var getAQuestion = function getAQuestion(req, res) {
    var id = parseInt(req.params.questionId, 10);

    pool.query('SELECT * FROM questions WHERE id=$1', [id], function (err, result) {

        if (result) {
            result.rows[0].viewed = result.rows[0].viewed + 1;
            pool.query('UPDATE questions SET viewed = $1 WHERE id = $2', [result.rows[0].viewed, id], function (error, viewedUpdate) {});
            var questionResult = {
                id: result.rows[0].id,
                username: result.rows[0].username,
                question: result.rows[0].question,
                time: result.rows[0].time,
                answers: result.rows[0].answers,
                viewed: result.rows[0].viewed
            };

            return res.status(200).send({
                success: 'true',
                message: 'Task completed successfully',
                questionData: questionResult
            });
        } else {
            return res.status(404).send({
                success: 'false',
                message: 'Task not completed, no question found with specified id'
            });
        }
    });
};

exports.default = getAQuestion;
//# sourceMappingURL=getAQuestion.js.map