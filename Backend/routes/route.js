const express = require('express')
const router = express.Router()
const userModel = require('../models/userModel')
const cloudinary = require('../config/cloudonary')
const {v4:uuidv4} = require('uuid')
const fs = require('fs')
const multer = require('multer')

router.get('/',async(req,res)=>{
  const user = await userModel.find({})
  res.send(user)
})

const storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads')
    },
    filename:function(req,file,cb){
        const random = uuidv4()
        cb(null,random+""+file.originalname)
    }
})

const upload = multer({storage:storage})

router.post('/',upload.array('image',10),async(req,res)=>{
    const {name,url} = req.body

   if(!req.files){
    return res.json({message:"NO file uploaded"})
   }
 
const urlExi =  await userModel.findOne({url:url})
if(urlExi){
  res.status(400).json({message:"url exist in database"})
}
const imageurl = []

for(const file of req.files){
    const cloud = await cloudinary.uploader.upload(file.path,()=>{
        console.log("file uploaded")
       })
       imageurl.push({url:cloud.secure_url})

}
  

   const user = new userModel({
    name:name,
    url:url,
    images:imageurl
    
   })
   await user.save()
   res.json({message:"user created",user:user})

   req.files.forEach((file) => {
    const filePath = file.path || `Backend/uploads/${file.filename}`;
    
    console.log(`Deleting file: ${filePath}`);
    
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file ${filePath}: ${err.message}`);
      } else {
        console.log(`File deleted successfully: ${filePath}`);
      }
    });
  });
  
})


router.get('/admin', async (req, res) => {
    try {
      const data = await userModel.find({});
      res.json(data); // Send the fetched data as a JSON response
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Error fetching users' }); // Handle errors
    }
  });
  

module.exports = router;

