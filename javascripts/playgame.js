define(function (require) {
	var $ = require("jquery");
	var Q = require("q");


	return function () {
		
		var deferred = Q.defer();

			$.ajax({
				url: "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2",
				method: "GET"
			}).done(function(data) {
				console.log(data);
				deferred.resolve(data);
			});
		
		return deferred.promise;
	};
});