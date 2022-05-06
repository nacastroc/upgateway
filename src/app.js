var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index.route');
var gatewaysRouter = require('./routes/api/gateways.route');
var peripheralsRouter = require('./routes/api/peripherals.route');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/gateways', gatewaysRouter);
app.use('/api/peripherals', peripheralsRouter);

app.use(function (req, res, next) {
    res.sendStatus(404);
})

app.use(function (err, req, res, next) {
    res.status(500);
    res.send({ message: err.message, stack: err.stack });
})

module.exports = app;
