const express = require('express');
const {getAllBorrowals, addBorrowal, userBorrowals, returnBook} = require('../controllers/borrowalsControllers')
const router = express.Router();

const {authentication} = require('../middlewares/authentication')

router.get('/allBorrowals', getAllBorrowals);
router.post('/addBorrowal',authentication, addBorrowal);
router.post('/userBorrowals',authentication, userBorrowals)
router.post('/returnBook', returnBook);



module.exports = router;