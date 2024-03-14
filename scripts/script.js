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

// A function to load the tips page using the tip_id as a parameter
function loadtpp() {
    // Generate a random integer between 1 and 50 (inclusive)
    var tip_id = Math.floor(Math.random() * 50) + 1;

    // Redirects to the tips page with specific id
    window.location.href = 'tips.html?tip_id=' + tip_id;
}

// A function to load the question page
function loadObdp(code) {
	// Redirects to the folloup page with specific parameter
	window.location.href = 'obd.html?obd=' + code;
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

function getTips_id(tip_id) {
    apiurl = 'http://localhost:5000/api/tips/' + tip_id;
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

function getObd_code(code) {

    apiurl = 'http://localhost:5000/api/obd/' + code;
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
// A function that presents selected tips
function present_tips(tip_id) {
    var short_tip = document.getElementById("tip_short");
    var long_tip = document.getElementById("tip_long");

    var fullData;
    getTips_id(tip_id)
    .then(data => {
        fullData = data;
        console.log(fullData);
        short_tip.innerHTML = fullData[0].Tip_short;
        long_tip.innerHTML = fullData[0].Tip_long;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

// A function that presents selected obd code
function present_obd(code) {
    var obd_code = document.getElementById("obd-code");
    var obd_des = document.getElementById("obd-description");

    var fullData;
    getObd_code(code)
    .then(data => {
        fullData = data;
        console.log(fullData);
        obd_code.innerHTML = fullData[0].Code;
        obd_des.innerHTML = fullData[0].Description;
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
// A function to display an id-specific section of a page
function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// A function that handles the search functionality
function handleSearch() {
    event.preventDefault();
    // Get the text entered in the search input
    var searchText = document.getElementById("searchInput").value;
    
    // loads the obd page with the given code
    loadObdp(searchText);
    
    document.getElementById("searchInput").value = "";
}

// A function to focuse the cursor on the search bar
function focusSearchInput() {
    var searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.focus();
    }
}