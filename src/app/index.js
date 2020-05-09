import AppHeader from './AppHeader'
import Counter from './Counter'
import Timer from './Timer'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import { nativeNode } from '../pdom/createNode'

const App = (currentTime, todos, count, addTodo) => nativeNode.div(
  { className: `app${count >= 5 ? ' app--stopped' : ''}` },
  AppHeader(),
  (count < 5 && Counter(count)) || [],
  Timer(currentTime),
  AddTodo(addTodo),
  TodoList(todos)
)

export default App
