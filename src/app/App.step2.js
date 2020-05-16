import PDOM from '../pdom'
import Counter from './Counter'

// STEP 2.1
// const App = ({ }) => {
//   return (
//     <div className="app">
//       <h1 className="page-title">Virtual DOM - Step 2</h1>
//     </div>
//   )
// }

// STEP 2.2
// const App = ({ }) => {
//   return (
//     <div className="app">
//       <h1 className="page-title">Virtual DOM - Step 2</h1>
//       <Counter count={0} />
//     </div>
//   )
// }

// STEP 2.3
const Header = ({ children }) => {
  return (
    <header>
      {children}
    </header>
  )
}

const App = ({ count }) => {
  return (
    <div className="app">
      <Header>
        <h1 className="page-title">Virtual DOM - Step 2</h1>
      </Header>
      <Counter count={count} />
    </div>
  )
}

export default App
