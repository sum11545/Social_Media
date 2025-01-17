const mongoose = require('mongoose')


const userSchema  = mongoose.Schema({
  name: String,
  url:String,
  images:[
    {
        url:String,
    }
  ]
})

module.exports = mongoose.model('User',userSchema)