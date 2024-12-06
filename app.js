async function checkServiceStatusAndUpdateUI(urls) {
    try {
        // Get the list container
        const servicesList = document.getElementById('services-list');
        if (!servicesList) {
            console.error("Element with ID 'services-list' not found.");
            return;
        }

        // Clear existing list items
        servicesList.innerHTML = '';

        // Check the statuses of the services
        const results = await Promise.all(
            urls.map(async (url) => {
                try {
                    const response = await fetch(url, { method: "GET" });
                    return { url, status: response.status, ok: response.ok };
                } catch (error) {
                    return { url, status: "unreachable", ok: false, error: error.message };
                }
            })
        );

        console.log("Service statuses:", results);

        // Add services with `ok: true` to the UI
        results.forEach((service) => {
            if (service.ok) {
                const listItem = document.createElement('li');
                listItem.textContent = service.url; // Display the service URL
                listItem.onclick = () => window.location.href = service.url; // Make it clickable
                servicesList.appendChild(listItem);
            } else {
                console.warn(`Service ${service.url} is not OK.`);
            }
        });
    } catch (error) {
        console.error("Error updating the service list:", error);
    }
}

// List of Cloud Run service URLs
const cloudRunUrls = [
    "https://graph-639312966170.us-central1.run.app",
    "https://news-639312966170.us-central1.run.app",
    "https://cryptocurrencies-front-639312966170.us-central1.run.app"
];

// Trigger the status check and UI update when the page loads
document.addEventListener('DOMContentLoaded', () => {
    checkServiceStatusAndUpdateUI(cloudRunUrls);
});
