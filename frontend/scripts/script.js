// A function to load the troubleshooting page
function loadTrp() {
    window.location.href = "troubleshoot.html";
}

// A function to load the followup page
function loadFlup(sensation) {
	// Redirects to the folloup page with specific parameter
	window.location.href = 'followup.html?sensation=' + sensation;
}

// A function to load the question page
function loadQsp(symptom_id) {
	// Redirects to the folloup page with specific parameter
	window.location.href = 'questions.html?symptom_id=' + symptom_id;
}

// A function to load the resolving page using the question_id as a parameter
function loadRsp(symptom_id, question_id) {
	// Redirects to the folloup page with specific parameter
    window.location.href = 'resolve.html?symptom_id=' + symptom_id + '&question_id=' + question_id;
}

// A function to get the followup content of a sensation
function getFollowups(sensation) {

    apiurl = 'http://localhost:5000/api/symptoms/Sensation/' + sensation
    return fetch(apiurl)
    .then(response => {
        // Check if the request was successful (status code 2xx)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Parse the JSON response
        return response.json();
    })
    .catch(error => {
        // Handle errors
        console.error('Error fetching data:', error);
    });
}

// A function to get the questions for a specific symptom_id
function getQuestions(symptom_id) {
    
    apiurl = 'http://localhost:5000/api/questions/' + symptom_id
    return fetch(apiurl)
    .then(response => {
        // Check if the request was successful (status code 2xx)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Parse the JSON response
        return response.json();
    })
    .catch(error => {
        // Handle errors
        console.error('Error fetching data:', error);
    });
}

// A function to get the problems fot a specific symptom_id
function getProblem_symptom_id(symptom_id) {
    apiurl = 'http://localhost:5000/api/problems/Symptom_id/' + symptom_id;
    return fetch(apiurl)
    .then(response => {
        // Check if the request was successful (status code 2xx)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Parse the JSON response
        return response.json();
    })
    .catch(error => {
        // Handle errors
        console.error('Error fetching data:', error);
    });

}

// A function to get the questions for a specific question_id
function getProblem_question_id(question_id) {
    apiurl = 'http://localhost:5000/api/problems/' + question_id;
    return fetch(apiurl)
    .then(response => {
        // Check if the request was successful (status code 2xx)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Parse the JSON response
        return response.json();
    })
    .catch(error => {
        // Handle errors
        console.error('Error fetching data:', error);
    });

}

// Function to get query parameters from the URL
function getQueryParam(name) {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(name);
}

// A fuction that creates buttons on the followup page
function createFluButtons(buttonNames) {
	var container = document.getElementById("buttonsContainerFlu");
    
	for (let i = 0; i < buttonNames.length; i++) {
		var button = document.createElement("button");
		button.innerHTML = buttonNames[i].Symptom;

		// event listner to be added here
        button.addEventListener("click", function () {
            handleButtonClick(buttonNames[i]);
        });

		container.appendChild(button);
	}
	
}

// A function that creates buttons on the questions page
function createQsButtons(buttonNames) {
	var container = document.getElementById("buttonsContainerQs");
    
	for (let i = 0; i < buttonNames.length; i++) {
		var button = document.createElement("button");
		button.innerHTML = buttonNames[i].Question;
        //console.log(buttonNames[i]);
		 //event listner to be added here
        button.addEventListener("click", function () {
            loadRsp(buttonNames[i].Symptom_id, buttonNames[i].Question_id);
            console.log(buttonNames[i]);
        });

        

		container.appendChild(button);
	}
	
}

// A function to find the problem/solution pair assosiated with a symptom_id
function resolving_symptom_id(symptom_id) {
    
    var problemP = document.getElementById("problemParagraph");
    var solutionP = document.getElementById("solutionParagraph");

    var fullData;
    getProblem_symptom_id(symptom_id)
    .then(data => {
        fullData = data;
        problemP.innerHTML = fullData[0].Problem;
        solutionP.innerHTML = fullData[0].Solution;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });


}

// A function to find the problem/solution pair assosiated with a question_id
function resolving_question_id(question_id) {
    
    var problemP = document.getElementById("problemParagraph");
    var solutionP = document.getElementById("solutionParagraph");

    var fullData;
    getProblem_question_id(question_id)
    .then(data => {
        fullData = data;
        problemP.innerHTML = fullData[0].Problem;
        solutionP.innerHTML = fullData[0].Solution;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

}

// A function that determine what to do when a button is clicked
function handleButtonClick(symptom) {
    if (symptom.Followup_available === 'TRUE') {
        var symptom_id = symptom.Symptom_id;
        loadQsp(symptom_id);
    }

    else {
        console.log('has no followup')
        symptom_id = symptom.Symptom_id;
        console.log(symptom_id);
        let question_id = 0;
        console.log(question_id)
        loadRsp(symptom_id, question_id);
        //console.log(symptom_id);
        //console.log(question_id);
    }
}