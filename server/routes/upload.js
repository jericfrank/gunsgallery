import express from 'express';
import multer from 'multer';
import uuid from 'uuid';
import chance from "chance";
import path from "path";

import Upload from '../model/uploads';

let router = express.Router();

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../../public/uploads') )
	},
	filename: function (req, file, cb) {
		cb(null, uuid.v4() + path.extname(file.originalname));
	}
});
var upload = multer({ storage: storage });

router.post( '/', upload.single( 'file' ), function( req, res, next ) {

	var collection = new Upload({ 
		destination: req.file.destination,
		encoding: req.file.encoding,
		filename: req.file.filename,
		mimetype: req.file.mimetype,
		originalname: req.file.originalname,
		path: req.file.path,
		size: req.file.size,
		description: chance().sentence()
	})

	collection.save(function(err) {
		if (err) {
			throw err
		}else{
			res.status( 200 ).send( collection );
		}
	});

});

router.get('/search/:keyword', function(req, res) {

	Upload.find({originalname: new RegExp(req.params.keyword, "i")}, null, {limit: 12}, function(err, data) {
		if(err){
  			throw err
  		}else{
  			res.status( 200 ).send( data );
  		}
	});

});

router.get('/:increment', function(req, res) {

	let limit = 12;

	if(parseInt(req.params.increment) != 0){
		limit = 4;
	}

	Upload.find({}, null, {sort: {createdAt: -1} , limit: limit, skip: parseInt(req.params.increment)}, function(err, data) {
		if(err){
  			throw err
  		}else{
  			res.status( 200 ).send( data );
  		}
	});

});

router.delete('/delete/:_id', function(req, res) {

	Upload.remove({ _id: req.params._id }, function(err, data) {
		res.status( 200 );
	});
});

export default router;