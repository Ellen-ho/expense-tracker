const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Record = require('../../models/record')

// 依據分類輸出帳務資料
router.get('/', (req, res) => {
  // 取得目前 category
  const currentCategory = req.query.currentCategory || 'all'

  Promise.all([
    Category.find()
      .lean()
      .sort({ _id: 'asc' }),
    Record.find()
      .lean()
      .sort({ date: 'desc' })
  ]).then((results) => {
    let records, currentCategoryName, categories
    // 顯示全部直接回傳完整紀錄
    if (currentCategory === 'all') {
      categories = results[0]
      records = results[1]
    } else {
      // 有條件:
      // 篩選出符合紀錄
      records = results[1].filter((item) => {
        return item.category === currentCategory
      })
      // 取得對應分類名稱
      currentCategoryName = getCategoryInfoById(currentCategory, results[0]).categoryName
      // 去掉目前的選項
      categories = results[0].filter((item) => {
        return item.category !== currentCategory
      })
    }

    return res.render('index', {
      categories: categories,
      currentCategoryName,
      records: addCategoryInfo(records, results[0]),
      totalAmount: sumRecordsAmount(records)
    })
  }).catch((error) => console.log(error))
})

module.exports = router

// 在記帳資料上加上分類資訊
function addCategoryInfo(records, categories) {
  const newRecord = [...records]

  for (let i = 0; i < records.length; i++) {
    const newRecordCategoryId = newRecord[i].category
    const filteredCategoryInfo = getCategoryInfoById(newRecordCategoryId, categories)
    newRecord[i].categoryName = filteredCategoryInfo.categoryName
    newRecord[i].icon = filteredCategoryInfo.icon
  }
  return newRecord
}
// 計算金額總和
function sumRecordsAmount(records) {
  let totalAmount = 0

  records.forEach((r) => {
    totalAmount = totalAmount + r.amount
  })

  return totalAmount
}
// 返回對應的分類資料
function getCategoryInfoById(categoryId, categories) {
  return categories.find((c) => {
    return c.category === categoryId
  })
}
