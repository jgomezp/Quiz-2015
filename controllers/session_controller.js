//GET /login
exports.new = function (req, res){
	var errors = req.session.errors || {};
	req.session.errors = {};
	
	res.render('session/new', {errors: errors });
};

//POST /login
exports.create = function (req, res){
	var login = req.body.login;
	var password = req.body.password;
	
	var userController = require('./user_controller');
	userController.autenticar(login, password, function(error, user){
		if(error){
			req.session.errors = [{"message": 'Se ha producido un error ' + error}];
			res.redirect("/login");
			return;
		}
		req.session.user = {id: user.id, username: user.username};
		res.redirect(req.session.redir.toString());
		
	});
};

//MW de autorización
exports.loginRequired = function (req, res, next){

	if(req.session.user)
		next();
	else
		res.redirect('/login');
};

//MW de autologout
exports.autologout = function (req, res, next){
	
	if(!req.session.user)
		next();
	else{
		var _2minutos = 1000*60*2; //2 minutos
		
		var tiempoRegistrado = new Date().getTime()+_2minutos;
		if(req.session.time){
			tiempoRegistrado = new Date(req.session.time).getTime()+_2minutos;
		}
		
		var tiempo = new Date().getTime();
		req.session.time = new Date().getTime();
		
		if(tiempoRegistrado < tiempo){
			console.log('Ya han pasado 2 min' );
			res.redirect('/logout');
		}else{
			next();
		}
	}
};


//DELETE /logout
exports.destroy = function (req, res){
	delete req.session.user;
	res.redirect(req.session.redir.toString());
};
