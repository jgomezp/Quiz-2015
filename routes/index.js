var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', sessionController.autologout, function(req, res) {
  res.render('index', { title: 'Quiz' , errors: []});
});

//Autoload de comandos con :quizId
router.param('quizId', quizController.load); // autoload:quizId
router.param('commentId', commentController.load); // autoload: commentId

router.get('/quizes', sessionController.autologout, quizController.index);
router.get('/quizes/:quizId(\\d+)', sessionController.autologout, quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', sessionController.autologout, quizController.answer);
router.get('/quizes/new', sessionController.autologout, sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.autologout, sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.autologout, sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.autologout, sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.autologout, sessionController.loginRequired, quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', sessionController.autologout, commentController.new);
router.post('/quizes/:quizId(\\d+)/comments/', sessionController.autologout, commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.autologout, sessionController.loginRequired, commentController.publish);

router.get('/login' , sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

router.get('/author', sessionController.autologout, function(req, res) {
  res.render('author', {errors: []});
});

module.exports = router;
