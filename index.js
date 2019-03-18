const 
  app = require('express')(),
  config = require('./config.js'),
  nodemailer = require('nodemailer'),
  bodyParser = require('body-parser')
;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(require('express').static('./template'));
var jsonParser = bodyParser.json()
app.post('/send',jsonParser, function(req, res, next) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.mail_addr,
      pass: config.mail_pass
    }
  })

  const mailOptions = {
    from: `${req.body.email}`,
    to: 'radiatorekat@gmail.com',
    subject: `${req.body.name}`,
    text: `${req.body.message}`,
    // replyTo: `${req.body.email}`
  }

  console.log(mailOptions)

  transporter.sendMail(mailOptions, function(err, res) {
    if (err) {
      console.error('there was an error: ', err);
    } else {
      console.log('here is the res: ', res)
    }
  })

})

app.post('/', function (req, res) {
  console.log(req.body)
});

app.post('/api', jsonParser, function (req, res) {
  console.log(req.body)
})

app.listen(config.port,config.host,() => 
  console.log('Socket ready on'+config.host+' port:'+config.port)
);
