const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Record = require('../../models/record')

// 首頁-列出所有帳務資料
router.get('/', (req, res) => {
  Promise.all([
    Category.find()
      .lean()
      .sort({ _id: 'asc' }),
    Record.find()
      .lean()
      .sort({ date: 'desc' })
  ]).then((results) => {
    return res.render('index', {
      categories: results[0],
      records: addCategoryInfo(results[1], results[0]),
      totalAmount: sumRecordsAmount(results[1])
    })
  }).catch((error) => console.log(error))
})

module.exports = router

// 在記帳資料上加上分類資訊
function addCategoryInfo (records, categories) {
  const newRecord = [...records]

  for (let i = 0; i < records.length; i++) {
    const newRecordCategoryId = newRecord[i].category
    newRecord[i] = {
      ...newRecord[i],
      ...addIconInfo(newRecordCategoryId, categories)
    }
  }
  return newRecord
}

// 計算金額總和
function sumRecordsAmount (records) {
  let totalAmount = 0

  records.forEach((r) => {
    totalAmount = totalAmount + r.amount
  })

  return totalAmount
}
// 返回對應的分類資料
function addIconInfo (categoryId, categories) {
  return categories.find((c) => {
    return c.category === categoryId
  })
}
