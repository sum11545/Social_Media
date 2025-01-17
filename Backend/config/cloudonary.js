const {v2:cloudinary} = require('cloudinary')
require('dotenv').config()
const multer = require('multer')
const {v4:uuid} = require('uuid')
const userModel = require('../models/userModel')


cloudinary.config({
cloud_name: process.env.CLOUD_NAME, 
api_key: process.env.API_KEY, 
api_secret: process.env.API_SECRET
})




module.exports = cloudinary;