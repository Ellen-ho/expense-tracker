const db = require('../../config/mongoose')
const Category = require('../category')

db.once('open', () => {
  console.log('start category seeder!')

  Category.create(
    {
      category: 'living',
      categoryName: '家居物業',
      icon: '<i class="fas fa-home"></i>'
    },
    {
      category: 'traffic',
      categoryName: '交通出行',
      icon: '<i class="fas fa-shuttle-van"></i>'
    },
    {
      category: 'entertainment',
      categoryName: '休閒娛樂',
      icon: '<i class="fas fa-grin-beam"></i>'
    },
    {
      category: 'food',
      categoryName: '餐飲食品',
      icon: '<i class="fas fa-utensils"></i>'
    },
    {
      category: 'other',
      categoryName: '其他',
      icon: '<i class="fas fa-pen"></i>'
    }
  ).then(() => {
    console.log('category seeder done')
    db.close()
  })
})