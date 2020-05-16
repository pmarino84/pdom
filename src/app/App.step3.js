import PDOM from '../pdom'
import Counter from './Counter'
// import Timer from './Timer'

// const App = ({ count, currentTime }) => {
//   return (
//     <div className="app">
//       <h1 className="page-title">Virtual DOM</h1>
//       {count < 10 && <Counter count={count} />}
//       {count >= 10 && <Timer currentTime={currentTime} />}
//     </div>
//   )
// }

const App = ({ count }) => {
  return (
    <div className="app">
      <h1 className="page-title">Virtual DOM - Step 3</h1>
      <Counter count={count} />
    </div>
  )
}

export default App
