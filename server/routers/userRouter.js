const express = require ('express');
const router = express.Router();
const usercontroller = require ('../controllers/usercontroller');

router.post('/addbooks',usercontroller.createbooks);
router.get('/getbooks',usercontroller.viewbooks);
router.get('/single/:id',usercontroller.value)
router.delete('/delete/:id',usercontroller.delete)
router.put('/update/:id',usercontroller.edit)




module.exports = router