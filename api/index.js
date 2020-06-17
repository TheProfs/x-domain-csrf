'use strict'

const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const cors = require('cors')
const express = require('express')

const csrfProtection = csrf({ cookie: true })
const app = express()

app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5000'
}))

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

app.listen(5010, e => {
  console.log('Listening 5010')
})
