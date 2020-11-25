const db = require('../../config/mongoose')
const Record = require('../record')

db.once('open', () => {
  console.log('start record seeder!')

  Record.create(
    {
      name: '房租',
      category: '家居物業',
      date: '2020-01-01',
      amount: 15000
    },
    {
      name: '加油費',
      category: '交通出行',
      date: '2020-01-03',
      amount: 500
    },
    {
      name: '電影票',
      category: '休閒娛樂',
      date: '2020-01-04',
      amount: 300
    },
    {
      name: '午餐',
      category: '餐飲食品',
      date: '2020-01-05',
      amount: 60
    }
  )
  console.log('record seeder done')
})