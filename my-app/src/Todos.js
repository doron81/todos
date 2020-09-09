import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Todos() {
	const [todos, setTodos] = useState(null);
	const [inputs, setInputs] = useState({});

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
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			axios.get(
				`http://localhost/matrix/api/add.php?todo=${event.target.value}`
			).then(function (response) {
				getTodos();
			});
		}
	};

	const deleteTodo = (id) => {
		axios.get(`http://localhost/matrix/api/delete.php?id=${id}`).then(
			function (response) {
				console.log(response);
				getTodos();
			}
		);
	};
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
							<input
								type="checkbox"
								onChange={(event) =>
									setTodoStatus(event, todo.id)
								}
							/>
							<input
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
							<button onClick={() => deleteTodo(todo.id)}>
								X
							</button>
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
		<div>
			<div>
				<input
					onKeyDown={handleKeyDown}
					placeholder="What need to be done?"
					type="text"
				/>
			</div>
			{todos}
		</div>
	);
}
