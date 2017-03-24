var questions = [
  {
    'question': 'Do you like building apps, web pages, or both?',
    'options': [{'option' : 'apps', 'value' : 'android'}, {'option': 'web pages', 'value' : 'php'}, {'option': 'both', 'value': 'ruby'}]
  },
  {
    'question': 'Which do you like best?',
    'options': [{'option' : 'robots', 'value' : 'android'}, {'option': 'elephants', 'value' : 'php'}, {'option': 'gems', 'value': 'ruby'}]
  },
  {
    'question': 'Which feature would you prefer in a programming language?',
    'options': [{'option' : 'does not do unexpected things', 'value' : 'android'}, {'option': 'easy to get started', 'value' : 'php'}, {'option': 'reads like english', 'value': 'ruby'}]
  },
  {
    'question': 'What is your favorite food? (I ran out of real questions)',
    'options': [{'option' : 'electric sheep', 'value' : 'android'}, {'option': 'double-ended hammers', 'value' : 'php'}, {'option': 'programmer happiness', 'value': 'ruby'}]
  },
  {
    'question': 'Are you tired of questions yet?',
    'options': [{'option' : 'yes', 'value' : 'android'}, {'option': 'no', 'value' : 'php'}, {'option': 'I already started a drinking game', 'value': 'ruby'}]
  }
];

$(document).ready(function() {
  var es6Check = function() {
    try {
      var testVariable = 'test';
      // convert to boolean and return
      return !!`I may or may not be able to ${testVariable} this`;
    } catch (e) {return false;}
  };
  var insertQuestion = function(question, options, questionnumber) {
    var header = $('<h3>').text(question);
    var questionDiv = generateCheckboxDiv(options, questionnumber);
    var outerDiv = $('<div>', {'class': 'col-md-6 panel panel-info'}).append(header, questionDiv);
    return $('form').prepend(outerDiv);
  };
  //expects string, [{option:option,value:value}, {...}]
  var generateCheckboxDiv = function(options, questionnumber) {
    //iterate over options to produce input and labels
    var wrapper = $('<div>', {'id' : 'q' + questionnumber, 'class': 'form-check'});
    var inner = $.map(options, function(elem, idx){
      var id = 'q' + questionnumber + '_' + 'a' + idx;
      var label = $('<label>', {'class': 'form-check-label'});
      var option = generateInput(elem.value, id);
      label.append(option, elem.option);
      return label;
    });
    return wrapper.append(inner);
  };

  var generateInput = function(value, id) {
    return $('<input>', {'class': 'form-check-input', 'type': 'checkbox', 'value': value, 'id' : id});
  };

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
    var results = {'ruby' : 0, 'php' : 0, 'android' : 0};
    $('form input').each(function(idx, elem) {
      var val = $(elem).val();
      results[val] += 1;
    });
    return results;
  };

  //expected structure {ruby:int, php: int, android}
  var determineTrack = function(answers) {
    Object.keys(answers).reduce(function(a, b) {
      return answers[a] > answers[b] ? a : b ;
    });
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
  $(questions.reverse()).each(function(idx, q) {
    insertQuestion(q.question, q.options, idx);
  });
  $('#result img').hide();
  $('button#next').click(nextQuestion);
  $('button#prev').click(previousQuestion);
  $('form').submit(function(e) {
    e.preventDefault();
    showResult(getResult());
  });
});
