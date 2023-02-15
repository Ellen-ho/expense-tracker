const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// 新增頁面
router.get('/new', (req, res) => {
  // 取得下拉式選單資料
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then((categories) => {
      return res.render('new', { categories })
    })
    .catch((error) => console.log(error))
})

// 確認新增
router.post('/new', (req, res) => {
  const userId = req.user._id
  // 從 req.body 拿出表單裡的資料
  const newRecord = req.body
  // 將實例存入資料庫
  return Record.create({ ...newRecord, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 修改頁面
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  Promise.all([
    Category.find()
      .lean()
      .sort({ _id: 'asc' }),
    Record.findOne({ _id, userId })
      .lean()
      .sort({ date: 'desc' })
  ]).then((results) => {
    return res.render('edit', { record: results[1], categories: results[0] })
  }).catch((error) => console.log(error))
})

// 確定修改
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  // 從資料庫找出相關資料
  return Record.findOne({ _id, userId })
    .then(record => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// 確定刪除
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id 
  return Record.findOne({ _id, userId })
    .then(Record => Record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router
