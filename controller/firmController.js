const Firm = require("../models/Firm");
const Vendor = require("../models/Vendor");
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

const addFirm = async (req, res) => {
  const { firmName, area, category, region, offer } = req.body;
  const image = req.file ? req.file.filename : undefined;

  try {
    const vendor = await Vendor.findById(req.vendorId);

    if (!vendor) {
      return res.status(500).json({ messahe: "vendor not found" });
    }
    const firm = new Firm({
      firmName,
      area,
      category,
      region,
      offer,
      image,
      vendor: vendor._id,
    });

    const savedfirm=await firm.save();
    vendor.firm.push(savedfirm)

    await vendor.save()
    res.status(200).json({ success: "firm created success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
};

module.exports = { addFirm: [upload.single("image"), addFirm] };
