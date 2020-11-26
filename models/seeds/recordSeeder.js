const db = require('../../config/mongoose')
const Record = require('../record')

db.once('open', () => {
  console.log('start record seeder!')

  Record.create(
    {
      name: '房租',
      category: 'living',
      date: '2020-01-01',
      amount: 8000
    },
    {
      name: '加油費',
      category: 'traffic',
      date: '2020-01-03',
      amount: 500
    },
    {
      name: '換機油',
      category: 'traffic',
      date: '2020-01-06',
      amount: 150
    },
    {
      name: '電影票',
      category: 'entertainment',
      date: '2020-01-04',
      amount: 300
    },
    {
      name: '午餐',
      category: 'food',
      date: '2020-01-05',
      amount: 100
    },
    {
      name: '早餐',
      category: 'food',
      date: '2020-01-05',
      amount: 60
    }
  ).then(() => {
    console.log('record seeder done')
    db.close()
  })
})
