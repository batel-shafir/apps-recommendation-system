const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const apps = require('./data/apps.json');
const categories = require('./data/categories.json');
let user;

const app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/api/login',(req, res) => {
   user = req.body;
});

const predicateForflter = (application) => {
    const { rating, interests, age } = user;
    return(
        application.rating >= rating 
        && (application.category == interests[0] || application.category == interests[1] || application.category == interests[2])
        && application.min_age <= age)
}

app.get('/api/getApps', (req,res) => { 
    const relevantApps = apps.filter( application => {
        return (predicateForflter(application))
    });
    res.json(relevantApps);
});

app.get('/api/categories', (req,res) => { 
    res.json(categories);
});


// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);