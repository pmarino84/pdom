import PDOM, { render } from './pdom'
import App from './app/App.step4'
import './index.css'

// STEP 4: Static class component
window.addEventListener('load', () => {
  let container = document.getElementById('root')
  render(<App />, container)
})
