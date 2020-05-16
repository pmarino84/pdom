import { isVirtualTextNode, isFunction, isComponent } from '../utils'
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
    let compiled = null
    if (isComponent(tagName)) {
      let instance = new tagName(attrs)
      compiled = instance.render(attrs)
      compiled._component = instance
    } else {
      compiled = tagName(attrs)
    }
    mount(compiled, container)
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
