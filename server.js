const express = require('express');
const hbs = require('hbs');
const fsHelpers = require('./src/fsHelpers');
const bodyParser = require('body-parser');
var app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is up and running on port ${port}`);
});

app.set('view engine', hbs); // set handlebars to be your view engine for dynamic templates

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`${req.url} : ${new Date().toDateString()}`);
    // res.render('maintanence.hbs');
    next();
});


app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        websiteName: 'My Website'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs');
});

app.get('/apis', (req, res) => {
    res.render('restapis.hbs');
});

//create a file - json array
app.post('/users', (req, res) => {
    fsHelpers.writeToFile(req.body, res);
});

//read entire file
app.get('/users', (req, res) => {
    fsHelpers.readFile(res);
});

//read based on id
app.get('/users/:id', (req, res) => {
    fsHelpers.readFileById(parseInt(req.params.id, 10), res);
});

//update based on id
app.put('/users', (req, res) => {
    var body = req.body;
    var id = body.id;
    var name = body.name;
    var age = body.age;
    fsHelpers.updateData(id, name, age, res);
});

//deletes the file itself
app.delete('/deleteFile', (req, res) => {
    fsHelpers.deleteFile(res);
});

//delete based on id
app.delete('/users/:id', (req, res) => {
    fsHelpers.deleteById(parseInt(req.params.id,10), res);
});

//delete all the elements one by one
app.delete('/users', (req, res) => {
    fsHelpers.deleteAll(res);
});
