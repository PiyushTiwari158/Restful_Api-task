RESTful API for Product and Category Data
This is a simple RESTful API built with Node.js and MongoDB that allows for 
creating, reading, updating, and deleting product and category data. 
The API follows typical RESTful API design patterns and stores data in a MongoDB database.

Installation
To use this API, you must first have Node.js and MongoDB installed on your machine.

Clone this repository to your local machine.
Navigate to the root directory of the project in your terminal.
Run npm install to install the necessary dependencies.
Usage
To start the server, run npm start in your terminal. The server will run on localhost:3000 by default.

Endpoints
This API provides the following endpoints:

POST /categories: Create a new category.

GET /categories/:categoryId: Retrieve a specific category by ID.

GET /categories: Retrieve all categories.

PUT /categories/:categoryId: Update a specific category by ID.

DELETE /categories/:categoryId: Delete a specific category by ID.

POST /products: Create a new product.

GET /products/:productId: Retrieve a specific product by ID.

GET /products: Retrieve all products.

PUT /products/:productId: Update a specific product by ID.

DELETE /products/:productId: Delete a specific product by ID.

Contributing:
If you would like to contribute to this project, please submit a pull request. All contributions are welcome.
API Documentation link:
https://www.postman.com/api-documentation-tool/
