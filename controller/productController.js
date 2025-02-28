const Product=require('../models/Product')
const Firm=require('../models/Firm')
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store images in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename with timestamp
  },
});

// Initialize Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
//   fileFilter: fileFilter,
});
const addProduct=async(req,res)=>{
    
    try {
        const {name,price,category,bestseller,description}=req.body;
        const image=req.file?req.file.filename:undefined;

        const firmId=req.params.firmId;
        const firm=await Firm.findById(firmId)
        if(!firm){
            return res.status(404).json({error:"firm not found"})
        }

        const newProduct=new Product({
            name,price,category,bestseller,description,image,firm:firm._id
        })

        const savedProduct=await newProduct.save()

        firm.products.push(savedProduct)

        await firm.save()

        res.status(200).json({savedProduct})
    } catch (error) {
        console.log(error);
        
        res.status(500).json({error:"server error"})

    }
}

const getProductByFirm=async(req,res)=>{
    try {
        const firmId=req.params.firmId;
        const firm=await Firm.findById(firmId)

        if(!firm){
            return res.status(404).json({error:'firm not found'})
        }

        const products=await Product.find({firm:firmId})
        res.status(200).json(products)
    } catch (error) {
        console.log(error);
        
        res.status(500).json({error:"server error"})
    }
}


const getSingleProduct=async(req,res)=>{
    try {
        const productId=req.params.productId
        const product=await Product.findById(productId)
        if(!product){
            return res.status(404).json({error:"product not found"})
        }

        res.status(200).json(product)

    } catch (error) {
        console.log(error);
        
        res.status(500).json({error:"server error"})
    }
}
module.exports={addProduct:[upload.single('image'),addProduct],getProductByFirm,getSingleProduct}