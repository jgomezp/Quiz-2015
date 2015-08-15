var models = require('../models/models.js');

// Autoload :id de comentarios
exports.load = function(req, res, next, commentId) {
  models.Comment.find({
            where: {
                id: Number(commentId)
            }
        }).then(function(comment) {
      if (comment) {
        req.comment = comment;
        console.log("Se abre comment!");
        next();
      } else{next(new Error('No existe commentId=' + commentId))}
    }
  ).catch(function(error){next(error)});
};

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

//GET /quizes/:quizID/comment/:commentId(\\d+)/publish
exports.publish = function (req, res){
	
	console.log("@@@@@@@@@@@@ req.comment", req.comment);
	console.log("@@@@@@@@@@@@ req.comment.publicado ", req.comment.publicado );
	req.comment.publicado = true;
	
	req.comment.save({fiels: ["publicado"]})
		.then(function(){ res.redirect('/quizes/'+req.params.quizId)})
		.catch(function (error) {next (error)});
};
