const express = require('express');
const {getAllUsers, createUser, getUserById, updateUser, deleteUser, userProfile, changePassword} = require('../controllers/userController')
const router = express.Router();

const {authentication} = require('../middlewares/authentication')

router.post('/changepassword',authentication,changePassword)
router.get('/profile',authentication,userProfile);
router.get('/getAll', getAllUsers);
router.post('/createUser', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);



module.exports = router;
