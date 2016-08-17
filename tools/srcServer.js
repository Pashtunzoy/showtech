import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import path from 'path';
import Hogan from 'hogan.js';
import fs from 'fs';
import config from '../webpack.config.dev';
require('dotenv').config();

/* eslint-disable no-console */

const app = express();
const compiler = webpack(config);
const template = fs.readFileSync('./src/email.hjs', 'utf-8');
const compiledTemplate = Hogan.compile(template);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' }
}));

app.use(require('webpack-hot-middleware')(compiler));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// console.log(process.env);


// Stripe library usage
const {MAILGUN_API_KEY, MAILGUN_DOMAIN, FROM_WHO} = process.env;
const mailgun = require('mailgun-js')({apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN});
const stripe = require("stripe")(process.env.TEST_STRIPE_SECRET);


app.post('/payment', (req, res) => {
  // console.log('Got the request');
  // console.log(req.body);
  stripe.charges.create({
    amount: parseInt(req.body.amount),
    currency: "aud",
    source: req.body.token,
    description: "Charge for asifkhannoorzai@gmail.com",
    metadata: {
      email: req.body.email
    }
  }, function(err, charge) {
    // console.log(charge);
    // console.log(charge.metadata.email);
      if(err) {
        res.json({err});
      } else {
        const {email} = charge.metadata;
        let amount = parseInt(req.body.amount/100);
        const ticketNumb = (amount/40);
        amount = amount.toFixed(2);
        const reciptNumb = 'ST'+Math.floor(Math.random() * 1000000000);
        const data = {
          from: FROM_WHO,
          to: email,
          subject: 'ShowTech Recipt',
          html: compiledTemplate.render({reciptNumb, email, ticketNumb,  amount })
        };
        mailgun.messages().send(data, function (error, body) {
          if (err) throw err;
          console.log('------------EMAIL-----------------');
          console.log(body);
        });
        console.log('---------Req Body---------------');
        console.log(req.body);

        console.log('-------------CHARGE DETAILS------------');
        console.log(charge);

        console.log('---------Charge Description---------------');
        console.log(charge.description);

        res.json(charge);
      }
  });
});

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`http://localhost:${app.get("port")}`);
  }
});
