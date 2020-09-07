import React , {useState,useEffect} from 'react';
import axios from 'axios';

export default function Todos(){
    
    const [todos,setTodos] = useState(null);   
    const addTodo = (todo) => {
         
        axios.get(`http://localhost/matrix/api/add.php?todo=${todo}`)
             .then(function(response){
                const todosList = response.data.map(todo => {
                    return <div key={todo.id}>
                        <input type="checkbox" />
                        <input type="text" value={todo.todo} />
                        </div>
                }) 
                setTodos(todosList)
                console.log(response);
             })   
    }
    const getTodos = () => {
         
        axios.get(`http://localhost/matrix/api/select.php`)
             .then(function(response){
                const todosList = response.data.map(todo => {
                    return <div key={todo.id}>
                        <input type="checkbox" />
                        <input type="text" value={todo.todo} />
                        </div>
                }) 
                setTodos(todosList)
                console.log(response);
             })   
    }
    useEffect(() => {
        getTodos();
        // Run! Like go get some data from an API.
    },[]);
    
    return (
        <div>
            <div><input onClick={(e) => addTodo(e.target.value)} placeholder="What need to be done?" type="text" /></div>
        {todos}
        </div>
    );
}