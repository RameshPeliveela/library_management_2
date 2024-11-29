const mongoose = require('mongoose');
const bookShcema = mongoose.Schema({
    bookName:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    imageUrl:{
        type:String
    },
    description:{
        type:String
    },
}, {timestamps:true})

const bookModel = mongoose.model('books', bookShcema)
module.exports = bookModel;
