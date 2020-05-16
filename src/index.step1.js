import PDOM, { render } from './pdom'
import './index.css'

// STEP 1: render dynamic virtual element
const DELAY = 3000
let globalCount = 0
const step1 = (count) => <div className="app">
  <h1 className="page-title">Virtual DOM</h1>
  <p className={count % 2 ? 'fg-red' : 'fg-green'}>Count: {count}</p>
</div>

const updateUI = (count, container) => render(step1(count), container)

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
