$(document).ready(function() {
    var questions = loadArrayOfQuestions();
    $("button.start-button").click(function(event) {
        event.preventDefault();
        $("p").remove();
        $("button").remove();
        //Load First Question
        multipleQuestions(questions);
    });
    $(".button-controls").on("click",".next-button",function() {
        changeQuestion(questions);
    });
    $(".button-controls").on("click",".end-button",function() {
        finalPage();
    });
    $(".button-controls").on("click",".retake-button",function() {
        score.i=0;
        score.question=1;
        score.correct=0;
        score.wrong=0;
        changeQuestion(questions);
    });
});


function loadArrayOfQuestions() {
    var Array= [{
        question: 'Which of the following is not a class in World of Warcraft?',
        choicesArray: addRadioElements(['Mage','Warrior','Monk','Peon']),
        correctAnswer: 'Peon',
    }, {
        question: 'B',
        choicesArray: addRadioElements(['Question 1','Question 2','Question 3','Question 4']),
        correctAnswer: 'Question 2',
    }, {
        question: 'C',
        choicesArray: addRadioElements(['Question 5','Question 6','Question 7','Question 8']),
        correctAnswer: 'Question 7',
    }, {
        question: 'D',
        choicesArray: addRadioElements(['Question 9','Question 10','Question 11','Question 12']),
        correctAnswer: 'Question 12',
    } ];
    return Array;
}

function addRadioElements(questionsArray) {
    return questionsArray.map(function(item) {
        return "<input type='radio' name='question' value='"+item+"'>"+item+"<br>";
    });
}
function printQuestions(radioButtonArray) {
    var returnHTML = "<form>";
    for(var i=0;i<radioButtonArray.length;i++) {
        returnHTML += radioButtonArray[i];
    }
    return returnHTML+"</form>";
}
function multipleQuestions(questions,i) {
        $(".content").prepend("<p>"+questions[score.i].question+"</p>");
        $(".content").prepend("<p>Question: "+score.question+" of 4</p><p>"+score.correct+" correct/ "+score.wrong+" wrong</p>");
        $(".content").append("<p>"+printQuestions(questions[score.i].choicesArray)+"</p>");//Create a function to return questions list in the from
        $(".button-controls").prepend("<button class='submit-button' disabled>Submit Answer</button>");
        $(".submit-button").click(function() {
            $(this).remove();
            $("input").attr("disabled","disabled");
          if($("input:checked").val()===questions[score.i].correctAnswer) {
              $(".button-controls").prepend("<p>Correct Answer</p>");
              score.correct++;
              score.question++;
              score.i++;
          }
          else {
              $(".button-controls").prepend("<p>Wrong! The Correct Answer is: "+questions[score.i].correctAnswer+"</p>");
              score.wrong++;
              score.question++;
              score.i++;
          }
          if(score.question <= 4) {
          $(".button-controls").append("<button class='next-button'>Next Question</button>");
      }
          else {
          $(".button-controls").append("<button class='end-button'>End Quiz</button>");
          }
        });
        // $("button.next-button").click(function() {
        //    $(".content").append("<p>"+questions[i].choicesArray+"</p>");
        //    i++;
        //    if(i === Array.length-1) {
        //        //prepend content saying what is the score
        //    }
        // });
    $("main").on("click","input", function () {
           $(".submit-button").prop("disabled",false);
    });
    // $(".submit-button").click(function () {
    //       $("input").attr("disabled","disabled");
    //       $(".button-controls").prepend("<button class='next-button'>Next Question</button>");
    // });
    //       if($("input:checked").val()===questions[i].correctAnswer) {
    //           $(".button-controls").prepend("<p>Correct Answer</p>");
    //       }
    //       else {
    //           $(".button-controls").prepend("<p>Wrong! The Correct Answer is: "+questions[i].correctAnswer+"</p>");
    //       }
    // });
}
function changeQuestion(questions) {
    console.log("ABC FUNCTION RAN!");
    $("form, p, button").remove();
    if(score.question <= 4) {
    multipleQuestions(questions);
}
    else {
    finalPage(questions);
}
    // $("input, p, button").remove();
    // $(".button-controls").prepend("<button class='next-button'>Next Question</button>");
    // $(".content").prepend("<p>"+questions[i].question+"</p>");
    // $(".content").prepend("<p>Question: "+(i+1)+" of 10</p><p>"+score.correct+" correct/ "+score.wrong+" wrong");
}
function finalPage (questions){
        $("form, p, button").remove();
        $(".content").prepend("<p>You have finied the Quiz!</p>");
        $(".content").prepend("<p>You got "+score.correct+" correct and "+score.wrong+" wrong</p>");
        $(".button-controls").prepend("<button class='retake-button'>Retake Quiz</button>");

}
var score = {
    i: 0,
    question: 1,
    correct: 0,
    wrong: 0
}