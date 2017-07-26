# node-express-api

This is a simple app to for api using node, express and mysql as database

# Steps to make the app run

  - Create a new database in your localhost
  - change the database configuration in the connections.js file
  - run `npm install`
  - run `npm start`
  - navigate to `http://localhost:3000/items` to see the list of item

# Routes
 - **GET** `http://localhost:3000/items` *(Get all items)*
 - **GET** `http://localhost:3000/items/:id` *(Get a item)*
 - **POST** `http://localhost:3000/items` *(Create a new item)*
 - **PATCH** `http://localhost:3000/items/:id` *(Update a item)*
 - **DELETE** `http://localhost:3000/items/:id` *(Delete a item)*
