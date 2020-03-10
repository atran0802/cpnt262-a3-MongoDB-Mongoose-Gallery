const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const ejs = require('ejs');
const pageTitle = require('./pageTitle');
const gallery = require('./gallery');

/* Runs express */
const app = express();

/* Runs ejs */
app.set('view engine', 'ejs');

app.locals.gallery = gallery;

/* Serving static files in express */
app.use(express.static(path.join(__dirname, 'public')));

/* Mongoose/MongoDB Connection */
const dbURI = process.env.MONGODB_URL;
mongoose.connect(dbURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

/* Connect to database */
var db = mongoose.connection;

/* .on event for errors */
db.on('error', function(error){
  console.log(`Connection Error: ${error.message}`)
});

/* .once event for successful connection */
db.once('open', function() {
  console.log('Connected to DB...');
});

/* Get endpoint handlers to render */
app.get('/',function(req, res) {  
  res.render('index',pageTitle.index);
});

app.get('/gallery',function(req, res) {  
  res.render('gallery',pageTitle.gallery);
});

app.get('/gallery',function(req, res) {  
  res.render('gallery',{gallery});
});

app.get('/gallery/:id',function(req, res) {
  for (photo of gallery){
    if (photo.id == req.params.id){
      res.render('galleryId',{title: req.params.id})
  }}
});

/* Returns 404 error */
app.use(function(req, res, next) {
  res.status(404);
  res.send('404: File Not Found');
});

/* Localhost: 3000 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});