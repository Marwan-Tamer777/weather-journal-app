// Setup empty JS object to act as endpoint for all routes
projectData = {};

/* student note here: why am i asked to make a server js file if i will be using  a third party API?
 i don't need to access this file at all to retrive any data as it
doesn't need to host/store/send any data in it in the first place*/

/* Dependencies */
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('website'))
const port = 3000

//callback to check if the server is working
const server = app.listen(port, listening)
function listening(){
    console.log(`running on localhost: ${port}`);
  };

// Setup Server
//post and get functions
app.get('/all', sendData);

app.post('/data', addData);

function addData (req,res){
    projectData.push(req.body);
};

function sendData (req,res){
    res.send(projectData);
};
