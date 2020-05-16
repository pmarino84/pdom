import createVirtualElement from './createElement'
import renderNode from './render/render'

export const h = createVirtualElement
export const render = renderNode

export default {
  h,
  render
}
