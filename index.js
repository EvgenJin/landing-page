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
      user: 'evilwith2@gmail.com',
      pass: '76Tb45Eu'
    }
  })

  const mailOptions = {
    from: `${req.body.email}`,
    to: 'rumbiroid@gmail.com',
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
  // res.send('POST request to the homepage');
  console.log(req.body)
});

app.post('/api', jsonParser, function (req, res) {
  // if (!req.body) return res.sendStatus(400)
  console.log(req.body)
  // create user in req.body
})



  

app.listen(config.port,config.host,() => 
  console.log('Socket ready on'+config.host+' port:'+config.port)
);
