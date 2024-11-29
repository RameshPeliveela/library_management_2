const mongoose = require('mongoose');
const users = require('./userModels');
const books = require('./bookModel');

const borrowalSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:users,
        required:true
    },
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:books,
        required:true
    },
    issuedDate:{
        type: Date,
      },
    returnDate:{
        type:Date
    },
    
})

const borrowalModel = mongoose.model('borrows', borrowalSchema)
module.exports = borrowalModel;