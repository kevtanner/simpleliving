module.exports = function (app) {
var apn = require('apn');
var bodyParser = require('body-parser');
var deviceToken;

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers', 
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  );
  if ('OPTIONS' === req.method) {
    res.status(200).end();
  } else {
    next();
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/token', function(req, res) {

  var response = "Loud and Clear";
  res.json(response);
  sendPush(req.body.token);
});
app.get('/push', function(req,res) {
 sendPush(deviceToken);
 res.redirect('/index.html')
});

function sendPush(token) {
  console.log('push sent');
    var options = {
      cert: '../simpleliving/CodeMyHackCert.pem',
      key:  '../simpleliving/CodeMyHackKey.pem',
      passphrase: 'Ch1cken$',
      production: false,
      rejectUnauthorized:false
    };
    var apnProvider = new apn.Provider(options);

    deviceToken = token;
    
    var note = new apn.Notification();

    note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    note.badge = 3;
    note.sound = "ping.aiff";
    note.alert = "The post has been delivered";
    note.payload = {'messageFrom': 'John Appleseed'};
    note.topic = "io.ionic.simpleliving";
    
    apnProvider.send(note, deviceToken).then( (result) => {
      console.log(JSON.stringify(result));
    });
  }

}


