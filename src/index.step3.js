import PDOM, { render } from './pdom'
import App from './app/App.step3'
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
