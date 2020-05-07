/* const CREATE = 'CREATE'
const REMOVE = 'REMOVE'
const SET_PROP = 'SET_PROP'
const REMOVE_PROP = 'REMOVE_PROP'

function diff(oldnode, newnode) {
  console.log('DIFF? ', { oldnode, newnode })
  //return typeof oldnode !== typeof newnode ||
  return false
}

function updateNode(oldnode, newnode, container) {
  const queue = []
  console.error('re rendering not implemented')
  if (diff(oldnode, newnode)) {
    // è cambiato raccolgo i suoi uodate
    console.error('update node not implemented')
  } else {
    // lui non è cambiato, ma i figli? ricorsione su di loro

  }
} */

function fixPatches(queue) {
  console.error('fixPatches not implemented! queue: ', queue)
  queue.forEach(({ type, payload }) => {
    const el = payload.el
    switch (type) {
      // case 'CREATE':
      case 'REPLACE':
        {
          const { newNode } = payload
          const parent = el.parentNode
          parent.replaceChild(renderNode(newNode), el)
        }
        break
      // case 'REMOVE':
      case 'SET_ATTR':
        {
          const { name, value } = payload
          el.setAttribute(parseAttributeName(name), value)
        }
        break
      case 'REMOVE_ATTR':
        {
          const { name } = payload
          el.removeAttribute(parseAttributeName(name))
        }
        break
    }
  })
}