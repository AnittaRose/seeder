const express = require ('express');
const router = express.Router();
const usercontroller = require ('../controllers/usercontroller');

router.post('/addfilms',usercontroller.createbooks);
router.get('/getfilms',usercontroller.viewbooks);
router.get('/single/:id',usercontroller.value);
router.delete('/deletesingleData/:id',usercontroller.delete);
router.put('/update/:id',usercontroller.edit);
router.get('/filter',usercontroller.filterdata);




module.exports = router