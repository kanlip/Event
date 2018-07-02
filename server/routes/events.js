
const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer')
const Event = require('../Models/Event');
const fileUploadMiddleware = require('../file-upload-middleware')
const storage = multer.memoryStorage()
const upload = multer({ storage })
/* GET events listing. */
router.get('/', function(req, res, next) {
  //fetch the upcoming events
  Event.find({'startTime':{'$gte':new Date()}},function(err,event){
    if(err) console.log(err);
    res.send(event);
  })
});
//find event by id
router.get('/:id',function(req,res,next){
  Event.findById(req.params.id, function(err,event){
    if(err) res.send(err);
    res.send(event)
  })
})
router.post('/category',function(req,res,next){
  Event.find({'category':[req.body.data]},function(err,events){
    if(err) console.log(err)
    res.send(events)
  })
})
//create Event
router.post('/create',upload.single('file'),fileUploadMiddleware)

module.exports = router;