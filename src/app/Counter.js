import PDOM from '../pdom'

const Counter = ({count}) => {
  const className = 'counter ' + (count % 2 ? 'fg-red' : 'fg-green')
  return <div className={className}>Count: {count}</div>
}

export default Counter
