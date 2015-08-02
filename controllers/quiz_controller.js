var models = require('../models/models.js');

//auroload - factoriza el código si ruta incluye :quizId
exports.load = function (req, res, next, quizId){
	models.Quiz.findById(quizId).then(
	function(quiz){
		if(quiz){
			req.quiz = quiz;
			next();
		} else {
			next( new Error ('No existe quizId= ' + quizId));
		}
	}).catch(function(error){next(error);});
};

//GET /quizes
exports.index = function (req, res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs', {quizes: quizes});
	}).catch(function(error){next(error);});
};

//GET /quizes/new
exports.new = function (req, res){
	var quiz = models.Quiz.build({pregunta: "Pregunta", respuesta: "Respuesta"});
	res.render('quizes/new', {quiz: quiz});
};

//GET /quizes/:id
exports.show = function (req, res){
	res.render('quizes/show', {quiz: req.quiz});
};

//GET /quizes/question
/*exports.question = function (req, res){
	models.Quiz.findAll().then(function(quiz){
		res.render('quizes/question', {pregunta: quiz[0].pregunta});
	})
};*/

//GET /quizes/answer
exports.answer = function (req, res){
	var resultado = 'Incorrecto';
	if(req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};

//POST /quizes/create
exports.create = function (req, res){
	var quiz = models.Quiz.build(req.body.quiz);
	
	quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
		res.redirect('/quizes');
	}) //Redirección HTTP (URL relativo) lista de preguntas
};
