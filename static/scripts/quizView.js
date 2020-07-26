
var quizCounter = 0;
var currentQuestion = 1;


$(document).ready(function(){
	//alert('Loading JSON');


	// 

	$("#btnNext").click(function(){
		//alert('Next Button Clicked!');

		// Got to next question..

		clearPrevious();

		quizCounter +=1;
		currentQuestion +=1;
		displayQuestion(currentQuestion);

	});
		  
});


function loadQuestions(thePath,csrf){
	var quizText = $("#quizText").text();

	console.log(thePath);

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
        		quizData.push({"id" : object["pk"],"quizId" : object["fields"].quizId,"question" : object["fields"].quizQuestiontext,"quizAnswer" : object["fields"].quizAnswer,"quizResponses": object["fields"].quizResponses});
        	});

        	var response = JSON.parse(data);

        	//console.log(response.row[0].fields);

        	//$.each(data,function(index,object){
        	//	console.log("Email: " + data[index].email);

        	//	quizData.push({"Name" : data[index].name,"Email" : data[index].email});
        //	});

        	// Start Question load
        	//$("#quz")


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

	var questionIndex = quizCounter + 1;
	//alert(questionIndex);
	var quizOut = "<span class='QuestionText'>" + questionIndex + ". " + quizData[quizCounter].question + "</span>";
	$("#quizQuestion").append(quizOut);

	// Display Answers
	displayAnswers(currentQuestion,quizData[quizCounter].quizAnswer);
}


// Load Answers to question in index
function displayAnswers(currentQuestion,answer)
{

	//alert('Answers being displayed!! ' + currentQuestion);

	$.each(answerData,function(index,object){
		if(answerData[index].questionId == currentQuestion)
		{
			$("#quizAnswers").append("<a class='list-group-item Quizanswer' id='answer_" + answerData[index].answerId + "' href='javascript:checkAnswer(\"" + answerData[index].answerId + "\",\"" + answerData[index].questionId + "\")'>" + answerData[index].qAnswer + "</a>");		
		}

	});
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
				alert('You are Correct!');
				$("#answer_" + answer).css("background-color","lightgreen");

			}	
			else{
				alert('You are Wrong!');
				setTimeout(function(){
					$("#answer_" + quizData[index].quizAnswer).css("color","white");		
					$("#answer_" + quizData[index].quizAnswer).css("background-color","crimson");	
				},1500);
		

			}

			return false;
		}
	});


	//alert(answer + " : " + quizId);
}


// Clear out previous question info
function clearPrevious()
{
	$("#quizQuestion").empty();
	$("#quizAnswers").empty();
}
