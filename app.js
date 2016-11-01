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
        question: 'Who was the apprentice of Medivh?',
        choicesArray: addRadioElements(['Varian Wrynn','Jaina Proudmoore','Aegwynn','Khadgar']),
        correctAnswer: 'Khadgar',
    }, {
        question: 'Who is the new Lich King?',
        choicesArray: addRadioElements(['Tirion Fordring','Kalecgos','Bolvar Fordragon','Uther']),
        correctAnswer: 'Bolvar Fordragon',
    }, {
        question: 'Which class is the most agile in World of Warcraft?',
        choicesArray: addRadioElements(['Hunter','Rogue','Demon Hunter','Druid']),
        correctAnswer: 'Demon Hunter',
    }, {
        question: 'Which faction are Pandaren associated with?',
        choicesArray: addRadioElements(['The Sha','Alliance','Horde','Both Alliance and Horde']),
        correctAnswer: 'Both Alliance and Horde',
    }, {
        question: 'What is the final raid in the Burning Crusade expansion?',
        choicesArray: addRadioElements(['Black Temple','Icecrown Citadel','Sunwell','The Emerald Dream']),
        correctAnswer: 'Sunwell',
    }, {
        question: 'Who killed Garrosh Hellscream?',
        choicesArray: addRadioElements(['Varian','Sylvannas','Thrall','Kalecgos']),
        correctAnswer: 'Thrall',
    }, {
        question: 'Who destroyed the Avatar of Sargeras?',
        choicesArray: addRadioElements(['Anduin Lothar','Khadgar','Velen','Aegwynn']),
        correctAnswer: 'Aegwynn',
    }, {
        question: 'Who was the Queen of the Night Elves?',
        choicesArray: addRadioElements(["Azshara","Malfurion","Tyrande","Illidan"]),
        correctAnswer: "Azshara",
    }, {
        question: 'Which weapon shattered Frostmourne?',
        choicesArray: addRadioElements(['Gorehowl','Doomhammer','Ashbringer','Aluneth']),
        correctAnswer: 'Ashbringer',
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
        $(".content").prepend("<p>Question: "+score.question+" of 10</p><p>"+score.correct+" correct/ "+score.wrong+" wrong</p>");
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
          if(score.question <= 10) {
          $(".button-controls").append("<button class='next-button'>Next Question</button>");
      }
          else {
          $(".button-controls").append("<button class='end-button'>End Quiz</button>");
          }
        });

    $("main").on("click","input", function () {
           $(".submit-button").prop("disabled",false);
    });
}

function changeQuestion(questions) {
    $("form, p, button").remove();
    if(score.question <= 10) {
    multipleQuestions(questions);
}
    else {
    finalPage(questions);
}
}
function finalPage (questions){
        $("form, p, button").remove();
        $(".content").prepend("<p>You have finised the Quiz!</p>");
        $(".content").prepend("<p>You got "+score.correct+" correct and "+score.wrong+" wrong</p>");
        $(".button-controls").prepend("<button class='retake-button'>Retake Quiz</button>");

}
var score = {
    i: 0,
    question: 1,
    correct: 0,
    wrong: 0
}