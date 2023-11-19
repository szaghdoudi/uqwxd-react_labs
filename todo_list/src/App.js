import React, {useState} from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  
  function handleSubmit(e){
    e.preventDefault();
    let  todo = document.getElementById('todoAdd').value; 
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false
    };

    if(newTodo.text.length> 0){
      setTodos([...todos].concat(newTodo));
    }else{
      alert("Enter a vlaid task");
    }
    document.getElementById('todoAdd').value="";

  }

  function deleteTodod(id){
    let updatedTodos = [...todos].filter((todo)=> todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id){
      let updatedTodos = [...todos].map((todo)=>{
        if(todo.id === id){
          todo.completed = !todo.completed;
        }
        return todo;
      })
      setTodos(updatedTodos);
  }
  
  function submitEdits(newTodo){
    const updatedTodos = [...todos].map((todo)=>{
      if(todo.id === newTodo.id){
        todo.text = document.getElementById(newTodo.id).value;
      }
      return todo;
    })
    setTodos(updatedTodos);
    setTodoEditing(null);

  }

  
return(
<div id="todo-list">
  <h1>Todo List</h1>
  <form onSubmit={handleSubmit}>
    <input type="text" id ="todoAdd" />
    <button type="submit">Add todo</button>
  </form>
  {todos.map((todo)=>
    <div className="todo" key={todo.id}>
      <div className="todo-text">
       {/* Add checkbox for toggle complete */}
        <input type="checkbox" id="completed" checked={todo.completed} onChange={()=>toggleComplete(todo.id)}></input>

        {/*if it's edit mode, display input box, else display text*/}
        {todo.id === todoEditing?
          (<input type="text" id={todo.id}
            defaultValue={todo.text}
          />)
          :
          (<div>{todo.text}</div>)
        }
      </div>
      <div className="todo-actions">
        {/*if it is edit mode, allow submit edit, else allow edit  */}
        {todo.id === todoEditing ?
        (
          <button onClick={()=>submitEdits(todo)}>Submit Edits</button>
        ):(
          <button onClick={()=> setTodoEditing(todo.id)}>Edit</button>  
        )
        }
        <button onClick={()=>deleteTodod(todo.id)}>Delete</button>
      </div>  
    </div>

  )}

</div>
);
};
export default App;
