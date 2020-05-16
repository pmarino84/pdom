import PDOM, { render } from './pdom'
import App from './app/App'
import './index.css'

// STEP 2: Static function component
window.addEventListener('load', () => {
  let container = document.getElementById('root')
  render(<App />, container)
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
