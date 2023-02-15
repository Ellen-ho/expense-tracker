const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: String,
  date: String,
  amount: Number,
  userId: { // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  },
  categoryId: { // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'Category',
    index: true,
    required: true
  }
})
module.exports = mongoose.model('Record', recordSchema)
