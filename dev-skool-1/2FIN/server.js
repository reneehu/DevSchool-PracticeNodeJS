var express = require('express');
var path = require('path');
var nunjucks = require('nunjucks');

var app = express();

nunjucks.configure('view/html', {
    autoescape: true,
    express: app
});

app.use(express.static('view'));

app.get('/homepage.html', function(req, res) {
    res.render('homepage.njk');
});

app.get('/womens.html', function(req, res) {
    res.render('womens.njk');
});

app.get('/mens.html', function(req, res) {
    res.render('mens.njk');
});

app.get('/', function(req, res) {
    res.render('homepage.njk');
});

app.listen('3000', function(){
    console.log('I\'m listeniiiing');
});