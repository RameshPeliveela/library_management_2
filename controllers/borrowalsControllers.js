const borrowals = require('../models/borrowalModel');
const bookModel = require('../models/bookModel');
const userModel = require('../models/userModels');
//get All Borrowals
async function getAllBorrowals(req, res) {
    try{
        const response = await borrowals.find();
        return res.status(200).json(response)
    }
    catch(err){
        console.log(err);
        return res.status(500).json({Error: 'Internal Server'})
    }
}


// Add Borrowal
async function addBorrowal(req, res) {
    const {id, role} = req.user;
    const {bookId} = req.body;
    if(role === 'user'){
        try{
            const newBorrowal = new borrowals({...req.body, userId:id});
            newBorrowal.save();
            const book = await bookModel.findById(bookId);
            const quantity = book.quantity - 1;
            book.quantity = quantity;
            book.save();
            return res.status(200).json("Book Issued");
        }
        catch(err){
            console.log(err)
            return res.status(500).json("Internal server error")
        }
    }
    else if(role === 'admin'){
        try{
            const {userEmail, bookName, issuedDate, returnedDate} = req.body;
            console.log(`${userEmail} ${bookName} ${issuedDate} ${returnedDate}`);
            const user = await userModel.findOne({email:userEmail});
            const book = await bookModel.findOne({bookName:bookName});

            if(!user){
                return res.status(400).json("No user found with this email")
            }
            if(!book){
                return res.status(400).json("please enter book name correctly");
            }

            const newBorrowal = new borrowals({returnedDate, issuedDate, userId:user._id, bookId:book._id});
            await newBorrowal.save();
            const quantity = book.quantity - 1;
            book.quantity = quantity;
            book.save();
            return res.status(200).json("Book Issued");
            
        }
        catch(err){
            console.log(err)
            return res.status(500).json("Internal server error")
        }
    }

    
}

// get user Borrowal
async function userBorrowals(req, res) {
    
    const {role} = req.user;

    const userId = role === 'admin' ? req.body.userId : req.user.id;

    try{
        const response = await borrowals.find({userId: userId})
        
        return res.status(200).json(response)
    }
    catch(err){
        console.log(err);
        return res.status(500).json({Error: 'Internal Server'})
    }
}

// return the Book
async function returnBook(req, res) {
    const {borrowId, bookId} = req.body;
    try{
        await borrowals.findByIdAndDelete(borrowId);
        const book = await bookModel.findById(bookId);
        if(!book){
            return res.status(200).json("Book returned successfully")
        }
        const quantity = book.quantity + 1;
        book.quantity = quantity;
        book.save();
        return res.status(200).json("Book returned successfully")

    }
    catch(err){
        console.log(err);
        return res.status(500).json("Internal server Error")
    }
    
}



module.exports = {getAllBorrowals, addBorrowal, userBorrowals, returnBook}