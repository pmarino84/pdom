import PDOM, { render } from './pdom'
import App from './app/App'
import './index.css'

// STEP 3: Dynamic function component
const DELAY = 3000
let globalCount = 0

const updateUI = (count, container) => render(<App count={count} />, container)

function run(container) {
  updateUI(globalCount, container)
  let intervalId = setInterval(() => {
    updateUI(++globalCount, container)
  }, DELAY)
  return () => clearInterval(intervalId)
}

window.stopApp = () => { }

window.addEventListener('load', () => {
  let container = document.getElementById('root')
  window.stopApp = run(container)
})

// function getCurrentTime() {
//   const d = new Date()
//   return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
// }

// let count = 0
// const todos = []

// const addTodo = (e) => todos.push('new todo')

// const updateUI = ({ currentTime, todos, count, addTodo }, container) => render(<App count={count} />, container)

// function run(container) {
//   updateUI({ currentTime: 0, todos: [], count }, container)
//   let intervalId = setInterval(() => {
//     const currentTime = getCurrentTime()
//     updateUI({ currentTime, todos, count: count++, addTodo }, container)
//   }, 3000)
//   return () => clearInterval(intervalId)
// }

// window.stopApp = () => { }

// window.addEventListener('load', () => window.stopApp = run(document.getElementById('root')))
