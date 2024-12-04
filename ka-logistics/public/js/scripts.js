// Contact form handler
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for contacting us!');
});
async function fetchDiscordStats() {
    const response = await fetch('/discord-stats');
    const data = await response.json();
    document.getElementById('discord-members').textContent = `Discord Members: ${data.members}`;
}
fetchDiscordStats();

// Function to fetch the number of members from your TruckersMP VTC
async function fetchVtcMembersCount() {
    const vtcId = '62215'; // Replace with your actual VTC ID
    const apiKey = '5672579'; // Replace with your TruckersMP API key
    const url = `https://api.truckersmp.com/v2/vtc/${vtcId}/members`; // API URL to get members of the VTC

    try {
        // Make a GET request to fetch VTC member data
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`, // Pass API Key for authorization
            },
        });

        // Parse the response to JSON
        const data = await response.json();

        // Check if the request was successful
        if (data.success) {
            const memberCount = data.payload.length; // Get number of members
            document.getElementById('vtc-member-count').textContent = memberCount;
        } else {
            console.error('Error fetching data from TruckersMP API:', data.message);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the function when the page loads
window.onload = fetchVtcMembersCount;
document.addEventListener("DOMContentLoaded", () => {
    const collapsibles = document.querySelectorAll(".collapsible");
    collapsibles.forEach((btn) => {
        btn.addEventListener("click", () => {
            const content = btn.nextElementSibling;
            if (content.style.display === "grid") {
                content.style.display = "none";
            } else {
                content.style.display = "grid";
            }
        });
    });
});

