import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import Hogan from 'hogan.js';
import fs from 'fs';
require('dotenv').config();


/* eslint-disable no-console */

const port = 3000;
const app = express();
app.use(express.static('dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const template = fs.readFileSync('./dist/email.hjs', 'utf-8');
const compiledTemplate = Hogan.compile(template);


// Stripe library usage
const {MAILGUN_API_KEY, MAILGUN_DOMAIN, FROM_WHO} = process.env;
const mailgun = require('mailgun-js')({apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN});
const stripe = require("stripe")(process.env.TEST_STRIPE_SECRET);


app.post('/payment', (req, res) => {
  const reciptNumb = 'ST'+Math.floor(Math.random() * 1000000000);
  const {token, email, event} = req.body;
  stripe.charges.create({
    amount: parseInt(req.body.amount),
    currency: "aud",
    source: token,
    description: "Charge for asifkhannoorzai@gmail.com",
    metadata: {
      email: email,
      reciptNumber: reciptNumb,
      event: event
    }
  }, function(err, charge) {
      if(err) {
        res.json({err});
      } else {
        const {email, reciptNumber} = charge.metadata;
        const d = new Date();
        let amount = parseInt(req.body.amount/100);
        const ticketNumb = (amount/40);
        amount = amount.toFixed(2);
        const data = {
          from: FROM_WHO,
          to: email,
          subject: 'ShowTech Recipt',
          html: compiledTemplate.render({reciptNumb: reciptNumber, email, ticketNumb,  amount, city: event, date: d.toLocaleDateString() })
        };
        mailgun.messages().send(data, function (error, body) {
          if (err) throw err;
        });
        res.json(charge);
      }
  });
});

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, './dist/index.html'));
});

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`http://localhost:${app.get("port")}`);
  }
});
