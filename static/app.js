async function fetchServiceStatuses() {
    try {
        const response = await fetch('/check-services'); // Local API endpoint
        if (!response.ok) {
            throw new Error(`Failed to fetch service statuses: ${response.status}`);
        }

        const statuses = await response.json();
        console.log("Service statuses:", statuses);

        // Update the UI
        const servicesList = document.getElementById('services-list');
        servicesList.innerHTML = ''; // Clear the list

        statuses.forEach((service) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${service.url} - Status: ${service.status}`;
            
            if (service.ok) {
                listItem.className = 'service-available'; // Add class for styling
                listItem.onclick = () => window.location.href = service.url; // Make clickable
            } else {
                listItem.className = 'service-unavailable'; // Add class for styling
            }

            servicesList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error fetching service statuses:", error);
    }
}

// Fetch statuses every 10 seconds
setInterval(fetchServiceStatuses, 10000);
fetchServiceStatuses();