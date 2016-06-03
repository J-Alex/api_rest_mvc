/*server.js*/

//requerimos las librerias que dependeremos e iniciamos la app
var express = require('express'),
	mongoose = require('mongoose'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	path = require('path'),
	methodOverride = require('method-override'),
	app = express();//iniciamos express

//conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/angular-todo');
var Todo = require('./models n schemas/todoModel').Todo;

//configuración general del servidor
//app.configure(function() {
	//localización de los ficheros estáticos
	//app.use(express.static(__dirname + 'public'));
	app.use(express.static(path.join(__dirname, 'public')));
	//mostrar un log de todos los request en la consola
	app.use(logger('dev'));
	//permite cambiar el HTML con el método POST
	app.use(bodyParser.json());
	//simula DELETE y PUT
	app.use(methodOverride());
//});
/************************************
//un modelo para la BD
var Todo = mongoose.model('Todo', {
	text: String
});**********************************/

/*Rutas de la API
//Get de todos los TODOs
app.get('/api/todos', function(req, res){
	Todo.find(function(err, todos) {
		if(err){
			console.log(err);
		}
		res.json(todos);
	});
});
//POST que crea un TODO y devuelve todos tras la creacion
app.post('/api/todos', function(req, res){
	Todo.create({
		text: req.body.text,
		done: false
	}, function (err, todo) {
		if(err){
			console.log(err);
		}
		Todo.find(function(err, todos) {
			if(err){
				console.log(err);
			}
			res.json(todos);
		});
	});
});

//DELETE un TODO específio y devuelve todos tras borrarlo.
app.delete('/api/todos/:todo', function(req,res){
	Todo.remove({
		_id:req.params.todo
	}, function(err, todo) {
		if(err){
			console.log(err);
		}
		Todo.find(function(err,todos){
			if(err){
				console.log(err);
			}
			res.json(todos);
		});
	});
});
*/
/*Cargar una vista HTML simple donde irá nuestra Single App Page*/
//Angular Manejará el Frontend
/*************************************************************
app.get('*', function(req,res) {
	res.sendFile(__dirname + '/index.html');
});
*************************************************************/
var index = require(__dirname + '/controllers n routes/index.js');
app.use('/', index);


var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection',function(socket){
	socket.on('saveOne',function(dataIn){
		//console.log(dataIn);
		Todo.create({
			text: dataIn.text,
			done: false
		}, function (err, todo) {
				if(err){
					console.log(err);
				}
				Todo.find(function(err, todos) {
					if(err){
						console.log(err);
					}	
					//console.log(todos);		
					socket.emit('sendAll', todos);		
					socket.broadcast.emit('sendAll', todos);//res.json(todos);
				});
			});
	});
});
io.on('connection', function(socket){
  socket.on('mensage', function(msg){
    console.log('message: ' + msg.saludo);
	socket.emit('retorno',{devuelta:"Hola"});
  });
});

http.listen(8080, function(){
  console.log('listening on localhost:8080');
});
//escucha en el puerto 8000 y levanta el servidor
/*app.listen(8000, function () {
	console.log('Servidor arriba en el puerto 8000');
});*/