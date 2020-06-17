const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const bodyParser = require('body-parser')
const express = require('express')
const ejs = require('ejs')

// setup route middlewares
const csrfProtection = csrf({ cookie: true })
const parseForm = bodyParser.urlencoded({ extended: false })

// create express app
const app = express()

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
