const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//Routes
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Zhandos Sadirbayev',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Jandosse',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Service',
    message: 'You need to reboot your computer',
    name: 'Zhandos',
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: 'Please provide your address via URL query string',
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    } else {
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          address,
          location,
          forecast: forecastData,
        });
      });
    }
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide search term',
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Oops! 404 page',
    message: 'Help article not found',
    name: 'Zhandos',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Oops! 404 page',
    message: 'Page not found',
    name: 'Zhandos',
  });
});

//Start listening
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
