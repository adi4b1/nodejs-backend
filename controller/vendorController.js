const Vendor=require('../models/Vendor')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs');
const dotEnv=require('dotenv')

dotEnv.config()

const secretKey=process.env.mostValuablePersons
const vendorRegistration=async(req,res)=>{
    const {username,email,password}=req.body

    try{
        const vendoremail=await Vendor.findOne({email})
        if(vendoremail){
            return res.status(400).json('email already taken')
        }
        const hashpassword=await bcrypt.hash(password,10)

        const newVendor=new Vendor({
            username,email,password:hashpassword
        })

        await newVendor.save()
        res.status(200).json("vendor created success")
        console.log('user registered.......');
        

    }catch(err){
        res.status(500).json({message:'something error creating user'})
        console.log(err);
        

    }
}


const vendorLogin=async(req,res)=>{
    try{
        const{email,password}=req.body

        const vendor=await Vendor.findOne({email})
        if(!vendor || !(await bcrypt.compare(password,vendor.password))){
            res.status(401).json({error:'invalid username or password'})

        }
        const token=jwt.sign({vendorId:vendor._id},secretKey,{expiresIn:'1hr'})
        console.log(token);
        
        res.status(200).json({success:'login success',token})
        console.log(email);
        
    }catch(error){
        res.status(500).json({error:'login error'})
        console.log(error);
        
    }
}


const getallVendors=async(req,res)=>{
    try {
        const vendors=await Vendor.find().populate('firm')
        res.json({vendors})
    } catch (error) {
        console.log(error);
        
    }
}


const getVendorById=async(req,res)=>{
    const vendorId=req.params.id
    try {
        const fetchVendor=await Vendor.findById(vendorId).populate("firm")
        if(!fetchVendor){
            return res.status(404).json({message:"vendor not found"})
        }
    res.status(200).json({fetchVendor})
    } catch (error) {
        console.log(error);
        
    }
}
module.exports={vendorRegistration,vendorLogin,getallVendors,getVendorById}