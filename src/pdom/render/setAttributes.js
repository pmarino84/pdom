export function parseAttributeName(name) {
  let parsed = name
  if (name === 'className') parsed = 'class'
  // else if (name === 'htmlFor') parsed = 'for'
  return parsed
}

export function setAttribute(el, attrName, value) {
  let name
  if (attrName.startsWith('on')) {
    name = attrName.toLowerCase().slice(2)
    el.addEventListener(name, value, false)
  } else if (attrName === 'value' || attrName === 'checked') {
    el[attrName] = value
  } else {
    name = parseAttributeName(attrName)
    el.setAttribute(name, value)
  }
}

export default function setAttributes(el, attributes) {
  for (let key in attributes) {
    setAttribute(el, key, attributes[key])
  }
}
