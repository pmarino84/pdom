import { nativeNode } from '../pdom/createNode'

const Timer = (currentTime) => nativeNode.div({ className: 'timer' }, currentTime)

export default Timer
