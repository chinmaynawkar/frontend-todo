import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import { BsCircleFill, BsFillTrashFill } from 'react-icons/bs';
import { MdCheckCircle } from 'react-icons/md'; 

function Home() {
  const [todos, setTodos] = useState([]);

  // the component mounts, and updating the state variable todos with the received 
  useEffect(() => {
    axios.get('https://backend-todo-3u5l.onrender.com/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err))
  }, [])

  const handleEdit = (id) => {
    axios.put('https://backend-todo-3u5l.onrender.com/edit' + id)
      .then(result => {
        location.reload()
      })
      .catch(err => console.log(err))
  }

  const handleDelete = (id) => {
    axios.delete('https://backend-todo-3u5l.onrender.com/delete' + id)
    .then(result => {
        location.reload()
    })
    .catch(err => console.log(err))

  }

  return (
    <div>
      <h2>Task Canvas</h2>
      <Create />
      {todos.length === 0 ? (
        <div>
          <h2>No Tasks</h2>
        </div>
      ) : (
        todos.map((todo, index) => (
          <div className="task" key={index}>
            <div className='checkbox' onClick={() => handleEdit(todo._id)}>
              {todo.done ?
                <MdCheckCircle className='icon' />
                : <BsCircleFill className='icon' />}
              <p className={todo.done ? "line_through" : ""}>{ todo.task } </p>
            </div>
            <div>
              <span><BsFillTrashFill className='icon'  
              onClick={ () => handleDelete(todo._id) } /></span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
