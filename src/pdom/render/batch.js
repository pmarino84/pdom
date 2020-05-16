import { batchCreateNode, batchRemoveNode, batchReplaceNode, batchRemoveAttr, batchSetAttr } from './actions'
import { /* isFunction, */ isVirtualTextNode } from '../utils'

function diff(prev, next) {
  const prevType = typeof prev
  const nextType = typeof next
  return prevType !== nextType ||
    prev.tagName !== next.tagName ||
    (isVirtualTextNode(prev) && prev.attrs.textContent !== next.attrs.textContent)
}

function batchAttributesChanges(prevAttrs, nextNode, element, queue) {
  let nextAttrs = nextNode.attrs
  let names = Object.keys(Object.assign({}, prevAttrs, nextAttrs))
  names.forEach(name => {
    if (name !== 'children') {
      let prevValue = prevAttrs[name]
      let nextValue = nextAttrs[name]
      if (!nextValue) {
        queue.push(batchRemoveAttr(element, name, nextNode))
      } else if (!prevValue || prevValue !== nextValue) {
        queue.push(batchSetAttr(element, name, nextValue, nextNode))
      }
    }
  })
}

function batchChildrenChanges(nextChildren, parent, queue = []) {
  const childNodes = parent.childNodes
  const nLen = nextChildren.length
  const len = Math.max(childNodes.length, nLen)
  for (let i = 0; i < len; i++) {
    const el = childNodes[i]
    let prevNode = el._vNode
    let nextNode = nextChildren[i]
    if (Array.isArray(prevNode)) {
      console.warn('Batch - Traverse children - child as list under implementation: ', { prevNode, nextNode, el, parent })
      batchChildrenChanges(nextNode, parent, queue)
    } else {
      crossTheTree(prevNode, nextNode, el, queue)
    }
  }
  // if (oLen === nLen) {
  //   prev.forEach((child, i) => traverse(child, next[i], el, queue, i))
  // } else {
  //   console.error('batch children changes with different length: ', { prev, next, el, el })
  // }
}

function crossTheTree(prevNode, nextNode, element, queue) {
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
    batchAttributesChanges(prevNode.attrs, nextNode, element, queue)
    batchChildrenChanges(nextNode.children, element, queue)
  }
}

export default function batch(nextNode, element) {
  let prevNode = element._vNode
  let queue = []
  crossTheTree(prevNode, nextNode, element, queue)
  return queue
}