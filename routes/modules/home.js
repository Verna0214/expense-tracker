const express = require('express')
const router = express()
const Record = require('../../models/record')

// index router
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      let totalAmount = 0
      for (let i = 0; i < records.length; i++) {
        totalAmount += records[i].amount
      }
      res.render('index', { records, totalAmount })
    })
    .catch(err => console.log(err))
})

// category select router
router.post('/category', (req, res) => {
  const categoryId = req.body.category
  Record.find({ categoryId })
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      let totalAmount = 0
      for (let i = 0; i < records.length; i++) {
        totalAmount += records[i].amount
      }
      res.render('index', { records, totalAmount })
    })
    .catch(err => console.log(err))
})

module.exports = router