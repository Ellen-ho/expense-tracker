const db = require('../../config/mongoose')
const Category = require('../category')

db.once('open', () => {
  console.log('start category seeder!')

  Category.create(
    {
      category: 'living',
      categoryName: '家居物業',
      icon: 'fa-house'
    },
    {
      category: 'traffic',
      categoryName: '交通出行',
      icon: 'fa-van-shuttle'
    },
    {
      category: 'entertainment',
      categoryName: '休閒娛樂',
      icon: 'fa-face-grin-beam'
    },
    {
      category: 'food',
      categoryName: '餐飲食品',
      icon: 'fa-utensils'
    },
    {
      category: 'other',
      categoryName: '其他',
      icon: 'fa-pen'
    }
  ).then(() => {
    console.log('category seeder done')
    db.close()
  })
  .catch(console.error)
  .finally(() => process.exit())
})
