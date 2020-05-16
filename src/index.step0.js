import PDOM, { render } from './pdom'
import './index.css'

// STEP 0: render static virtual element
const step0 = <div className="app">
  <h1 className="title">Virtual DOM</h1>
  <p className="counter">Count: NONE</p>
</div>

window.addEventListener('load', () => {
  let container = document.getElementById('root')
  render(step0, container)
})
