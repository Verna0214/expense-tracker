const mongoose = require('mongoose')
const Category = require('../category')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const categoryDada = [
  {
    id: 1,
    name: '家居物業'
  },
  {
    id: 2,
    name: '交通出行'
  },
  {
    id: 3,
    name: '休閒娛樂'
  },
  {
    id: 4,
    name: '餐飲食品'
  },
  {
    id: 5,
    name: '其他'
  },
]

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('error', () => {
  console.log('mongoose error!')
})
db.once('open', () => {
  Category.create(categoryDada)
    .then(() => {
      console.log('done!')
    })
    .catch(error => console.log('error!'))
})