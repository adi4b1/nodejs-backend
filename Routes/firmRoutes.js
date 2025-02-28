const express=require('express')
const firmController=require('../controller/firmController')
const router=express.Router()

const verifyToken=require('../middlewares/verifyToken')



router.post('/add-firm',verifyToken,firmController.addFirm)



module.exports=router