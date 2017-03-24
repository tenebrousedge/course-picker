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
    var outerDiv = $('<div>', {'class': 'col-md-6 panel panel-info question', 'id': 'q' + questionnumber}).append(header, questionDiv);
    return $('form').prepend(outerDiv);
  };
  //expects string, [{option:option,value:value}, {...}]
  var generateCheckboxDiv = function(options, questionnumber) {
    //iterate over options to produce input and labels
    var wrapper = $('<div>', {'class': 'form-check'});
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

  // var nextQuestion = function() {
  //   var current = $('.question:visible');
  //   var next = current.next();
  //   current.toggle('slide', 'left');
  //   next.toggle('slide', 'left');
  // };

  // var previousQuestion = function() {
  //   var current = $('.question:visible');
  //   var prev = current.prev();
  //   current.toggle('slide', 'right');
  //   prev.toggle('slide', 'right');
  // };

  var getAnswersFromForm = function() {
    var results = {'ruby' : 0, 'php' : 0, 'android' : 0};
    $('form input:checked').each(function(idx, elem) {
      results[$(elem).val()] += 1;
    });
    return results;
  };

  //expected structure {ruby:int, php: int, android}
  var determineTrack = function(answers) {
    return Object.keys(answers).reduce(function(a, b) {
      return answers[a] > answers[b] ? a : b ;
    });
  };

  var getResult = function() {
    return determineTrack(getAnswersFromForm());
  };

  var showResult = function(result) {
    $('#result img').hide();
    if (es6Check()) {
      $(`#${result}`).show();
    } else {
      $('#' + result).show();
    }
  };
  $(questions.reverse()).each(function(idx, q) {
    insertQuestion(q.question, q.options, idx);
  });
  // $('.question').first().show();
  // $('button.nav').click(function() {
  //   //there has to be a better way to write this conditional
  //   if ($('.question:visible').prop('id') === '5') {
  //     $('#submit').show();
  //   } else {
  //     $('#submit').hide();
  //   }
  // });
  // $('button#next').click(nextQuestion);
  // $('button#prev').click(previousQuestion);
  $('form').submit(function(e) {
    e.preventDefault();
    showResult(getResult());
  });
});
