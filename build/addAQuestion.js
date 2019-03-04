"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require("./user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pool = _user2.default.pool;

var addAQuestion = function addAQuestion(req, res) {
    if (!res.status(200)) {
        return res.status(400).send({
            success: "false",
            message: "question is required"
        });
    }

    var newQuestion = {
        username: req.body.username,
        question: req.body.questions,
        answers: [],
        time: new Date()
    };

    pool.query("INSERT INTO questions (username, question, answers, viewed, time) VALUES($1, $2, $3, $4, $5) RETURNING id", [newQuestion.username, newQuestion.question, newQuestion.answers, 0, newQuestion.time], function (err, resp) {
        return res.status(201).send({
            success: "true",
            message: "New question added successfully",
            question: newQuestion,
            id: resp.rows[0].id

        });
    });
};

exports.default = addAQuestion;
//# sourceMappingURL=addAQuestion.js.map