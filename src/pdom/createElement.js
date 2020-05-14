import { TEXT_NODE_NAME } from './constants'
import { isFunction } from './utils'
// import { flatArray } from './utils'

function makeAttributes(attributes, children) {
  // return Object.assign(attributes || {}, { children: /* serve davvero flatArray? */ flatArray(children) })
  return Object.assign(attributes || {}, { children: children })
}

function makeChildren(children) {
  return children.reduce((list, child) => {
    const childType = typeof child
    if (child !== null && childType !== 'boolean') {
      let obj
      if(childType === 'object') {
        obj = child
      } else  /* TextNode */ {
        obj = createElement(TEXT_NODE_NAME, { textContent: child.toString() })
      }
      list.push(obj)
    }
    return list
  }, [])
}

export default function createElement(tagName, attributes, ...children) {
  const fnComp = isFunction(tagName)
  return {
    tagName,
    attrs: makeAttributes(attributes, fnComp ? children : []),
    children: fnComp ? [] : makeChildren(children)
  }
}
