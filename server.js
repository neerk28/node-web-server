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
})


app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        websiteName: 'My Website'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs');
})

app.get('/apis', (req, res) => {
    res.render('restapis.hbs');
})

app.post('/write', (req, res) => {
    fsHelpers.writeToFile(req.body, res);
});

app.delete('/deleteFile', (req, res) => {
    if (req.query.fileName !== 'data.json') {
        res.status(500).send('Invalid fileName');
    } else {
        fsHelpers.deleteFile(req.query.fileName, res);
    }
});

app.get('/read', (req, res) => {
    fsHelpers.readFile(res);
})

app.put('/update', (req, res) => {
    var id = parseInt(req.query.id, 10);
    var name = req.query.name;
    var age = parseInt(req.query.age, 10);
    fsHelpers.updateData(id, name, age, res);
})

app.put('/updateViaBody', (req,res) => {
    var body = req.body;
    var id = body.id;
    var name = body.name;
    var age = body.age;
    fsHelpers.updateData(id, name, age, res);
})
