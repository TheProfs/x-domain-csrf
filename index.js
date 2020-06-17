'use strict'

const express = require('express')
const ejs = require('ejs')

const app = express()

app.set('view engine', 'ejs')

app.get('/form', (req, res) => {
  res.render('form')
})

app.listen(5000, e => {
  console.log('Listening 5000')
})
