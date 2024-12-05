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
document.addEventListener('DOMContentLoaded', fetchServices);

async function checkServiceStatus(urls) {
    const results = await Promise.all(
        urls.map(async (url) => {
            try {
                const response = await fetch(url, {
                    method: "GET",
                    mode: "no-cors", // Adjust this based on your setup
                });
                return { url, status: response.status, ok: response.ok };
            } catch (error) {
                return { url, status: "unreachable", ok: false, error: error.message };
            }
        })
    );

    return results;
}

// List of Cloud Run service URLs
const cloudRunUrls = [
    "https://graph-639312966170.us-central1.run.app",
    "https://news-639312966170.us-central1.run.app",
    "https://cryptocurrencies-front-639312966170.us-central1.run.app"
];

checkServiceStatus(cloudRunUrls).then((results) => {
    console.log("Service statuses:", results);
});

// Example: Add links to ping
//addUrlToPingList("https://graph-639312966170.us-central1.run.app");
//addUrlToPingList("https://news-639312966170.us-central1.run.app");
//pingUrls();
