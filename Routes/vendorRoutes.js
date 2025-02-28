const vendorController=require('../controller/vendorController')


const express=require('express')

const router=express.Router()



router.post('/register',vendorController.vendorRegistration)
router.post('/login',vendorController.vendorLogin)
router.get('/all-vendors',vendorController.getallVendors)
router.get('/get-vendor/:id',vendorController.getVendorById)

module.exports=router