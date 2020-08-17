
var quizCounter = 0;
var currentQuestion = 1;
var currScore = 0;
var numQuestions = 0;


$(document).ready(function(){
	//alert('Loading JSON');


	// 

	// Set Score to begin: 
	$("#scoreLbl").text(currScore);

	$("#btnNext").click(function(){
		//alert('Next Button Clicked!');

		// Got to next question..

		clearPrevious();

		quizCounter +=1;
		currentQuestion +=1;

		if(currentQuestion> numQuestions)
		{
			$("#quizText").css("display","none");
			$("#quizComplete").css("display","block");			
			

			// Set final score to screen
			$("#finalScore").text("YOU SCORED " + currScore + " OUT OF " + numQuestions);
		}
		else{
			displayQuestion(currentQuestion);

		// Clear out previous question result.
		$("#questionResponse").empty();

		// Update Question Index
		//alert(currentQuestion);
		$("#currQuestion").text(currentQuestion);
		
		}



	});
		  
});


function loadQuestions(thePath,csrf){
	var quizText = $("#quizText").text();

	console.log(thePath);
	//alert('Called');

	$.ajax({ 		  
        url: thePath ,
        type: 'post',
        datatype: "JSON",
		data: {"csrfmiddlewaretoken" : csrf },
        success: function(data) {
        	//alert('Call Made!!');
        	console.log("The data: " + data);

        	$.each(JSON.parse(data),function(index,object){
        		var theVal = object[index];
        		console.log(object["fields"].quizQuestiontext);
        		quizData.push({"id" : object["pk"],"quizId" : object["fields"].quizId,"question" : object["fields"].quizQuestiontext,"quizAnswer" : object["fields"].quizAnswer,"quizResponses": object["fields"].quizResponses,"questionType": object["fields"].questionType});
        	});

        	var response = JSON.parse(data);

        	//console.log(response.row[0].fields);

        	//$.each(data,function(index,object){
        	//	console.log("Email: " + data[index].email);

        	//	quizData.push({"Name" : data[index].name,"Email" : data[index].email});
        //	});

        	// Start Question load
        	//$("#quz")

        	// Set # of questions variable
        	numQuestions = quizData.length;

        	$("#numQuestions").text(numQuestions);

        },
        error: function() {
            alert('error with finding your address');
        }

    });

}



// Loads answers to current question to JSON Array
function loadQuizAnswers(thePath,csrf)
{



	$.ajax({ 		  
	    url: thePath ,
	    type: 'post',
	    datatype: "JSON",
		data: {"csrfmiddlewaretoken" : csrf },
	    success: function(data) {
	    	//alert('Call Made!!');
	    	console.log(data);

	    	//alert('You did it!!');

	    	$.each(JSON.parse(data),function(index,object){
	    		var theVal = object[index];
	    		//console.log(object["fields"].quizQuestiontext);
	    		//quizData.push({"quizId" : object["fields"].quizId,"question" : object["fields"].quizQuestiontext,"quizAnswer" : //object["fields"].quizAnswer,"quizResponses": object["fields"].quizResponses});
	    		answerData.push({"questionId" : object["fields"].questionId,"qAnswer": object["fields"].qAnswer,"answerId": object["pk"]});
	    	});

	    	var response = JSON.parse(data);

	    	// Start Question Load
	    	displayQuestion(currentQuestion);
	    },
	    error: function() {
	        alert('error with finding your address');
	    }

	});


	// You now have answer data so we can now load data to page... 

}


// Function load question
function displayQuestion(currentQuestion)
{

	// If question is "H" it's draggable in order
	if(quizData[quizCounter].questionType == "H")
	{
		//alert('Draggable Question!!');

	}

	// Question Selected..
	switch(quizData[quizCounter].questionType){
		case "H":
			var questionIndex = quizCounter + 1;
			//alert(questionIndex);
			var quizOut = "<span class='QuestionText'>" + questionIndex + ". " + quizData[quizCounter].question + "</span>";
			$("#quizQuestion").append(quizOut);
			displayAnswersH(currentQuestion,quizData[quizCounter].id);			
			break;
		default:
			var questionIndex = quizCounter + 1;
			//alert(questionIndex);
			var quizOut = "<span class='QuestionText'>" + questionIndex + ". " + quizData[quizCounter].question + "</span>";
			$("#quizQuestion").append(quizOut);

			// Display Answers
			displayAnswers(currentQuestion,quizData[quizCounter].id);			
	}

}


