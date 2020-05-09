export const CREATE_NODE = 'CREATE_NODE'
export const REPLACE_NODE = 'REPLACE_NODE'
export const REMOVE_NODE = 'REMOVE_NODE'
export const SET_ATTR = 'SET_ATTR'
export const REMOVE_ATTR = 'REMOVE_ATTR'

const patchCreateNode = (node, el) => ({ type: CREATE_NODE, payload: { node, el } })
const patchRemoveNode = (node, el) => ({ type: REMOVE_NODE, payload: { node, el } })
const patchReplaceNode = (oldNode, newNode, el) => ({ type: REPLACE_NODE, payload: { oldNode, newNode, el } })
const patchRemoveAttr = (name, el) => ({ type: REMOVE_ATTR, payload: { name, el } })
const patchSetAttr = (name, value, el) => ({ type: SET_ATTR, payload: { name, value, el } })

function diff(prev, next) {
  const prevType = typeof prev
  const nextType = typeof next
  return prevType !== nextType ||
    // (prevType === 'string' && nextType === 'string' && prev !== next) ||
    (prevType === 'string' && prev !== next) ||
    prev.nodeName !== next.nodeName
}

function batchAttributesChanges(prev, next, el, queue) {
  const names = Object.keys(Object.assign({}, prev, next))
  names.forEach(name => {
    const o = prev[name]
    const n = next[name]
    if (!n) queue.push(patchRemoveAttr(name, el))
    else if (!o) {
      if (n !== o) {
        const nType = typeof n
        const oType = typeof o
        if (nType !== oType) {
          queue.push(patchSetAttr(name, n, el))
        } else if (nType === 'function') {
          let nStr = n.toString()
          let oStr = o.toString()
          if (nStr !== oStr) {
            queue.push(patchSetAttr(name, n, el))
          }
        }
      }
    }
  })
}

function batchChildrenChanges(prev, next, el, queue = []) {
  const oLen = prev.length
  const nLen = next.length
  const len = Math.max(oLen, nLen)
  for (let i = 0; i < len; i++) {
    traverse(prev[i], next[i], el, queue, i)
  }
  // if (oLen === nLen) {
  //   prev.forEach((child, i) => traverse(child, next[i], el, queue, i))
  // } else {
  //   console.error('batch children changes with different length: ', { prev, next, el, el })
  // }
}

function traverse(prev, next, parentEl, queue = [], index = 0) {
  let el = parentEl.childNodes[index]
  if (!prev) {
    queue.push(patchCreateNode(next, el || parentEl))
  } else if (!next) {
    queue.push(patchRemoveNode(prev, el))
  } else if (diff(prev, next)) {
    queue.push(patchReplaceNode(prev, next, el))
  } else if (next.nodeName) {
    batchAttributesChanges(prev.attributes, next.attributes, el, queue)
    batchChildrenChanges(prev.children, next.children, el, queue)
  }
}

function batch(prev, next, container) {
  let queue = []

  traverse(prev, next, container, queue)

  return queue
}

export default batch