var es6Check = function() {
	try {
		var testVariable = 'test';
		// convert to boolean and return
		return !!`I may or may not be able to ${testVariable} this`;
	} catch (e) {return false;}
};

$(document).ready(function() {
	var slide = function(elem, direction) {
		elem.hide('slide', {direction: direction}, 300);
	};

	var nextQuestion = function() {
		slide($('+ .question', this), 'left');
	};

	var previousQuestion = function() {
		slide($('+ .question', this), 'left');
	};

	var getAnswersFromForm = function() {
		return $('form input').map(function(idx, elem) {
			//this will have to be more complex
			return parseInt(elem.val());
		});
	};

	//expected structure [{ruby:int},{php:int},{android:int}
	var determineTrack = function(answers) {
		Object.keys(answers).reduce(function(a, b){ return answers[a] > answers[b] ? a : b });
	};

	var getResult = function() {
		return determineTrack(getAnswersFromForm());
	};

	var showResult = function(result) {
		if (es6Check()) {
			$(`#${result}`).show();
		} else {
			$('#' + result).show();
		}
	};

	$('button#next').click(nextQuestion);
	$('button#prev').click(previousQuestion);
	$('button#submit').click(function() {
		showResult(getResult());
		return false;
	});
});