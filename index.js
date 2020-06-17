var cookieParser = require('cookie-parser')
var csrf = require('csurf')
var bodyParser = require('body-parser')
var express = require('express')
var ejs = require('ejs')

// setup route middlewares
var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })

// create express app
var app = express()

app.set('view engine', 'ejs')

// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser())

app.get('/form', csrfProtection, function (req, res) {
  // pass the csrfToken to the view
  res.render('form', {
    csrfToken: req.csrfToken()
  })
})

app.post('/process', parseForm, csrfProtection, function (req, res) {
  res.send('data is being processed')
})

app.listen(5000, e => {
  console.log('Listening 5000')
})
