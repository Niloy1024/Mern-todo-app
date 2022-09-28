const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  
  category:{
    type:String,
    required:true,
    enum:['x','y','z'],
  },
  price:{
    type:Number,
    required:true,
  }
})

module.exports = mongoose.model('Task', TaskSchema)