import mongoose from "mongoose";
import timestamps from "mongoose-timestamp";

var Schema = mongoose.Schema;

var uploadScheme = new Schema({ 
	thumbs: String,
    destination: String, 
    encoding: String,
    filename: String,
    mimetype: String,
    originalname: String,
    path: String,
    size: String,
    description: String
});

uploadScheme.plugin(timestamps)

module.exports = mongoose.model('upload', uploadScheme)