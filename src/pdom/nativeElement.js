import createElement from './createElement'

function nativeElement(tagName) {
  return (attributes, ...children) => createElement(tagName, attributes, ...children)
}

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
  'article',
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

NATIVE_NODE_TAGS.forEach(tagName => (nativeNode[tagName] = nativeElement(tagName)))

export default nativeElement
