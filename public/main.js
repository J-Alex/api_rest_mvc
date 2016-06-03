(function(){
	'use strict';
	angular.module('angularTodo',[]);

	var apl = angular.module('angularTodo');

	apl.controller("mainController",['$scope','$http', function(s,h){
		s.formData = {};
		s.todos = [];
		//Cuando se cargue la página, pide del API todas las tareas
		h.get('/api/todos')
			.success(function(data) {
				s.todos = data;
				//console.log(data);
			})
			.error(function(data) {
				console.log('Error' + data);
			});
		
		//cunado se añada una nueva tarea, manda el texto a la API
		s.createTodo = function() {
			socket.emit('saveOne',s.formData);
			//s.todos = '';
			/*h.post('/api/todos', s.formData)
			.success(function(data) {
				s.formData = {};
				s.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error' + data);
			});*/
			//getElementsByTagName('form')[0].reset();
		}

		socket.on('sendAll',function(data){
			//console.log(data);
			//s.todos = [];
			s.todos.push(data[data.length-1]);
			s.$apply();
			console.log(s.todos);
		});
		//Borrar una tarea despues de checkearlo como acabado
		s.deleteTodo = function(id) {
			h.delete('/api/todos/' + id)
			.success(function(data) {
				s.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error' + data);
			});
		}
	}]);
}());