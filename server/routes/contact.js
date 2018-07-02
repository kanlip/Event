
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kanlip1527@gmail.com',
    pass: 'Kanken01'
  }
});

router.post('/', function (req, res) {
  console.log(req.body)
  let mailOptionforCustomer = {
    from: 'kanlip1527@gmail.com',
    to: req.body.email,
    subject: 'Madi autogenerate reply',
    html: '<p><b>Thank you</b> for contacting our support. We will contact you back as soon as possible.</p>'
  };
  let mailOptionforSupport = {
    from: 'kanlip1527@gmail.com',
    to: 'kan_lip@hotmail.com',
    subject: `${req.body.name} contacting support`,
    html: `<p>${req.body.message}<br/> <b>FROM ${req.body.email}</b></p> `
  };
  transporter.sendMail(mailOptionforSupport, function (error, info) {
    if (error) {
      console.log(error);
      res.status(404).send({ err: 'Error' })
    } else {
      console.log('Sent to Support Team')
      transporter.sendMail(mailOptionforCustomer, function (error, info) {
        if (error) {
          res.status(404).send({ err: 'Error' })
        } else {

          res.status(200).send({ msg: 'Completed' })
        }
      });
    }

  });


})

module.exports = router;