const express = require('express')
const router = express()
const Record = require('../../models/record')

// index router
router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      let totalAmount = 0
      for (let i = 0; i < records.length; i++) {
        totalAmount += records[i].amount
      }
      res.render('index', { records, totalAmount })
    })
    .catch(err => {
      console.log(err)
      res.render('error', { errorMsg: err.message })
    })
})

// category select router
router.post('/category', (req, res) => {
  const userId = req.user._id
  const categoryId = req.body.category
  Record.find({ categoryId, userId })
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      let totalAmount = 0
      for (let i = 0; i < records.length; i++) {
        totalAmount += records[i].amount
      }
      res.render('index', { records, totalAmount })
    })
    .catch(err => {
      console.log(err)
      res.render('error', { errorMsg: err.message })
    })
})

module.exports = router