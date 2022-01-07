const express = require('express');
const app = express.Router();
app.get('/test', function (req, res) {

    var name = 'hello';

    res.render("./test.html", { name: name });

});