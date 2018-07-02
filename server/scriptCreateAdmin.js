const User = require('./Models/User');
const mongoose = require('mongoose');

var http = require('http');

//create a server object:
http.createServer(function (req, res) {

}).listen(8080); //the server object listens on port 8080

mongoose.connect('mongodb://localhost:27017/madi').then(console.log('connected')).catch(console.error())
const email = 'kanlip1527@gmail.com';
const password = 'Kanlip1302';
const name = 'Kan Lipipan';
const role = 'admin';

let data = {
  name,
  local: {
    email,
    password
  },
  role
}
User.findOne({ 'local.email': email }).exec((err, existingUser) => {
  if (err) {
    console.log(error)
  }
  const user = new User(data);
  user.save(function (err) {
    if (err) {
      console.log(err)
    }
    else {
      console.log('saved')
    }

  })
})
