import React, { useState, useEffect } from "react";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  description?: string;
  due?: string;
  completed: boolean;
}

function WorkingWithArrays() {
  const API_BASE = process.env.REACT_APP_API_BASE;
    const API = `${API_BASE}/a5/todos`;
    const [todo, setTodo] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });
    const [todos, setTodos] = useState<Todo[]>([]);
    const fetchTodos = async () => {
      const response = await axios.get(API);
      setTodos(response.data);
    };
    useEffect(() => {
      fetchTodos();
    }, []);
  
    const removeTodo = async (todo: Todo) => {
      const response = await axios
        .get(`${API}/${todo.id}/delete`);
      setTodos(response.data);
    };
  
    const fetchTodoById = async (id: number) => {
      const response = await axios.get(`${API}/${id}`);
      setTodo(response.data);
    };
  
    const updateTitle = async () => {
      const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
      setTodos(response.data);
    };

  const createTodo = async () => {
    const response = await axios.get(`${API}/create`);
    setTodos([...todos, response.data]);
  };

  const postTodo = async () => {
    const response = await axios.post(API, todo);
    setTodos([...todos, response.data]);
  };


  const deleteTodo = async (todo: Todo ) => {
    const response = await axios.delete(`${API}/${todo.id}`);
    setTodos(todos.filter((t) => t.id !== todo.id));
  };

  const updateTodo = async () => {
    const response = await axios.put(`${API}/${todo.id}`, todo);
    setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
  };

    return (
      <div>
        <h3>Working with Arrays</h3>
        <h4>Retrieving Arrays</h4>
        <a href={API}>
          Get Todos
        </a>
        <h4>Retrieving an Item from an Array by ID</h4>
        <input type="number" value={todo.id}
            onChange={(e) => setTodo({ ...todo,
            id: parseInt(e.target.value) })}/>
            <br/>
        <a href={`${API}/${todo.id}`}>
            Get Todo by ID
        </a>
        <h3>Filtering Array Items</h3>
        <a href={`${API}?completed=true`}>
            Get Completed Todos
        </a>
        <h3>Creating new Items in an Array</h3>
        <a href={`${API}/create`}>
            Create Todo
        </a>
        <h3>Deleting from an Array</h3>
        <input type="number" value={todo.id}
            onChange={(e) => setTodo({
            ...todo, id: parseInt(e.target.value) })}/>
            <br/>
        <a href={`${API}/${todo.id}/delete`}>
            Delete Todo with ID = {todo.id}
        </a>
        <h3>Updating an Item in an Array</h3>
        <input type="number" value={todo.id}
            onChange={(e) => setTodo({
            ...todo, id: parseInt(e.target.value) })}/>
            <br/>
        <input type="text" value={todo.title}
            onChange={(e) => setTodo({
            ...todo, title: e.target.value })}/>
            <br/>
        <a href={`${API}/${todo.id}/title/${todo.title}`} >
            Update Title to {todo.title}
        </a>
        <br/>
        <input type="text" value={todo.description}
            onChange={(e) => setTodo({
            ...todo, description: e.target.value })}/>
        <br/>
        <a href={`${API}/${todo.id}/description/${todo.description}`} >
            Update Description to {todo.description}
        </a>
        <br/>
        <input type="checkbox"
            onChange={(e) => setTodo({
            ...todo, completed: Boolean(e.target.value) })}/>
            <a href={`${API}/${todo.id}/completed/${todo.completed}`} >
            Set completed status to {todo.completed.toString()}
        </a>
        <br/>
        <h3>Rendering Array Items</h3>
        <button onClick={createTodo} >
        Create Todo
      </button>
      <br/>
      <input  value={todo.id} onChange={(e) => setTodo({
            ...todo, id: parseInt(e.target.value) })} />
            <br/>
      <input  value={todo.title} onChange={
            (e) => setTodo({ ...todo, title: e.target.value })} />
            <br/>
      <button onClick={updateTitle} >
        Update Title
      </button>
      <br/>
      <input value={todo.description} type="text"
        onChange={(e) => setTodo({ ...todo,
          description: e.target.value })} />
          <br/>
      <input value={todo.due} type="date"
        onChange={(e) => setTodo({
          ...todo, due: e.target.value })} />
          <br/>
      <label>
        <input value={todo.completed.toString()} type="checkbox"
          onChange={(e) => setTodo({
            ...todo, completed: e.target.checked })} />
        Completed
      </label>
      <br/>
      <button onClick={postTodo}> Post Todo </button>
      <br/>
        <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input checked={todo.completed}
              type="checkbox" readOnly />
            {todo.title}
            <p>{todo.description}</p>
            <p>{todo.due}</p>
              <button onClick={() => fetchTodoById(todo.id)} >
                Edit
              </button>
              <button onClick={() => removeTodo(todo)} >
                Remove
            </button>
            <button onClick={() => deleteTodo(todo)}
              className="btn btn-danger float-end ms-2">
              Delete
            </button>
          </li>
        ))}
      </ul>
      </div>
    );
  }
  export default WorkingWithArrays;