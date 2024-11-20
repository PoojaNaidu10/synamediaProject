'use strict';

// Module dependencies.
var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    errorhandler = require('errorhandler'),
    cookieParser = require('cookie-parser'),
    session = require('express-session')

var app = module.exports = exports.app = express();

app.locals.siteName = "Synamedia";

app.use(cors())
//app.options('*', cors())
app.disable('etag');

app.use(cookieParser());

app.get('/', (req, res)=>{ 
  //shows all the cookies 
  res.send(req.cookies); 
  }); 

app.use(session({
  secret: 'secrect-key', 
  resave: true, 
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: true,
    maxAge: null // Time is in miliseconds
  },
}))

app.get("/", function(req, res){ 
  if(!req.session.viewCount) {
    req.session.viewCount = 1;
  } else {
    req.session.viewCount += 1;
  }
  return res.send({viewCount : req.session.viewCount}); 
}) 

// Connect to database
var db = require('./config/db');
const apiResponse = require('./utils/apiResponse');
app.use(express.static(__dirname + '/public'));
const router = express.Router();

// Bootstrap models
var modelsPath = path.join(__dirname, 'models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

var env = process.env.NODE_ENV || 'development';

if ('development' == env) {
    app.use(morgan('dev'));
    app.use(errorhandler({
        dumpExceptions: true,
        showStack: true
    }));
    app.set('view options', {
        pretty: true
    });
}

app.use(express.static(path.join(__dirname, 'uploads')))
app.use(express.static(path.join(__dirname, 'product_gallery')))

if ('production' == env) {
    app.use(morgan());
     app.use(errorhandler({
        dumpExceptions: false,
        showStack: false
    }));
}

var uploadDir = './uploads';
var documentsDir = './documents';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
if (!fs.existsSync(documentsDir)) {
    fs.mkdirSync(documentsDir);
}

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Bootstrap routes
var routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach(function(file) {
  app.use('/', require(routesPath + '/' + file));
});

// Bootstrap api
var apiPath = path.join(__dirname, 'api');
fs.readdirSync(apiPath).forEach(function(file) {
  app.use('/api', require(apiPath + '/' + file));
});


//app.set('trust proxy', true) // for user ip
// Time zone
process.env.TZ = "Asia/Calcutta";
console.log(new Date().toString());

//Start server

var port = process.env.PORT || 3002;
var host = process.env.PORT || '0.0.0.0';
app.listen(port, host, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});