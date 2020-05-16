import { CREATE_NODE, REMOVE_NODE, REPLACE_NODE, SET_ATTR, REMOVE_ATTR } from './actions'
import mount from './mount'
import { setAttribute, parseAttributeName } from './setAttributes'

function logPatch(type, payload) {
  console.warn(`PATCH - ${type}:`, payload)
}

function applyPatch(patch) {
  const { type, payload } = patch
  logPatch(type, payload)
  switch (type) {
    case CREATE_NODE:
      {
        const { el, node } = payload
        el.appendChild(mount(node))
      }
      break
    case REMOVE_NODE:
      {
        // TODO: rimuovere i listener agli eventi
        const { el } = payload
        const parent = el.parentNode
        parent.removeChild(el)
      }
      break
    case REPLACE_NODE:
      {
        // TODO: rimuovere i listener agli eventi
        const { el, nextNode } = payload
        const parent = el.parentNode
        const nextEl = mount(nextNode)
        parent.replaceChild(nextEl, el)
      }
      break
    case SET_ATTR:
      {
        const { el, name, value, nextNode } = payload
        setAttribute(el, name, value)
        el._vNode = nextNode
      }
      break
    case REMOVE_ATTR:
      {
        const { el, name, nextNode } = payload
        el.removeAttribute(parseAttributeName(name))
        el._vNode = nextNode
      }
      break
    default:
      console.warn(`Patch ${type} not processed`)
  }
}

function patches(queue) {
  let patch = null
  if (queue && queue.length) while ((patch = queue.pop())) applyPatch(patch)
}

export default patches