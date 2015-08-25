define(function (require) {
	var $ = require("jquery");
	var Q = require("q");


	return function (gameID) {
		
		var deferred = Q.defer();

			$.ajax({
				url: "http://deckofcardsapi.com/api/deck/" + gameID + "/draw/?count=1",
				method: "GET"
			}).done(function(data) {
				console.log(data);
				deferred.resolve(data);
			});
		
		return deferred.promise;
	};
});