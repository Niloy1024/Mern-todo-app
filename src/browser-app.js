const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const category_filter = document.querySelector('.category_filter')
let url  = '/api/v1/tasks'

const setq = (x)=>{
  url = `/api/v1/tasks?category=${x}`
  showTasks();
}

const showTasks = async () => {
  
  loadingDOM.style.visibility = 'visible'
  try {
    const {
      data: { tasks },
    } = await axios.get(url)
    
    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    const allTasks = tasks
      .map((task) => {
        const { price,category, _id: taskID, name } = task
        return `<div class="max-w-sm rounded overflow-hidden shadow-lg">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">${name}</div>
          <p class="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
          </p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${price}</span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${category}</span>
        </div>
      </div>`
      })
      .join('')
    tasksDOM.innerHTML = allTasks
  } catch (error) {
    console.log("sncksds")
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
      console.log(error)
  }
  loadingDOM.style.visibility = 'hidden'
}

showTasks()



// form