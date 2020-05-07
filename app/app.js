const AppHeader = () => nativeNode.header(
  { className: 'app-header' },
  nativeNode.h1({ className: 'app-header__title' }, 'PDOM')
)

const Counter = (count) => nativeNode.div({ className: 'counter' }, 'Count: ', count.toString())

const Timer = (currentTime) => nativeNode.div({ className: 'timer' }, currentTime)

const AddTodo = (addTodo) => nativeNode.div(
  { className: 'add-todo' },
  nativeNode.form(
    { onSubmit: (e) => addTodo(e) },
    nativeNode.input(null),
    nativeNode.button(null, '+')
  )
)

const TodoListItem = (todo, attributes) => nativeNode.li({ ...attributes, className: 'todo-list__item' }, todo)

const TodoList = todos => nativeNode.ul(
  { className: 'todo-list' },
  todos.map((todo) => TodoListItem(todo, { key: todo }))
)

const App = (currentTime, todos, count, addTodo) => nativeNode.div(
  { className: `app${count >= 5 ? ' app--stopped' : ''}` },
  AppHeader(),
  (count < 5 && Counter(count)) || [],
  Timer(currentTime),
  AddTodo(addTodo),
  TodoList(todos)
)
