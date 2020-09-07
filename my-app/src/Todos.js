import React , {useState,useEffect} from 'react';
import axios from 'axios';

export default function Todos(){
    
    const [todos,setTodos] = useState(null);   
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            axios.get(`http://localhost/matrix/api/add.php?todo=${event.target.value}`)
             .then(function(response){
                getTodos(); 
             })   
        } 
        
    }
    const setTodoCompleted = (event,id) => {
        let completed = event.target.checked ? '1' : '0';
        console.log(event.target.checked,completed);
        axios.get(`http://localhost/matrix/api/modify.php?completed=${completed}&id=${id}`)
        .then(function(response){
           console.log(response);
        })   
    }
    const getTodos = () => {
         
        axios.get(`http://localhost/matrix/api/select.php`)
             .then(function(response){
                const todosList = response.data.map(todo => {
                    return <div key={todo.id}>
                        <input type="checkbox" onChange={(event) => setTodoCompleted(event,todo.id)}/>
                        <input type="text" value={todo.todo} />
                        </div>
                }) 
                setTodos(todosList)
                console.log(response);
             })   
    }
    useEffect(() => {
        getTodos();
    },[]);
    
    return (
        <div>
            <div><input onKeyDown={handleKeyDown} placeholder="What need to be done?" type="text" /></div>
                {todos}
        </div>
    );
}