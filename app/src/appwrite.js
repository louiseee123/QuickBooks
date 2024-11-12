import { Client, Databases } from 'appwrite';

// Initialize the Appwrite client
const client = new Client();

// Set the endpoint and project ID
client
  .setEndpoint('https://myappwrite.com/v1') // Your API Endpoint
  .setProject('67231d040004276f65e2'); // Your project ID

const databases = new Databases(client);

// Replace with your actual database ID
const databaseId = '672324310013a37e1906'; // Use your database ID here
const firstnameFieldID = '6724a6d5001bb2c5463e'; // Firstname field ID (capital 'F')
const lastnameFieldID = '6724a6de001328cc5188'; // Lastname field ID
const genderFieldID = '6724a6ea0039b1c98789'; // Gender field ID
const yearlevelFieldID = '6724a6f50033b1ea2196'; // Year Level field ID
const passwordFieldID = '672387e600187fd3edae'; // Password field ID
const emailFieldID = '672387dd000e3d846fc1'; // Email field ID
const courseFieldID = '6724c55d00076b76bc84'; // Course field ID

// Export the required items
export { client, databases, databaseId, firstnameFieldID, lastnameFieldID, genderFieldID, yearlevelFieldID, courseFieldID, emailFieldID, passwordFieldID };
