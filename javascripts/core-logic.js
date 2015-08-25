define(function (require) {
	
	var $ = require('jquery');
	var q = require('q');
	var playGame = require('playgame');
	var showCard = require('showcard');
	var scoreboard = require('scoreboard');
	// var getData = require('get-data');
	// var templates = require("templates");

	return function () {
		var gameID;
		var p1Card;
		var p1CardImg;
		var p2Card;
		var p2CardImg;
		var scores = {
			p1score: 0,
			p2score: 0
		};


		$("#player1score").html("<h6>" + scores.p1score + "</h6>");
		$("#player2score").html("<h6>" + scores.p2score + "</h6>");
		
		$("#playGame").click(function() {
			playGame()
			.then(function (data) {
				console.log(data);
				gameID = data.deck_id;
			});
		});

		$("#player1ShowCard").click(function() {
			console.log("PLAYER 1 MOVED");
			console.log("game ID:", gameID);

			showCard(gameID)
			.then(function (carddrawn) {
				p1Card = carddrawn.cards[0].value;
				
				//Switch statement to assign a comparitive value to face cards
				switch (p1Card) {
					case "JACK":
					p1Card = 11;
					break;
					case "QUEEN":
					p1Card = 12;
					break;
					case "KING":
					p1Card = 13;
					break;
					case "ACE":
					p1Card = 14;
					break;
					default:
					p1Card = parseInt(p1Card);
				}

			    console.log("p1Card", p1Card);
			    p1CardImg = carddrawn.cards[0].image;
			    console.log("p1CardImg", carddrawn.cards[0].image);
			    $(".player1Thumb").html("<img src='" + p1CardImg +"' width='80px' height='100px'></img>");
			})
			.done(function () {
			});	
		});

		$("#player2ShowCard").click(function() {
			showCard(gameID)
			.then(function (carddrawn) {
				p2Card = carddrawn.cards[0].value;
				
				switch (p2Card) {
					case "JACK":
					p2Card = 11;
					break;
					case "QUEEN":
					p2Card = 12;
					break;
					case "KING":
					p2Card = 13;
					break;
					case "ACE":
					p2Card = 14;
					break;
					default:
					p2Card = parseInt(p2Card);
				}

				p2CardImg = carddrawn.cards[0].image;
				$(".player2Thumb").html("<img src='" + p2CardImg +"' width='80px' height='100px'></img>");
				
				if (p1Card > parseInt(p2Card)) {
					console.log(p1Card, "VALUE P1 CARD");
					scores.p1score++;
					console.log(scores.p1score);
				} else if (parseInt(p2Card) > p1Card) {
					scores.p2score++;
					console.log("Player 2 Score", scores.p2score);
				} else if (p1Card === parseInt(p2Card)) {
					alert("It's a Tie! Redraw!");
				}

				$("#player1score").html("<h6>" + scores.p1score + "</h6>");
				$("#player2score").html("<h6>" + scores.p2score + "</h6>");
				$("#cardsRemaining").html("<h6>" + carddrawn.remaining + "</h6>");

				console.log("P1 VALUE", p1Card);
				console.log("P2 VALUE", p2Card);

				p1Card = 0;
				p2Card = 0;



				setTimeout(function () {
					$(".player1Thumb").html("");
					$(".player2Thumb").html("");
				}, 1500);
				
				})
			.done(function () {
				});
			});

		console.log("Value of Player 2 Card", p2Card);

		
	}; // End of return function
});
