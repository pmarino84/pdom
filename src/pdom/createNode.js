import { hasOwnProperty, flatArray } from './utils'

const KEY_ATTR_NAME = 'key'
const NAMESPACE_ATTR_NAME = 'namespace'

export const createNode = (nodeName, attributes, ...children) => {
  let attrs = attributes || {}
  let key = null
  if (hasOwnProperty(attrs, KEY_ATTR_NAME)) {
    key = attrs[KEY_ATTR_NAME]
    delete attrs[KEY_ATTR_NAME]
  }
  let namespace = null
  if (hasOwnProperty(attrs, NAMESPACE_ATTR_NAME)) {
    key = attrs[NAMESPACE_ATTR_NAME]
    delete attrs[NAMESPACE_ATTR_NAME]
  }
  return {
    nodeName,
    key,
    namespace,
    attributes: (attributes || {}),
    children: flatArray(children)
  }
}

export const nativeNode = tagName => (attributes, ...children) => createNode(tagName, attributes, ...children)

const NATIVE_NODE_TAGS = [
  'header',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'div',
  'aside',
  'section',
  'main',
  'a',
  'p',
  'ol',
  'ul',
  'li',
  'form',
  'input',
  'button'
]

NATIVE_NODE_TAGS.forEach(tagName => (nativeNode[tagName] = nativeNode(tagName)))
