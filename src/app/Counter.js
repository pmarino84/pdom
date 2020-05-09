import { nativeNode } from '../pdom/createNode'

const Counter = (count) => nativeNode.div({ className: 'counter' }, 'Count: ', count.toString())

export default Counter
