import { TEXT_NODE_NAME } from './constants'

export const flatArray = arr => [].concat.apply([], arr)

export const hasOwnProperty = (obj, name) => Object.prototype.hasOwnProperty.call(obj, name)

export const isFunction = obj => (obj && typeof obj === 'function')

export const isVirtualTextNode = vNode => vNode.tagName === TEXT_NODE_NAME