// Load Answers to question in index
function displayAnswers(currentQuestion,questionId)
{

	//alert('Answers being displayed!! ' + currentQuestion);

	$.each(answerData,function(index,object){
		if(answerData[index].questionId == questionId)
		{
			$("#quizAnswers").append("<a class='list-group-item Quizanswer' id='answer_" + answerData[index].answerId + "' href='javascript:checkAnswer(\"" + answerData[index].answerId + "\",\"" + answerData[index].questionId + "\")'>" + answerData[index].qAnswer + "</a>");		
		}

	});
}


// Display answers for Draggable
function displayAnswersH(currQuestion,questionId)
{
	// 
	//alert('Displaying Hybrid Questions!!');

	// Add sortable list to div first
	$("#quizAnswers").append("<div class='ui-sortable DraggableList' id='sortable1'>");

	$.each(answerData,function(index,object){
		if(answerData[index].questionId == questionId)
		{
			// Append to sortable div
			$("#sortable1").append("<li class='list-group-item ui-state-default ui-sortable-handle sortAnswers QuestionText' style='background-color:whitesmoke'><span>" + answerData[index].qAnswer + "</span></li>");
			//$("#quizAnswers").append("<a class='list-group-item Quizanswer' id='answer_" + answerData[index].answerId + "' href='javascript:checkAnswer(\"" + answerData[index].answerId + "\",\"" + answerData[index].questionId + "\")'>" + answerData[index].qAnswer + "</a>");		
		}


		// Make div sortable to order questions..
		$("#sortable1").sortable({
			containment: "parent",
			 update: function (event, ui) {
                    //alert('Hey Marc U');
                    var outVal = "";
                    // Loop through draggable values
                    $("#sortable1 li>span").each(function (i, el) {
                        //alert($(el).html())
                        outVal += $(el).html() + "^";
                    });

                    // Update sortable answer hidden text field.
                    $("#sortableAnswer").val(outVal);
             }
		});
		$( "#sortable1" ).disableSelection();

	});


		// Append small done button
		$("#quizAnswers").append("<div id='finishItem' align='center'><a href='javascript:checkAnswerSort(\"" + currQuestion + "\")'>Done</a></div>");	
		$("#quizAnswers").append("</div>");	
}


// Function to check Answer selected..
function checkAnswer(answer,questionId)
{

	//alert(answer);

	// Find question from JSON Array a see if it's correct
	$.each(quizData,function(index,object){
		if(quizData[index].id == questionId)
		{

			//alert('Correct Answer is: ' + quizData[index].quizAnswer);	
			// check if answer is correct.

			if(quizData[index].quizAnswer == answer)
			{
				//alert('You are Correct!');
				$("#answer_" + answer).css("background-color","lightgreen");
				$("#questionResponse").append("<span style='color:green'>You selected the CORRECT ANSWER</span>")

				// Increment Score Variable
				currScore+=1;
				$("#scoreLbl").text(currScore);	


			}	
			else{
				//alert('You are Wrong!');
				$("#questionResponse").append("<span style='color:red'>You selected the WRONG answer!!</span>")
				setTimeout(function(){
					$("#answer_" + quizData[index].quizAnswer).css("color","white");		
					$("#answer_" + quizData[index].quizAnswer).css("background-color","crimson");	
				},1500);
		

			}

			return false;
		}
	});
}

function checkAnswerSort(currQuestion)
{

	var correctAnswer = quizData[currentQuestion-1].quizAnswer;
	var userAnswer=  $("#sortableAnswer").val();

	console.log(correctAnswer + " : " + userAnswer);
	if(correctAnswer == userAnswer)
	{
		$(".sortAnswers").css("background-color","lightgreen");

		$("#finishItem").css("color","lightgreen");
		$("#finishItem").text("CORRECT!");

		// Increment Score Variable
		currScore+=1;
		$("#scoreLbl").text(currScore);	
	}
	else{
		$("#quizAnswers").empty();

		// Append correct answers...
		var correctArray = correctAnswer.split("^");

		$("#quizAnswers").append("<div class='ui-sortable DraggableList' id='sortable1'>");

		$.each(correctArray,function(index,object){
				// Append to sortable div
				if(correctArray[index].trim() != "")
				$("#sortable1").append("<li style='background-color:crimson;color:white' class='list-group-item ui-state-default ui-sortable-handle sortAnswers QuestionText'><span>" + correctArray[index] + "</span></li>");
		});


		$("#finishItem").css("color","red");
		$("#finishItem").text("INCORRECT!");


		$("#quizAnswers").append("<div id='finishItem' align='center'><br/><span style='color:crimson'>Incorrect</div>");

		$("#quizAnswers").append("</div>");	
	}

}


// Clear out previous question info
function clearPrevious()
{
	$("#quizQuestion").empty();
	$("#quizAnswers").empty();
}
