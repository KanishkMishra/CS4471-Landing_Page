// Function to fetch and display microservices
async function fetchServices() {
    try {
        // API endpoint for retrieving microservices (update with your real API URL)
        const response = await fetch('https://www.alphavantage.co/documentation/#');
        if (!response.ok) {
            throw new Error(`Failed to fetch services: ${response.status}`);
        }

        const services = await response.json();

        // Get the services list container
        const servicesList = document.getElementById('services-list');

        // Dynamically create list items for each service
        services.forEach(service => {
            const listItem = document.createElement('li');
            listItem.textContent = service.name; // Assuming the API returns a "name" field
            listItem.onclick = () => {
                // Redirect to the service's external URL
                window.location.href = service.url; // Assuming API returns a "url" field
            };
            servicesList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error loading services:', error);
        alert('Failed to load services. Please try again later.');
    }
}

// Load services when the page loads
//document.addEventListener('DOMContentLoaded', fetchServices);

let activeUrls = []; // List to store URLs to be pinged

function pingUrls() {
    setInterval(() => {
        activeUrls.forEach((url, index) => {
            fetch(url)
                .then(response => {
                    if (response.ok) {
                        console.log(`Successfully pinged: ${url}`);
                        // If a URL was previously removed after failure, re-add it here (optional)
                    } else {
                        console.log(`Error pinging ${url}: ${response.status}`);
                        // Remove failed URL
                        activeUrls.splice(index, 1); 
                    }
                })
                .catch(error => {
                    console.log(`Error pinging ${url}: ${error}`);
                    // Remove failed URL if network error occurs
                    activeUrls.splice(index, 1);
                });
        });
    }, 5000);  // Ping every 5 seconds
}

// Add a URL to the list of URLs to be pinged
function addUrlToPingList(url) {
    if (!activeUrls.includes(url)) {
        activeUrls.push(url);
        console.log(`Added ${url} to the ping list.`);
    } else {
        console.log(`${url} is already in the ping list.`);
    }
}

// Example: Add links to ping
addUrlToPingList("https://graph-639312966170.us-central1.run.app/");
addUrlToPingList("https://news-639312966170.us-central1.run.app/");
pingUrls();
