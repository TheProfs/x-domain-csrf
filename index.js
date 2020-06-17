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

app.get('/form', (req, res) => {
  res.render('form')
})

app.get('/csrf-token', csrfProtection, (req, res) => {
  res.json({
    csrfToken: req.csrfToken()
  })
})

app.post('/process', csrfProtection, (req, res) => {
  console.log('submitted')
  res.json({
    result: 'data is being processed'
  })
})

app.listen(5000, e => {
  console.log('Listening 5000')
})
