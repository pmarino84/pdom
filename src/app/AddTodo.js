import { nativeNode } from '../pdom/createNode'

const AddTodo = (addTodo) => nativeNode.div(
  { className: 'add-todo' },
  nativeNode.form(
    { onSubmit: (e) => addTodo(e) },
    nativeNode.input(null),
    nativeNode.button(null, '+')
  )
)

export default AddTodo
