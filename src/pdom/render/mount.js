import { isVirtualTextNode, isFunction } from '../utils'
import setAttributes from './setAttributes'

function mountChildren(children, container) {
  children.forEach(child => {
    if (Array.isArray(child))
      mountChildren(child, container)
    else
      mount(child, container)
  })
}

export default function mount(vNode, container) {
  const { tagName, attrs, children } = vNode
  let el = null
  if (isVirtualTextNode(vNode)) {
    el = document.createTextNode(attrs && attrs.textContent)
  } else if (isFunction(tagName)) {
    const v = tagName(attrs)
    mount(v, container)
  } else {
    el = document.createElement(tagName)
    setAttributes(el, attrs) // gli unici che possono farlo
  }
  if (el) {
    el._vNode = vNode
    // mount children
    mountChildren(children, el)
    container && container.appendChild(el)
  }

  return el
}
