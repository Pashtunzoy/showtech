import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

/*eslint-disable no-console*/

fs.readFile('src/index.html', 'utf8', (err, markup) => {
  if (err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);

  //since a separate spreadsheet is only utilized for the production build, need to dynamically
  $('head').prepend('<link type="text/css" rel="stylesheet" href="/styles.css">');

  fs.writeFile('dist/index.html', $.html(), 'utf8', () => {
    if (err) {
      return console.log(err);
    }
    console.log('index.html written to /dist'.green);
  });
});

fs.readFile('src/email.hjs', 'utf8', (err, markup) => {
  if (err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);

  fs.writeFile('dist/email.hjs', $.html(), 'utf8', () => {
    if (err) {
      return console.log(err);
    }
    console.log('email.hjs written to /dist'.green);
  });
});
