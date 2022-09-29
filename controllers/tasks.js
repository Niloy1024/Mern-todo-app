const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')


const getAllTasks = asyncWrapper(async (req, res) => {
  const qo = {}
  const {category,nfl,nfh} = req.query;
  console.log(nfl)
  if(category!=undefined){
    qo.category = category; 
  }
  if(nfl!=undefined){
    if(qo.price!=undefined){
    qo.price.$gt =  Number(nfl);
    }
    else{
      qo.price = {}
      qo.price.$gt=Number(nfl)
    }
  }
  if(nfh!=undefined){
    if(qo.price!=undefined){
    qo.price.$lt =  Number(nfh);
    }
    else{
      qo.price = {}
      qo.price.$lt=Number(nfh)
    }
  }

  const tasks = await Task.find(qo)
  console.log(qo)
  
  res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
  console.log(req.body)
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOne({ _id: taskID })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }

  res.status(200).json({ task })
})
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndDelete({ _id: taskID })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }
  res.status(200).json({ task })
})
const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }

  res.status(200).json({ task })
})

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}