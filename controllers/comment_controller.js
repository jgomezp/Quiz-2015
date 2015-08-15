var models = require('../models/models.js');

//GET /quizes/:quizID/comment/new
exports.new = function (req, res){
	res.render('comments/new', {quizid: req.params.quizId, errors: [] });
};

//POST /quizes/:quizID/comment/create
exports.create = function (req, res){
	var comments = models.Comment.build({
		texto: req.body.comment.texto,
		QuizId: req.params.quizId
	});
	
	comments.validate().then(function(err){
		if(err){
			console.log("Error: " + err.errors);
			res.render('comments/new', { comments: comments, errors: err.errors});
		} else {
			comments.save().then(function(){
				res.redirect('/quizes/'+req.params.quizId);
			});
		}
	}).catch(function (error) {next (error)}); //Redirección HTTP (URL relativo) lista de preguntas
};
