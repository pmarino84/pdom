import { CREATE_NODE, REMOVE_NODE, REPLACE_NODE, SET_ATTR, REMOVE_ATTR } from './batch'
import renderNode, { parseAttributeName, setAttribute } from './renderNode'

function logPatch(type, payload) {
  console.log(`PATCH - ${type}:`, payload)
}

function applyPatch(patch) {
  const { type, payload } = patch
  logPatch(type, payload)
  switch (type) {
    case CREATE_NODE:
      {
        const { el, node } = payload
        el.appendChild(renderNode(node))
      }
      break
    case REMOVE_NODE:
      {
        // rimuovere i listener agli eventi
        const { el } = payload
        const parent = el.parentNode
        parent.removeChild(el)
      }
      break
    case REPLACE_NODE:
      {
        // rimuovere i listener agli eventi prima di rimpiazzare
        const { el, newNode } = payload
        const parent = el.parentNode
        parent.replaceChild(renderNode(newNode), el)
      }
      break
    case SET_ATTR:
      {
        const { el, name, value } = payload
        setAttribute(el, name, value)
      }
      break
    case REMOVE_ATTR:
      {
        const { el, name } = payload
        el.removeAttribute(parseAttributeName(name))
      }
      break
  }
}

function patches(queue) {
  let patch = null
  if (queue && queue.length) {
    console.time('Patches in')
    while ((patch = queue.shift())) applyPatch(patch)
    console.timeEnd('Patches in')
  }
}

export default patches