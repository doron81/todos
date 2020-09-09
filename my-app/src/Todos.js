import React, { useState, useEffect } from "react";
import axios from "axios";
import {Typography ,CssBaseline , Input ,Checkbox ,Chip,Container} from '@material-ui/core';


// Todos component
export default function Todos() {
    
    // the component hooks
    const [todos, setTodos] = useState(null);
	const [inputs, setInputs] = useState({});

    // handeling the input change event
	const handleInputChange = (event, id) => {
		
        const { name, value } = event.target;
        console.log("e.target.value", name, value);
		setInputs({
			[name]: value,
        });
        console.log("setInputs", inputs);
		if (event.key === "Enter") {
            console.log("Enter")
			axios.get(
				`http://localhost/matrix/api/modify.php?todo=${value}&id=${id}`
			).then(function (response) {
				getTodos();
			});
		}
    };
    // checking if enter pressed and add new todo to the list
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			axios.get(
				`http://localhost/matrix/api/add.php?todo=${event.target.value}`
			).then(function (response) {
				getTodos();
			});
		}
	};

    // delete todo from the list
	const deleteTodo = (id) => {
		axios.get(`http://localhost/matrix/api/delete.php?id=${id}`).then(
			function (response) {
				console.log(response);
				getTodos();
			}
		);
    };
    
    // update the status of todo
	const setTodoStatus = (event, id) => {
		let completed = event.target.checked ? "1" : "0";
		let active = event.target.checked ? "0" : "1";
		console.log(event.target.checked, completed);
		axios.get(
			`http://localhost/matrix/api/modify.php?active=${active}&completed=${completed}&id=${id}`
		).then(function (response) {
			console.log(response);
			getTodos();
		});
    };
    
    // render all todos that are stored in the database

	const getTodos = () => {
		axios.get(`http://localhost/matrix/api/select.php`).then(function (
			response
		) {
			console.log(response);
			let todosList = "";
			if (response)
				todosList = response.data.map((todo) => {
					const lineThrough =
						todo.completed === "1" ? "line-through" : "none";
                    //setInputData(todo.todo)
                    console.log("inputs", inputs)
					return (
                        
						<div key={todo.id}>
							<Checkbox 
								onChange={(event) =>
									setTodoStatus(event, todo.id)
								}
							/>
							<Input
								name={todo.id}
								type="text"
								style={{ textDecoration: lineThrough }}
								value={
									inputs[todo.id] != null
										? inputs[todo.id]
										: todo.todo
								}
								onChange={(e) =>
									handleInputChange(e, todo.id)
                                }
                                onKeyDown={(e) => handleInputChange(e, todo.id)}
							/>
                            <Chip label="Delete" onDelete={() => deleteTodo(todo.id)} color="primary" />
						</div>
                        
					);
				});
			setTodos(todosList);
			console.log(response);
		});
	};
	useEffect(() => {
		getTodos();
	}, [inputs]);

	return (
		<Container maxWidth="sm">
            <CssBaseline />
			<div>
				<input
					onKeyDown={handleKeyDown}
					placeholder="What need to be done?"
					type="text"
				/>
			</div>
			{todos}
            </Container>
	);
}
