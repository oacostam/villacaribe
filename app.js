var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var I18n = require('i18n-2');
var indexRoute = require('./routes/index');
var legalRoute = require('./routes/legal');
var picturesRoute = require('./routes/pictures');

var app = express();

// This middleware must come first because cookies are needed for text translations.
app.use(cookieParser());

//Static content
app.use(express.static(path.join(__dirname, 'public')));

// Attach the i18n property to the express request object
// And attach helper methods for use in templates
I18n.expressBind(app, {
    // setup some locales - other locales default to en silently
    locales: ['it', 'en', 'de', 'es'],
    directory: 'locales', 
    extension: '.json',
    devMode: (app.get('env') === 'development'),
    cookieName : 'lang'
});

// Set locale from query string, as the url with lang parameter is used in
// page header hreflang attribute. Language is also set to cookie when clicked in the corresponding flag
app.use(function (req, res, next) {
    req.i18n.setLocaleFromQuery(req);
    res.set('charset', 'utf-8');
    res.setHeader('Content-Language', req.i18n.getLocale());
    next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('stylus').middleware(path.join(__dirname, 'public')));



app.use('/', indexRoute);
app.use('/legal', legalRoute);
app.use('/pictures', picturesRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
