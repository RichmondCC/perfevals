require('./api/data/db.js');
var express = require('express');
var app = express();
var fs = require('fs');
var https = require('https');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

// Certificate
var key = fs.readFileSync('your key');
var cert = fs.readFileSync(' your crt');
var ca = [fs.readFileSync('your ca1 crt'),
  fs.readFileSync('your ca2 crt'),
  fs.readFileSync('your ca3 crt')];
var options = {
  key: key,
  cert, cert,
  ca: ca
};

/*********
*
* Start: Passport Code
*
*********/
var passport     = require('passport');
var LdapStrategy = require('passport-ldapauth');

var OPTS = {
  server: {
    url: 'your ldap url',
    bindDn: 'your bindDn',
    bindCredentials: 'your bindCredentials',
    searchBase: 'your searchBase',
    searchFilter: '(sAMAccountName={{username}})'
  }
};

passport.use(new LdapStrategy(OPTS));
app.use(passport.initialize());
/*********
*
* End: Passport Code
*
*********/

var routes = require('./api/routes');

// app.set('port', 3000)

// app.use(function(req, res, next){
//   console.log(req.method, req.url);
//   next();
// });

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', routes);

// app.use(function(err, req, res, next){
//   console.log(err);
//   next();
// });

https.createServer(options, app).listen(3001);
http.createServer(app).listen(3000);

// var server = app.listen(app.get('port'), function(){
//   var port = server.address().port;
//   console.log('Magic happens on port ' + port);
// });
