const db = require('../../config/mongoose')
const Category = require('../category')

db.once('open', () => {
  console.log('start category seeder!')

  Category.create(
    {
      category: 'living',
      categoryName: '家居物業',
      icon: 'fas fa-home'
    },
    {
      category: 'traffic',
      categoryName: '交通出行',
      icon: 'fas fa-shuttle-van'
    },
    {
      category: 'entertainment',
      categoryName: '休閒娛樂',
      icon: 'fas fa-grin-beam'
    },
    {
      category: 'food',
      categoryName: '餐飲食品',
      icon: 'fas fa-utensils'
    },
    {
      category: 'other',
      categoryName: '其他',
      icon: 'fas fa-pen'
    }
  ).then(() => {
    console.log('category seeder done')
    db.close()
  })
})
