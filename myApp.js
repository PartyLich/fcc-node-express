
var express = require('express');
var app = express();

// --> 7)  Mount the Logger middleware here
app.use(logger);

// --> 11)  Mount the body-parser middleware  here


/** 1) Meet the node console. */
console.log("Hello World")

/** 2) A first working Express Server */
// app.get('/', (request, response) => response.send('Hello Express'));

/** 3) Serve an HTML file */
const relativePath = '/views/index.html';
const absolutePath = __dirname + relativePath
app.get('/', (request, response) => response.sendFile(absolutePath));


/** 4) Serve static assets  */
const staticAssetPath = __dirname + '/public';
app.use(express.static(staticAssetPath));


/** 5) serve JSON on a specific route */
app.get('/json', (request, response) => {
    const str = "Hello json";
    const message = process.env.MESSAGE_STYLE === 'uppercase' ? str.toUpperCase() : str;
    response.json({"message": message})
  }
);

/** 6) Use the .env file to configure the app */


/** 7) Root-level Middleware - A logger */
//  place it before all the routes !
/**  For every request, it should log in the console a string taking the following format:
 *  method path - ip
 */
function logger(req, res, next) {
  const requestInfo = `${req.method} ${req.path} - ${req.ip}`;
  console.log(requestInfo);
  next();
}

/** 8) Chaining middleware. A Time server */
/** add the current time to the request object
 */
function timer(req, res, next) {
  req.time =  new Date().toString();
  next();
}

app.get(
  '/now',
  timer,
  (req, res) => res.json({time: req.time})
);

/** 9)  Get input from client - Route parameters */
app.get(
  '/:word/echo',
  (req, res) => res.json({echo: req.params.word})
);

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
/** mounted at GET /name. 
 * Respond with a JSON document, taking the structure { name: 'firstname lastname'}. 
 * The first and last name parameters should be encoded in a query string 
 *    e.g. ?first=firstname&last=lastname
 */
const parseName = (req, res) => res.json({name: `${req.query.first} ${req.query.last}`});
app.route('/name')
  .get(parseName)
;


/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */



// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
