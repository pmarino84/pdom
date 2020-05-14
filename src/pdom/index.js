import createVirtualElement from './createElement'
import renderNode from './render/render'

export const createElement = createVirtualElement
export const render = renderNode

export default {
  createElement,
  render
}
