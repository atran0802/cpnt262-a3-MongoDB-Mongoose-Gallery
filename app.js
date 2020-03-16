const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const ejs = require('ejs');
const pageTitle = require('./pageTitle');
const gallery = require('./gallery');
const Image = require('./models/Images.js');
const slugify = require('slugify');

/* App Setup */
const app = express();
app.set('view engine', 'ejs');

app.locals.gallery = gallery;

/* Serving static files in express */
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

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

// app.get('/gallery',function(req, res) {  
//   res.render('gallery',{gallery});
// });

// app.get('/gallery/:id',function(req, res) {
//   for (photo of gallery){
//     if (photo.id == req.params.id){
//       res.render('galleryId',{title: req.params.id})
//   }}
// });

/* GET /images */
app.get('/images', function(request, response){

  model.find(function(error, result) { 
    response.json(result);
  });
});  

/* GET /images/:id */
app.get('/images/:id', function(request,response){

  model.findOne({id: request.params.id},function(error, result) { 
    if(error){
      return console.log(error);
    }
    response.json(result);
  });
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