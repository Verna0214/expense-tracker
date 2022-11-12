const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const routes = require('./routes')
const usePassport = require('./config/passport')

// 僅在非正式環境時，使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const port = 3000

// Set mongoose
require('./config/mongoose')

// Set Handlebars
app.engine('hbs', exphbs.engine({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    categoryIcon(categoryId) {
      switch (categoryId) {
        case 1:
          return 'fa-house'
        case 2:
          return 'fa-van-shuttle'
        case 3:
          return 'fa-face-grin-beam'
        case 4:
          return 'fa-utensils'
        case 5:
          return 'fa-pen'
      }
    },
    dateFormat(date) {
      return `${date.getFullYear()}-` + `${`0${date.getMonth() + 1}`.slice(-2)}-` + `${`0${date.getDate()}`.slice(-2)}`
    },
    ifEqual(a, b, options) {
      return a === b ? options.fn(this) : options.inverse(this)
    }
  }
}))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))

usePassport(app)

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
