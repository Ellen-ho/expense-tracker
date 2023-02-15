const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
const Record = require('../record')
const Category = require('../category')
const User = require('../user')

const SEED_USER = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678',
}

const SEED_RECORD = [
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
]

db.once('open', async () => {
  console.log('start record seeder!')
  // 由於 category ID 是隨機產生，必須要先把以新增的分類取出，供後續新增 record 時 categoryId 使用
  const categories = await Category.find()
  // 產出 category 和 ID 的對應供後續 mapping
  const categoryIdMapping = categories.reduce((prev, curr) => {
    return {
      ...prev,
      [curr.category]: curr._id
    }
  }, {}) 

  const user = await bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      email: SEED_USER.email,
      password: hash
    }))

    Promise.all(SEED_RECORD.map((record) => {
      return Record.create({
        name: record.name,
        amount: record.amount,
        userId: user._id,
        categoryId: categoryIdMapping[record.category]
      })
    }))
    .then(() => {
      console.log('record seeder done')
      db.close()
    })
    .catch(console.error)
    .finally(() => process.exit())
})
