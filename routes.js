const routes = require('express').Router();
const Item = require('./controllers/Item')

// default route
routes.get('/', function (req, res) {
    return res.send({ error: true, message: 'Please visit /items' })
});

// Retrieve all items
routes.get('/items', Item.getAllItems);

// Search for item with id
routes.get('/items/:id', Item.getItem);

// Add a new item
routes.post('/items', Item.createItem);

//  Update item with id
routes.patch('/items/:id', Item.updateItem);

//  Delete item
routes.delete('/items/:id', Item.deleteItem);

// all other requests redirect to 404
routes.all("*", function (req, res, next) {
    return res.send(404, 'route not found');
    next();
});

module.exports = routes;
