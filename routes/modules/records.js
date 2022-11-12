const express = require('express')
const router = express()
const Record = require('../../models/record')

// create page router
router.get('/new', (req, res) => {
  return res.render('new')
})

// create router
router.post('/', (req, res) => {
  const userId = req.user._id
  req.body.userId = userId
  Record.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => {
      console.log(err)
      res.render('error', { errorMsg: err.message })
    })
})

// edit page router
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then(record => res.render('edit', { record }))
    .catch(err => {
      console.log(err)
      res.render('error', { errorMsg: err.message })
    })
})

// edit router
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, amount, categoryId } = req.body
  return Record.findOne({ _id, userId })
    .then(record => {
      record.name = name
      record.date = date
      record.amount = amount
      record.categoryId = categoryId
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => {
      console.log(err)
      res.render('error', { errorMsg: err.message })
    })
})

// delete router
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => {
      console.log(err)
      res.render('error', { errorMsg: err.message })
    })
})

module.exports = router