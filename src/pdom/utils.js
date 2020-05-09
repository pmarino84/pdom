export const flatArray = arr => [].concat.apply([], arr)

export const hasOwnProperty = (obj, name) => Object.prototype.hasOwnProperty.call(obj, name)
