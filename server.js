//
// Form API Angular client
//
// Christophe Hamerling - chamerling@linagora.com
//

var express = require('express')
  , fs = require('fs')
  , path = require('path');

var env = process.env.NODE_ENV || 'development'
  , conf = require('./config/config')[env];

var app = express();
require('./config/express')(app, conf);

var routes = __dirname + '/app/routes';
fs.readdirSync(routes).forEach(function(file) {
  require(routes + '/' + file)(app);
});
// default all other stuff to /
app.get('*', function(req, res) {
  res.redirect('/');
})

app.listen(app.get('port'), function(err) {
  if (err) {
    throw err;
  }
  console.log('Form server Client started on', app.get('port'))
});