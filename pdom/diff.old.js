const CREATE = 'CREATE'
const REPLACE = 'REPLACE'
const REMOVE = 'REMOVE'
const SET_ATTR = 'SET_ATTR'
const REMOVE_ATTR = 'REMOVE_ATTR'

// TODO: manca il riferimento all'elemento su cui applicare le modifiche!!!
const patchCreateNode = (node, el) => ({ type: CREATE, payload: { node, el } })
const patchRemoveNode = (node, el) => ({ type: REMOVE, payload: { node, el } })
const patchReplaceNode = (oldNode, newNode, el) => ({ type: REPLACE, payload: { oldNode, newNode, el } })
const patchRemoveAttr = (name, el) => ({ type: REMOVE_ATTR, payload: { name, el } })
const patchSetAttr = (name, value, el) => ({ type: SET_ATTR, payload: { name, value, el } })

function queueAttributesChanges(oldAttrs = {}, newAttrs = {}, el) {
  let queue = []
  for (let name in oldAttrs) {
    let ov = oldAttrs[name]
    let nv = newAttrs[name]
    if (!nv) {
      queue.push(patchRemoveAttr(name, el))
    } else if (ov !== nv) {
      queue.push(patchSetAttr(name, nv, el))
    }
  }
  return queue
}

function patches(oldNode, newNode, el) {
  let queue = []
  const oldNodeType = typeof oldNode
  const newNodeType = typeof newNode
  if (!oldNode) {
    queue.push(patchCreateNode(newNode, el))
  } else if (!newNode) {
    queue.push(patchRemoveNode(oldNode, el))
  } else if (oldNodeType !== newNodeType) {
    queue.push(patchReplaceNode(oldNode, newNode, el))
  } else {
    if(oldNodeType === 'string') {
      if(oldNode !== newNode) {
        queue.push(patchReplaceNode(oldNode, newNode, el))
      }
    } else {
      const oldNodeName = oldNode.nodeName
      const newNodeName = newNode.nodeName
      if (oldNodeName !== newNodeName) {
        queue.push(patchReplaceNode(oldNode, newNode, el))
      } else {
        queue = [...queue, ...queueAttributesChanges(oldNode.attributes, newNode.attributes, el)]
  
        const oldChildren = oldNode.children
        const newChildren = newNode.children
        const oLen = oldChildren.length
        const nLen = newChildren.length
        const childNodes = el.childNodes
        if(oLen === nLen) {
          oldChildren.forEach((child, i) => {
            let newChild = newChildren[i]
            queue = [...queue, ...patches(child, newChild, childNodes[i])]
          })
        } else {
          console.error('children list changed length ', { oldChildren, newChildren })
        }
      }
    }
  }
  return queue
}

function diff(oldNode, newNode, element) {
  return patches(oldNode, newNode, element)
}