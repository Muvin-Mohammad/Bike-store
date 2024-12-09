<!-- Assignment 2 - Bike Store API -->
This project is a TypeScript-driven Node.js application that utilizes Express.js for building a robust server-side API. It integrates MongoDB with Mongoose to provide a seamless database solution. The API focuses on managing bikes and orders, while offering features like inventory control, revenue calculations, and efficient data handling.

<!-- Key Features -->
<!-- Bike Management -->
<!-- CRUD Operations:  -->
Create, read, update, and delete bikes in the database.
<!-- Inventory Control: -->
 Keep track of available bike quantities.
<!-- Search & Filter:  -->
Find bikes based on name, brand, or category using query parameters.
Order Management
<!-- Place Orders: -->
 Simplify the process of ordering bikes.
Revenue Calculation: Compute total revenue from all orders effortlessly.
Modern Development Practices
<!-- TypeScript:  -->
Ensures type safety and reliability during development.
<!-- Express.js:  -->
Provides a lightweight, fast, and flexible framework for API development.
<!-- MongoDB & Mongoose: -->
 Secure and scalable data storage with an intuitive ODM for MongoDB.
<!-- Data Validation:  -->
Ensures correctness using Zod for schema validation.
<!-- Environment Variables:  -->
Manages sensitive configurations with dotenv for security.

Prerequisites
Ensure the following are installed on your system:

Node.js - npm i or npm install
npm or yarn
MongoDB (local installation or a cloud-based instance like MongoDB Atlas)
Installation Steps
Clone the repository:

bash
Copy code
git clone <repository-url>  
cd assignment-2  
Install dependencies:

bash
Copy code
npm install  
Configure environment variables:

Create a .env file in the root directory.
Add the required configurations like MongoDB connection string.
Start the server:
npm run start:dev

bash
Copy code
npm run dev  
Technologies Used

<!-- Programming Language:  -->
TypeScript
Web Framework: Express.js
Database: MongoDB with Mongoose
Validation Library: Zod
Environment Management: dotenv
