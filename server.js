import express from 'express';
import webpack from 'webpack';
import path from 'path';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);
require('dotenv').config();

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../dist/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`http://localhost:${port}`);
  }
});
