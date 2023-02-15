const express = require('express')
const router = express.Router()

const Category = require('../../models/category')
const Record = require('../../models/record')

// 依據分類輸出帳務資料
router.get('/', (req, res) => {
  const userId = req.user._id
  // 取得目前 category
  const currentCategoryId = req.query.currentCategoryId || 'all'
  const searchConditions = currentCategoryId !== 'all' ? {
    userId,
    categoryId: currentCategoryId
  } : { userId }

  Promise.all([
    Category.find()
      .lean()
      .sort({ _id: 'asc' }),
    Record.find(searchConditions)
      .lean()
      .sort({ date: 'desc' })
  ]).then((results) => {
    const records = results[1]
    let currentCategoryName, categories
    // 顯示全部直接回傳完整紀錄
    if (currentCategoryId === 'all') {
      categories = results[0]
    } else {
      // 取得對應分類名稱
      currentCategoryName = getCategoryInfoById(currentCategoryId, results[0]).categoryName
      // 去掉目前的選項
      categories = results[0].filter((item) => {
        return item._id.toString() !== currentCategoryId
      })
    }

    return res.render('index', {
      categories,
      currentCategoryName,
      records: addCategoryInfo(records, results[0]),
      totalAmount: sumRecordsAmount(records)
    })
  }).catch((error) => console.log(error))
})

module.exports = router

// 在記帳資料上加上分類資訊
function addCategoryInfo(records, categories) {
  const newRecord = records.map((record) => {
    const targetCategory = getCategoryInfoById(record.categoryId.toString(), categories)
    return {
      ...record,
      icon: targetCategory.icon
    }
  })

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
    return c._id.toString() === categoryId
  })
}
