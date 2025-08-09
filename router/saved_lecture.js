//get product saved it
//save product by create entity in table saved_product
//delete product saved it
//when click on product will go to endpoint /product

const router=require("express").Router();
const catchError=require("../utils/catchError");
const auth=require("../middleware/auth");
const validationId=require("../middleware/validationId");
const {
    deleteLectureSaved,
    getLectureSaved,
    savedLecture
}=require("../controller/saved_lectureController");

router.param("id",validationId);
router.use(auth);

router.route("/")
.post(catchError(savedLecture))//*
.get(catchError(getLectureSaved));//*

router.delete('/:id',catchError(deleteLectureSaved));//*


//the endpoint in product or spcific product on any page
// POST /saved_product 

//the endpoints in profile
// GET /saved_product
// DELETE /saved_product/:id 


module.exports=router;