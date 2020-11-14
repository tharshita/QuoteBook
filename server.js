const serverless = require('serverless-http');
// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');

let cors = require('cors')

require('dotenv').config();

// Import Morgan
let morgan = require('morgan');
// Initialise the app
let app = express();

const NODE_ENV = process.env.NODE_ENV || 'development';

let port = process.env.PORT || 8080;

let quote = require('./app/routes/quote');

//db options
let options = {useNewUrlParser: true, 
                useUnifiedTopology: true };

// Connect to Mongoose and set connection variable
let mongoConnectionString = 
    NODE_ENV === 'production'
    ?`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@quotes.3lnlm.mongodb.net/Quotes?retryWrites=true&w=majority`
    :'mongodb://localhost/Quotes';


mongoose.connect(mongoConnectionString, {useNewUrlParser: true, useUnifiedTopology: true}).catch(e => {
    console.log("MONGODB ERROR", e);
    });;
var db = mongoose.connection;
// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")


//parse application/json and look for raw text
app.use(cors()) 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.get("/", (req, res) => res.json({message: "Welcome to Quotebank!"}));

app.route("/quote")
    .get(quote.getQuotes)
    .post(quote.postQuote);
app.route("/quote/:id")
    .get(quote.getQuote)
    .delete(quote.deleteQuote)
    .put(quote.updateQuote);


const server = app.listen(port, () => console.log(`Listening at port ${port}`));
module.exports.server = server; // for testing
      
module.exports.handler = serverless(app);
