import batch from './batch'
import patches from './patches'
import mount from './mount'

function updateView(vNode, oldEl) {
  console.time('Batch changes')
  const queue = batch(vNode, oldEl)
  console.timeEnd('Batch changes')
  
  // setTimeout(() => {
    console.time('Patches in')
    patches(queue)
    console.timeEnd('Patches in')
  // })
}

export default function render(vNode, container) {
  const el = container.firstChild
  const oldVnode = el && el._vNode
  if (!oldVnode) {
    console.time('First render')
    mount(vNode, container)
    console.timeEnd('First render')
  } else {
    console.time('Updated view in')
    updateView(vNode, el)
    console.timeEnd('Updated view in')
  }
}
