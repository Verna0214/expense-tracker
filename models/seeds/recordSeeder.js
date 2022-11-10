const Record = require('../record')
const db = require('../../config/mongoose')

const recordDada = [
  {
    name: '午餐',
    date: '2019/04/23',
    amount: 60,
    categoryId: '4'
  },
  {
    name: '晚餐',
    date: '2019/04/23',
    amount: 60,
    categoryId: '4'
  },
  {
    name: '捷運',
    date: '2019/04/23',
    amount: 120,
    categoryId: '2'
  },
  {
    name: '電影：驚奇隊長',
    date: '2019/04/23',
    amount: 220,
    categoryId: '3'
  },
  {
    name: '租金',
    date: '2015/04/01',
    amount: 25000,
    categoryId: '1'
  }
]

db.once('open', () => {
  Record.create(recordDada)
    .then(() => {
      console.log('done!')
    })
    .catch(error => console.log('error!'))
})