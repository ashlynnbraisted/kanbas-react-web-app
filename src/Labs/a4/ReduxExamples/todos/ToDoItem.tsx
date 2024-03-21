import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { TodoType } from "../../../Store";
function ToDoItem({ todo }: { todo: TodoType },) {
  const dispatch = useDispatch();
  return (
    <li key={todo.id} className="list-group-item">
      <button onClick={() => dispatch(deleteTodo(todo.id))}> Delete </button>
      <button onClick={() => dispatch(setTodo(todo))}> Edit </button>
      {todo.title}
    </li>
  );
}
export default ToDoItem;