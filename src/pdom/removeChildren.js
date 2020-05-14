export default function removeChildren(container) {
  let el = null
  while ((el = container.firstChild)) {
    container.removeChild(el)
  }
}
