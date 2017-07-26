
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', routes);

app.listen(PORT, function () {
    console.log('Node server is running  http://localhost:' + PORT);
});

module.exports = app;
