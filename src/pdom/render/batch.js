import { batchCreateNode, batchRemoveNode, batchReplaceNode, batchRemoveAttr, batchSetAttr } from './actions'
import { /* isFunction, */ isVirtualTextNode } from '../utils'

function diff(prev, next) {
  const prevType = typeof prev
  const nextType = typeof next
  return prevType !== nextType ||
    prev.tagName !== next.tagName ||
    (isVirtualTextNode(prev) && prev.attrs.textContent !== next.attrs.textContent)
}

function batchAttributesChanges(prev, next, element, queue) {
  let names = Object.keys(Object.assign({}, prev, next))
  names.forEach(name => {
    if (name !== 'children') {
      let prevValue = prev[name]
      let nextValue = next[name]
      if (!nextValue) {
        queue.push(batchRemoveAttr(element, name))
      } else if (!prevValue || prevValue !== nextValue) {
        queue.push(batchSetAttr(element, name, nextValue))
      }
    }
  })
}

function batchChildrenChanges(prev, next, parent, queue = []) {
  const oLen = prev.length
  const nLen = next.length
  const childNodes = parent.childNodes
  const len = Math.max(oLen, nLen)
  for (let i = 0; i < len; i++) {
    const el = childNodes[i]
    let prevChild = prev[i] // potrebbe essere una funzione
    // if (isFunction(prevChild.tagName)) prevChild = el._vNode
    let nextChild = next[i]
    if (Array.isArray(prevChild)) {
      console.warn('Batch - Traverse children - child as list under implementation: ', { prevChild, nextChild, el, parent })
      batchChildrenChanges(prevChild, nextChild, parent, queue)
    } else {
      traverse(prevChild, nextChild, el, queue)
    }
  }
  // if (oLen === nLen) {
  //   prev.forEach((child, i) => traverse(child, next[i], el, queue, i))
  // } else {
  //   console.error('batch children changes with different length: ', { prev, next, el, el })
  // }
}

function traverse(prevNode, nextNode, element, queue) {
  // const { tagName, attrs } = nextNode
  // let next = null
  // if (isFunction(tagName)) {
  //   next = tagName(attrs)
  // } else {
  //   next = nextNode
  // }

  if (!prevNode) {
    queue.push(batchCreateNode(element, nextNode))
  } else if (!nextNode) {
    queue.push(batchRemoveNode(element, prevNode, nextNode))
  } else if (diff(prevNode, nextNode)) {
    queue.push(batchReplaceNode(element, prevNode, nextNode))
  } else {
    batchAttributesChanges(prevNode.attrs, nextNode.attrs, element, queue)
    batchChildrenChanges(prevNode.children, nextNode.children, element, queue)
  }
  element._vNode = nextNode
}

export default function batch(nextNode, element) {
  let prevNode = element._vNode
  let queue = []
  traverse(prevNode, nextNode, element, queue)
  return queue
}