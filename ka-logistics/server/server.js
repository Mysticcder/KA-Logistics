import express from 'express';  // Use ES module import
import fetch from 'node-fetch';  // Import node-fetch dynamically
import { config } from './config.json';  // If you're using JSON config

const app = express();
const port = 3000;

// Load config file
const config = require('./config.json');

// API route to get number of VTC members
app.get('/api/vtc-members', async (req, res) => {
    try {
        const vtcId = config.truckersmp.vtcId;
        const apiKey = config.truckersmp.apiKey;

        // Fetch member data from TruckersMP API using fetch
        const response = await fetch(`https://api.truckersmp.com/v2/virtual-truckers/${vtcId}/members`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        // Parse the response data
        const data = await response.json();

        // Extract the number of members from the response
        const memberCount = data.count;

        // Send the number of members back to the frontend
        res.json({ members: memberCount });
    } catch (error) {
        console.error('Error fetching data from TruckersMP:', error);
        res.status(500).send('Error fetching data');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
