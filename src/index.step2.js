import PDOM, { render } from './pdom'
import App from './app/App.step2'
import './index.css'

// STEP 2.1: Static function component
window.addEventListener('load', () => {
  let container = document.getElementById('root')
  render(<App />, container)
})

// STEP 2.2: Static function component with function component children that have props
window.addEventListener('load', () => {
  let container = document.getElementById('root')
  render(<App />, container)
})

// STEP 2.3: Static function component with props.children
window.addEventListener('load', () => {
  let container = document.getElementById('root')
  render(<App />, container)
})
