const express = require('express')
const router = express.Router();
const {addBook, getAllBooks, deleteBook, updateBook,getBookByName} = require('../controllers/bookController');

router.get('/getBook/:bookName',getBookByName);
router.post('/addBook', addBook)
router.get('/allbooks', getAllBooks);
router.delete('/deleteBook/:id', deleteBook);
router.put('/updateBook/:id', updateBook);


module.exports = router;
