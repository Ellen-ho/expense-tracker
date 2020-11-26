const express = require('express')
const router = express.Router()
const ObjectId = require('mongodb').ObjectID

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
router.post('/', (req, res) => {
  // 從 req.body 拿出表單裡的資料
  const options = req.body

  // 建立實例模型
  const newRecord = new Record(options)
  // 將實例存入資料庫
  return newRecord.save()
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// 修改頁面
router.get('/:id', (req, res) => {
  const id = req.params.id

  Promise.all([
    Category.find()
      .lean()
      .sort({ _id: 'asc' }),
    Record.findById(id)
      .lean()
  ]).then((results) => {
    return res.render('edit', { record: results[1], categories: results[0] })
  }).catch((error) => console.log(error))
})

// 確定修改
router.put('/:id', (req, res) => {
  const id = req.params.id
  const options = req.body

  // 從資料庫找出相關資料
  return Record.findById(id)
    .then((record) => {
      record = Object.assign(record, options)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// 確定刪除
router.delete('/:id', (req, res) => {
  const id = req.params.id

  return Record.findById(id)
    .then((record) => record.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

module.exports = router
