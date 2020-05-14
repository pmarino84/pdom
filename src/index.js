import PDOM, { render } from './pdom'
// import App from './app/App'
import './index.css'

// STEP 0: render static virtual element
// const step0 = <div className="app">
//   <h1 className="title">Virtual DOM</h1>
//   <p className="counter">Count: NONE</p>
// </div>

// window.addEventListener('load', () => {
//   let container = document.getElementById('root')
//   render(step0, container)
// })

// STEP 1: render dinamic virtual element
const STEP_1_DELAY = 3000
let step1Count = 0
const step1 = (count) => <div className="app">
  <h1 className="page-title">Virtual DOM</h1>
  <p className={count % 2 ? 'fg-red' : 'fg-green'}>Count: {count}</p>
</div>

const updateUI = (count, container) => render(step1(count), container)

function run(container) {
  updateUI(step1Count, container)
  let intervalId = setInterval(() => {
    updateUI(++step1Count, container)
  }, STEP_1_DELAY)
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
