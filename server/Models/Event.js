const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
	title : {
		type:String,
		required: true,
	},
	price : {
		type: Number,
		required: true,
		trim: true
	},
	age: {
		type: Number,
		required: true,
	},
	currency : {
		type: String,
		required: true,
		trim: true
	},
	address : {
		type: String,		
		required: true
	},
	loc : {
		type: [Number],		// [<longitude>, <latitude>]
		index: '2d',      	// create the geospatial index
		required: true
	},
	category : {
		type: [String],
		trim: true
	},
	startTime : {
		type : Date,
		default: Date.now,
	},
	description: {
		type: String,
		trim: true,
		required: true
	},
	rules:{
		type:String,
		default: '-'
	},
	img: {
		type: String,
		
	}
}
  , { versionKey: false });

module.exports = mongoose.model('events', EventSchema);