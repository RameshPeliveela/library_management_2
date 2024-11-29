const bookModel = require('../models/bookModel')

async function addBook(req, res) {
    const data = req.body;
    
    try{
        const newBook = new bookModel(data);
        const response = await newBook.save();
        return res.status(201).json("Book is Added")
    }
    catch(err){
        console.log(err);
        return res.status(500).json({Error: 'Internal Server Error'})
    }
    
}

async function getAllBooks(req, res){
    try{
        const response = await bookModel.find();
        return res.status(200).json(response)
    }
    catch(err){
        console.log(err);
        return res.status(500).json({Error: 'Internal Server Error'})
    }
}

async function deleteBook(req, res) {
    const {id} = req.params;
    try{
        const response = await bookModel.findByIdAndDelete(id);
        return res.status(200).json("book is deleted")
    }
    catch(err){
        console.log(err);
        return res.status(500).json({Error: 'Internal Server Error'})
    }
    
}

async function updateBook(req, res){
    const {id} = req.params;
    const data = req.body;
    try{
        await bookModel.findByIdAndUpdate(id, data);
        return res.status(200).json("Book is updated")
    }
    catch(err){
        console.log(err);
        return res.status(500).json({Error: 'Internal Server Error'})
    }
}


async function getBookByBookName(req, res) {
    const {bookName} = req.body;
    try{
        const response = await bookModel.find({bookName:bookName});
        if(!response){
            return res.status(200).json("No users")
        }
        return res.status(200).json(response)
    }
    catch(err){
        console.log(err);
        return res.status(500).json({Error: 'Internal Server Error'})
    }

}

async function getBookByName(req, res) {
    try{
        const response = await bookModel.findOne(req.params);
        if(!response){
            return res.status(400).json("No book found with this name")
        }
        return res.status(200).json(response)
    }
    catch(err){
        console.log(err);
        return res.status(500).json("Internal server Error")
    }
    
}

module.exports = {addBook, getAllBooks, deleteBook, updateBook, getBookByName}