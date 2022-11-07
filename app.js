const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

// 僅在非正式環境時，使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const port = 3000

// MONGODB connect
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('error', () => {
  console.log('mongoose error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

// Set Handlebar
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.send('This is my expense-tracker app.')
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
