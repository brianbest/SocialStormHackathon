(function(document) {
  'use strict';

  document.addEventListener('polymer-ready', function() {
    // Perform some behaviour
    console.log('Polymer is ready to rock!');
  });

// wrap document so it plays nice with other libraries
})(wrap(document));

if (!('webkitSpeechRecognition' in window)) {
  console.log(":(");
} else {
  var recognition = new webkitSpeechRecognition();
}


function sayMessage(){
  console.log(this.innerHTML);
}

////Brian's speech to text
////=========================================================
//function speechQuestion(a){
//  $('.speechQuestion').removeClass('hide');
//  var asked_answer = a.toLowerCase();
//
//  //The Magic area!
//  //===================================================
//  recognition.continuous = false;
//  recognition.onresult = function(event) {
//    transcript = event.results[0][0].transcript;
//    transcript = transcript.toLowerCase();
//    document.getElementById('capText').innerHTML = transcript;
//  };
//  recognition.onend = function() {
//    recognition.stop();
//    if (transcript === asked_answer){
//      var msg = new SpeechSynthesisUtterance('correct!');
//      window.speechSynthesis.speak(msg);
//      total_scoreV++;
//      total_overall++;
//      total_asked++;
//      $('.speechQuestion').addClass('hide');
//      getNewQuestion();
//
//      //alert('Right!');
//    }else{
//      var msg = new SpeechSynthesisUtterance('wrong!');
//      window.speechSynthesis.speak(msg);
//      $('.speechQuestion').addClass('hide');
//      total_asked++;
//      getNewQuestion();
//      //alert('WRONG! -- GTFO!');
//    }
//  };
//  recognition.onerror = function(event) {
//    var interim_transcript = event;
//    console.log("error: " + interim_transcript);
//  };
//}
//
////===================================================
