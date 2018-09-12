const express = require('express');
const hbs = require('hbs');

var app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is up and running on port ${port}`);
});


app.set('view engine', hbs); // set handlebars to be your view engine for dynamic templates
app.use((req, res, next) => {
    console.log(`${req.url} : ${new Date().toDateString()}`);
   // res.render('maintanence.hbs');
    next();
})


app.use(express.static(__dirname + '/public'));

app.get('/',(req, res) => {
    res.render('home.hbs', {
        websiteName: 'My Website'
    })
})

