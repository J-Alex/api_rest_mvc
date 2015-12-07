(function(){
	'use strict';
	angular.module('angularTodo',[]);

	var apl = angular.module('angularTodo');

	apl.controller("mainController",['$scope','$http', function(s,h){
		s.formData = {};

		//Cuando se cargue la página, pide del API todas las tareas
		h.get('/api/todos')
			.success(function(data) {
				s.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error' + data);
			});
		
		//cunado se añada una nueva tarea, manda el texto a la API
		s.createTodo = function() {
			h.post('/api/todos', s.formData)
			.success(function(data) {
				s.formData = {};
				s.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error' + data);
			});
		}

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