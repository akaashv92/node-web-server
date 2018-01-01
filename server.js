const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req,res, next) => {
  var now = new Date();
  var log = `${now} ${req.method}: ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log +'\n' , (err) => {
    if(err){
      console.log('Couldnt append file');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     errorMessage : 'Will be back up soon, Try again later'
//   })
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})
app.get('/', (req,res) => {
  res.render('home.hbs', {
    pageName : 'Home Page',
    welcomeMessage : 'Welcome to my home page'
  });
});

app.get('/jsonData', (req,res) => {
  res.send({
    Name : 'Akaash',
    Age : '25'
  });
});

app.get('/about' , (req,res) => {
  res.render('about.hbs', {
    pageName : 'About Page'
  });
})

app.get('/home', (req,res) => {
  res.send('Home Page');
})

app.get('/bad', (req,res) => {
  res.send({
    errorMessage : 'Bad Request'
  })
})
app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});
