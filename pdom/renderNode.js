function parseAttributeName(name) {
  let parsed = name
  if (name === 'className') parsed = 'class'
  else if (name === 'htmlFor') parsed = 'for'
  return parsed
}

function setAttribute(el, attrName, value) {
  const name = parseAttributeName(attrName)
  if (name === 'onSubmit') {
    // el.setAttribute(name, value)
    el.onsubmit = e => {
      e.preventDefault()
      value(e)
    }
  } else {
    el.setAttribute(name, value)
  }
}

function setAttributes(el, attributes) {
  for (let key in attributes) {
    setAttribute(el, key, attributes[key])
  }
}

function renderNodeChildren(children, parent) {
  if (children) {
    children.forEach(child => {
      if (Array.isArray(child)) renderNodeChildren(child, parent)
      else {
        let childEl = renderNode(child)
        parent.appendChild(childEl)
      }
    })
  }
}

function renderNode(vnode) {
  const type = typeof vnode
  // vnode.id = uuidV4()

  let el
  if (type === 'string') {
    el = document.createTextNode(vnode)
  } else {
    const { nodeName, attributes, children } = vnode

    el = document.createElement(nodeName)

    setAttributes(el, attributes)

    renderNodeChildren(children, el)
  }

  return el
}
