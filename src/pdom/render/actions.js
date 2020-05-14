export const CREATE_NODE = 'CREATE_NODE'
export const REPLACE_NODE = 'REPLACE_NODE'
export const REMOVE_NODE = 'REMOVE_NODE'
export const SET_ATTR = 'SET_ATTR'
export const REMOVE_ATTR = 'REMOVE_ATTR'

export const batchCreateNode = (el, node) => ({ type: CREATE_NODE, payload: { el, node } })
export const batchRemoveNode = (el, node) => ({ type: REMOVE_NODE, payload: { el, node } })
export const batchReplaceNode = (el, prevNode, nextNode) => ({ type: REPLACE_NODE, payload: { el, prevNode, nextNode } })
export const batchRemoveAttr = (el, name) => ({ type: REMOVE_ATTR, payload: { el, name } })
export const batchSetAttr = (el, name, value) => ({ type: SET_ATTR, payload: { el, name, value } })
