// A function to load the troubleshooting page
function loadTrp() {
    window.location.href = "troubleshoot.html";
}

function getData() {

    const flist = []	
    // Replace 'https://api.example.com/data' with the actual API endpoint
    fetch('http://localhost:5000/api/symptoms/Sensation/hear')
        .then(response => {
            // Check if the request was successful (status code 2xx)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Parse the JSON response
            return response.json();
        })
        .then(data => {
            // Handle the data from the API
            console.log('Data from the API:', data);
	    for (let i = 0; i < data.length; i++) {
		    flist.push(data[i].Symptom);
	    }
	    console.log(flist);
        })
        .catch(error => {
            // Handle errors
            console.error('Error fetching data:', error);
        });
}
