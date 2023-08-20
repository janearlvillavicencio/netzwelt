import { useState, useEffect, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';


export default function Register() {

	const { user } = useContext(UserContext);

    const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

    const [ isActive, setIsActive] = useState(false);

    console.log(username);
	console.log(password);
	console.log(confirmPassword);

    function registerUser(e) {

		// Prevents the page redirection via form submission
		e.preventDefault();

		fetch(`http://localhost:4000/users/checkEmail`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				username: username
			})
		})
		.then(res => res.json())
		.then(data => {

			if(data) {
				alert("Duplicate username found!")
			} else {

				fetch(`http://localhost:4000/users/register`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						username: username,
						password: password
					})
				})
				.then(res => res.json())
				.then(data => {
					console.log(data);

					if(data) {
						setUsername("");
						setPassword("");
						setConfirmPassword("");

						alert("Thank you for registering!")

					} else {

						alert("Please try again later.")
					}

				})
			}

		})

	};

	/*
		This side effect is to validate the states whether each state is empty string or not, if password is correct and if mobileNo has 11 digits.
	*/
	useEffect(() => {

		if(( username !== ""  && password !== "" && confirmPassword !== "") && (password === confirmPassword)) {
				setIsActive(true)
		} else {

				setIsActive(false)
		}

	}, [ username, password, confirmPassword]);

	return (
		
		(user.id !== null) ?
			<Navigate to="/users" />
			:
			<Container className="font" style={{ maxWidth: "400px" }}>
		<Form onSubmit={e => registerUser(e)}>
		  <h1 className="my-5 text-center">Register</h1>

		  <Form.Group className="mb-3" controlId="Email address">
		    <Form.Label>Username: </Form.Label>
		    <Form.Control 
		    	type="username" 
		    	placeholder="Input Username"  
		    	required
		    	value={username}
		    	onChange={e => {setUsername(e.target.value)}}
		    />
		  </Form.Group>

		  <Form.Group className="mb-3" controlId="Password1">
		    <Form.Label>Password: </Form.Label>
		    <Form.Control 
		    	type="password" 
		    	placeholder="Enter Password" 
		    	required 
		    	value={password}
		    	onChange={e => {setPassword(e.target.value)}}
		    />
		  </Form.Group>

		  <Form.Group className="mb-3" controlId="Password2">
		    <Form.Label>Confirm Password:</Form.Label>
		    <Form.Control 
		    	type="password" 
		    	placeholder="Confirm Password" 
		    	required 
		    	value={confirmPassword}
		    	onChange={e => {setConfirmPassword(e.target.value)}}
		    />
		  </Form.Group>

		  {
		  	isActive 
		  		? <Button variant="primary" type="submit" id="submitBtn">Submit</Button>
		  		: <Button variant="danger" type="submit" id="submitBtn" disabled>Submit</Button>
		  }

		</Form>
		
		
</Container>


	)

};