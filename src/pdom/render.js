import renderNode from './renderNode'
import batch from './batch'
import patches from './patches'

export default function render(vnode, container) {
  if (!vnode || !container) throw new Error('vDOM and/or container not found')
  let oldNode = container._vNode
  let rootEl
  if (!oldNode) {
    console.time('First render')
    rootEl = renderNode(vnode)
    if (container.childNodes.length) container.innerHTML = ''
    container.appendChild(rootEl)
    console.timeEnd('First render')
  } else {
    console.time('Batch changes in')
    const queue = batch(oldNode, vnode, container)
    console.timeEnd('Batch changes in')
    patches(queue)
  }
  container._vNode = vnode
  // container._vNodeId = vnode.id
  // window._pel = container
  window._pdom = vnode
}
