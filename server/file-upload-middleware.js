const axios = require('axios');
const cloudinary = require('cloudinary');
const Event = require('./Models/Event');
const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'google',
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyBW5YTGVaMW1J8T2nZnij2hivx3n24E0w4', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
let geocoder = NodeGeocoder(options);
function fileUploadMiddleware(req, res) {


  cloudinary.uploader.upload_stream((result) => {
    req.body.img = result.secure_url;
    let latitude, longtitude;
    console.log(req.body.address)
    geocoder.geocode(req.body.address, function (err, res) {
      res.forEach(element => {
        latitude = element.latitude
        longtitude = element.longitude;
      })
      req.body.loc = [latitude, longtitude];
      req.body.currency = 'THB';

      let data = new Event(req.body);
      data.save(function (error) {
        console.log('Your bee has been saved!');
        if (error) {
          console.error(error);
        }
      });

    })
    console.log(`${req.headers.origin}/uploadImage`)
    axios({
      url: `${req.headers.origin}/uploadImage`, //API endpoint that needs file URL from CDN
      method: 'post',
      data: {
        url: result.secure_url,
        name: req.body.name,
        description: req.body.description,
      },
    }).then((response) => {
      // you can handle external API response here

      res.status(200).json({ success: true, fileUrl: result.secure_url })
    }).catch((error) => {
      console.log(error)
      res.status(500).json(error.response.data);
    });
  }).end(req.file.buffer);
}

module.exports = fileUploadMiddleware