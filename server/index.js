import express from "express";
import path from "path";
import mongoose from "mongoose";

import webpack from "webpack";
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from "../webpack.config.dev";

import config from "./config";

import upload from "./routes/upload";

var app = express();
app.set('port', (process.env.PORT || 5000));

const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler));

app.use('/', express.static(path.join(__dirname, '../public')))

app.get('/', function(request, response) {
	response.sendFile( path.join(__dirname, '../client/index.html') )
});

app.use('/api/upload', upload);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

mongoose.connect(config.database, function(err) {
  if (err) {
	console.log('Unable to connect to Mongo. ', err);
    process.exit(1);
  }else {
  	
  }
});