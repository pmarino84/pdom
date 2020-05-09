import render from './pdom/render'
import App from './app'
import './index.css'

function getCurrentTime() {
  const d = new Date()
  return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}

let count = 0
const todos = []

const addTodo = (e) => todos.push('new todo')

const updateUI = ({ currentTime, todos, count, addTodo }, container) => render(App(currentTime, todos, count, addTodo), container)

function run(container) {
  let intervalId = setInterval(() => {
    const currentTime = getCurrentTime()
    updateUI({ currentTime, todos, count: count++, addTodo }, container)
  }, 1000)
  return () => clearInterval(intervalId)
}

window.stopApp = () => { }

window.addEventListener('load', () => {
  window.stopApp = run(document.getElementById('root'))
})
