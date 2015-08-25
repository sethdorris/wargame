define(function (require) {
	
	var $ = require('jquery');
	var q = require('q');
	
	return {
		getp1score: function () {

		var deferred = q.defer();

			$.ajax({
				url: "https://nss-sethwar.firebaseio.com/scoreboard.json",
				method: "GET"
			}).done(function (p1score) {
				console.log(p1score[0].p1score);
				deferred.resolve(p1score);
			}).fail(function (xhr, status, error) {
				console.log("error", error);
			});

			return deferred.promise;
		},

		postp1score: function (newscoreboard) {

		var deferred = q.defer();

			$.ajax({
				url: "https://nss-sethwar.firebaseio.com/scoreboard.json",
				method: "POST",
				data: JSON.stringify(newscoreboard)
			}).done(function (p1score) {
				console.log(p1score);
				deferred.resolve(p1score);
			});

			return deferred.promise;

		}

	};

});