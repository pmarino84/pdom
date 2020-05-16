import createVirtualElement from './createElement'
import renderNode from './render/render'
import VirtualComponent from './Component'

export const h = createVirtualElement
export const render = renderNode
export const Component = VirtualComponent

export default {
  h,
  render,
  Component
}
