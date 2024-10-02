const express = require ('express');
const router = express.Router();
const usercontroller = require ('../controllers/usercontroller');

router.post('/movies',usercontroller.create);
router.get('/movies',usercontroller.view);
router.get('/movies/:id',usercontroller.value);
router.delete('/movies/:id',usercontroller.delete);
router.put('/movies/:id',usercontroller.edit);
// router.get('/filter',usercontroller.filterdata);




module.exports = router