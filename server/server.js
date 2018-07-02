

const fs = require('fs');
const historyApiFallback = require('connect-history-api-fallback');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('../webpack.config');

const isDev = process.env.NODE_ENV !== 'production';

const express = require('express');
const mongoose = require('mongoose');
const User = require('./Models/User');
const Event = require('./Models/Event');

const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const cloudinary = require('cloudinary')
const logger = require('morgan');
let contactUs = require('./routes/contact');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})



const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;
app.use(passport.initialize());
app.use(passport.session());
let usersRouter = require('./routes/users');
app.use(logger('dev'));
let eventsRouter = require('./routes/events');
app.use('/api',usersRouter);
app.use('/api/events', eventsRouter);
app.use('/api/contactus',contactUs);
//let uri = 'mongodb+srv://kanlip:hX7qw3OBbBjgOcha@kanprofile-c64gl.mongodb.net/madi';

let uri='mongodb://localhost:27017/madi'
mongoose.connect(uri)
.then(connection => {
    console.log('Connected to MongoDB')
})
.catch(error => {
  console.log(error.message)
 })
app.use('/images', express.static(__dirname + '/client/src/images/'));



app.post('/uploadImage', (req, res) => {
  console.log('/uploadImage')
  console.log(req.body)
  // you can do whatever you want with this data
  // change profile pic, save to DB, or send it to another API 
  res.end()
})
if (isDev) {
  const compiler = webpack(webpackConfig);

  app.use(historyApiFallback({
    verbose: false
  }));

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: path.resolve(__dirname, '../client/public'),
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
  app.use(express.static(path.resolve(__dirname, '../dist')));
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    res.end();
  });
}

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }

  console.info('>>> 🌎 Open http://0.0.0.0:%s/ in your browser.', port);
});