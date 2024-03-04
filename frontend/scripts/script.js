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

// A function to load the resolving page using the symptom_id as a parameter
function loadRsp_symptom_id(symptom_id) {
	// Redirects to the folloup page with specific parameter
	window.location.href = 'resolve.html?symptom_id=' + symptom_id;
}

// A function to load the resolving page using the question_id as a parameter
function loadRsp_question_id(question_id) {
	// Redirects to the folloup page with specific parameter
	window.location.href = 'resolve.html?question_id=' + question_id;
}

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

function getProblem_symptom_id(symptom_id) {
    apiurl = 'http://localhost:5000/api/problems/Symptom_id/' + symptom_id
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

function getProblem_question_id(question_id) {
    apiurl = 'http://localhost:5000/api/problems/' + question_id
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

function createQsButtons(buttonNames) {
	var container = document.getElementById("buttonsContainerQs");
    
	for (let i = 0; i < buttonNames.length; i++) {
		var button = document.createElement("button");
		button.innerHTML = buttonNames[i].Question;

		// event listner to be added here
        //button.addEventListener("click", function () {
          //  handleButtonClick(buttonNames[i]);
        //});

        // loadRsp(buttonName[i].Symptom_id, buttonName[i].Question_id);

		container.appendChild(button);
	}
	
}

function resolving_symptom_id(symptom_id) {
    
    var problemP = document.getElementById("problemParagraph");
    var solutionP = document.getElementById("solutionParagraph");

    var fullData;
    getProblem_symptom_id(symptom_id)
    .then(data => {
        fullData = data;
        problemP.innerHTML = fullData[0].Problem;
        solutionP.innerHTML = fullData[0].Solution;
        console.log(fullData);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });


}


function resolving_question_id(question_id) {
    var problemP = document.getElementById("problemParagraph");
    var solutionP = document.getElementById("solutionParagraph");

    var fullData;
    getProblem_question_id(question_id)
    .then(data => {
        fullData = data;
        problemP = fullData.Problem;
        solutionP = fullData.Solution;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    problemP.innerHTML = fullData.Problem;
    solutionP.innerHTML = fulldata.Solution;

}

function handleButtonClick(symptom) {
    if (symptom.Followup_available === 'TRUE') {
        let symptom_id = symptom.Symptom_id;
        loadQsp(symptom_id)
    }
    else {
        console.log('has no followup')
        let symptom_id = symptom.Symptom_id;
        loadRsp_symptom_id(symptom_id);
    }
}