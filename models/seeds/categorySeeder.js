const Category = require('../category')
const db = require('../../config/mongoose')

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

db.once('open', () => {
  Category.create(categoryDada)
    .then(() => {
      console.log('done!')
    })
    .catch(error => console.log('error!'))
})