const bcrypt = require('bcryptjs')
const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = [
  {
    name: '廣志',
    email: 'user1@example.com',
    password: '12345678',
    index: [0, 1, 2, 4]
  },
  {
    name: '小新',
    email: 'user2@example.com',
    password: '12345678',
    index: [3]
  }
]

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
  Promise.all(
    SEED_USER.map(user => {
      const { name, email, password, index } = user
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then((user) => {
          const userId = user._id
          const records = index.map(index => {
            const record = ({ ...recordDada[index], userId })
            return record
          })
          return new Promise(() => {
            Record.create(records)
            console.log('done!')
          })
        })
        .then(() => {
          console.log('Exit!')
          process.exit()
        })
        .catch(err => console.log(err))
    }))
})