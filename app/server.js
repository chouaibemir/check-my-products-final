require('dotenv').config();
var express = require('express');
const cors = require('cors');
const errorHandler = require('./modules/core/middlewares/errors');
const bodyParser = require('body-parser');
const app = express();


// parse body params and attache them to req.body
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(function (req, res, next) {
  res.contentType('application/json');
  next();
});


// api routes
app.get('/', function (req, res) {
    res.send('Hello World!');
  });
app.use('/api/v1/products', require('./modules/products/products.controller'));

// error handler
app.use(errorHandler);

// start server
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'));



