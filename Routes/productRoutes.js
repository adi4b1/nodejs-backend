const express=require('express')

const productController=require('../controller/productController')
const router=express.Router()
router.post('/add-product/:firmId',productController.addProduct)
router.get('/:firmId/products',productController.getProductByFirm)
router.get('/:productId',productController.getSingleProduct)

module.exports=router