const express = require('express');
const url = require('url');
const i18n = require('../index.js');
const LanguageDetect = require('languagedetect');
const lngDetector = new LanguageDetect();
// another 'global' object that is bound to i18n additionaly
// DANGER! this `funkyObject` is NOT concurrency aware,
// while req, res and res.locals are and will always be

var app = express();
app.use(i18n.init);

// uses locale as guessed by accept-headers
// req: Hallo res: Hallo res.locals: Hallo funkyObject: Hallo
app.get('/default/:lang/:string', function(req, res) {
  console.log(lngDetector.detect('温度'));
  i18n.setLocale(req, req.params.lang);
  render(req, res);
});

var getBody = function(req, res){
  var body = '';
  body += ' req: ' + req.__(req.params.context);
  body += ' res: ' + res.__(req.params.context);
  body += ' res.locals: ' + res.locals.__(req.params.context);
  body += ' i18n._: ' + i18n.__(req.params.context);
  return body;
};

var render = function(req, res){
  setTimeout(function () {
    res.send('<body>' + getBody(req, res) + '</body>');
  }, app.getDelay(req, res));
};

// simple param parsing
app.getDelay = function (req, res) {
  return url.parse(req.url, true).query.delay || 0;
};

// startup
app.listen(3000);