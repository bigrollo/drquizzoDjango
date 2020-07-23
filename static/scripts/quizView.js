
var quizCounter = 0;


$(document).ready(function(){
	//alert('Loading JSON');


	// 

		  
});


function loadQuestions(thePath,csrf){
	   var quizText = $("#quizText").text();
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
        	$("#quz")


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
	    	displayQuestion();
	    },
	    error: function() {
	        alert('error with finding your address');
	    }

	});


	// You now have answer data so we can now load data to page... 

}


// Function load question
function displayQuestion()
{

	var questionIndex = quizCounter + 1;
	var quizOut = "<span class='QuestionText'>" + questionIndex + ". " + quizData[quizCounter].question + "</span>";
	$("#quizQuestion").append(quizOut);

	// Display Answers
	displayAnswers();
}


// Load Answers to question in index
function displayAnswers()
{
	$.each(answerData,function(index,object){
		$("#quizAnswers").append("<a class='list-group-item Quizanswer' href='javascript:checkAnswer(\"" + answerData[index].answerId + "\",\"" + answerData[index].questionId + "\")'>" + answerData[index].qAnswer + "</a>");
	});
}


// Function to check Answer selected..
function checkAnswer(answer,quizId)
{

	// Find question from JSON Array a see if it's correct
	$.each(quizData,function(index,object){
		if(quizData[index].id = quizId)
		{

			// check if answer is correct.
			if(quizData[index].quizAnswer == answer)
			{
				alert('You are Correct!');
			}	
			else{
				alert('You are Wrong!');
			}

			return false;
		}
	});


	//alert(answer + " : " + quizId);
}
