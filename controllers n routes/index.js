var express = require('express');
var router = express.Router();
var Todo = require('../models n schemas/todoModel').Todo;

router.get('/', function(req,res) {
	res.sendFile('index.html');
});
//Get de todos los TODOs
router.get('/api/todos', function(req, res){
	Todo.find(function(err, todos) {
		if(err){
			console.log(err);
		}
		res.json(todos);
	});
});
//POST que crea un TODO y devuelve todos tras la creacion
router.post('/api/todos', function(req, res){
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
router.delete('/api/todos/:todo', function(req,res){
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

module.exports = router;