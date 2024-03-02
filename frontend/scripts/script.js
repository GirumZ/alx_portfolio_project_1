// A function to load the troubleshooting page
function loadTrp() {
    window.location.href = "troubleshoot.html";
}

// A function to load the followup page
function loadFlup(sensation) {
	// Redirects to the folloup page with specific parameter
	window.location.href = 'followup.html?sensation=' + sensation;
}

function getData(sensation) {

    const flist = []	
    // Replace 'https://api.example.com/data' with the actual API endpoint
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

// Function to get query parameters from the URL
function getQueryParam(name) {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(name);
}

function createButtons(buttonNames) {
	var container = document.getElementById("buttonsContainer");
    
	for (let i = 0; i < buttonNames.length; i++) {
		var button = document.createElement("button");
		button.innerHTML = buttonNames[i].Symptom;

		// event listner to be added here

		container.appendChild(button);
	}
	
}
