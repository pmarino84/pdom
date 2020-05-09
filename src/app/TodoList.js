import { nativeNode } from '../pdom/createNode'

const TodoListItem = (todo, attributes) => nativeNode.li({ ...attributes, className: 'todo-list__item' }, todo)

const TodoList = todos => nativeNode.ul({ className: 'todo-list' }, todos.map((todo) => TodoListItem(todo, { key: todo })))

export default TodoList