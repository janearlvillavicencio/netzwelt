import { useState, useEffect, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Login() {

	// Allows us to consume the User context object and its properties to be used for user validation
	const { user, setUser } = useContext(UserContext);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [isActive, setIsActive] = useState(false);

	console.log(username);
	console.log(password);

	function authenticateUser(e) {
		e.preventDefault();

		fetch(`http://localhost:4000/users/login`, {
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

				if(data.access) {

					// Set the token of the authenticated user in the local storage.
					// Syntax:
						// localStorage.setItem("propertyName", value);
					localStorage.setItem("token", data.access);

					// Sets the global user state to have the properties obtained from localStorage.
					// setUser({
					// 	access: localStorage.getItem("token")
					// })

					// We will invoke the function for retrieving the user details
					retrieveUserDetails(data.access);



					// alert("Thank you for logging in.")

					Swal.fire({
						title: "Login Successful",
						icon: "success",
						text: "Welcome!"
					});

				} else {
					// alert(`${email} password does not match.`)
					Swal.fire({
						title: "Authentication Failed",
						icon: "error",
						text: "Check your login details and try again."
					});
				}
				setUsername("");
				setPassword("");
			})

		};	

		const retrieveUserDetails = (token) => {

			// The token will be sent as part of the requests header information
			// We put "Bearer" in front of the token to follow the implementation standards for JWTs.
			fetch(`http://localhost:4000/users/details`, {
				headers:{
					Authorization: `Bearer ${token}`
				}
			})
			.then(res => res.json())
			.then(data => {
				console.log(data);

				// Changes the global "user" state to store the "id" and the "isAdmin" property of the user which will be used for validation accross the whole application.
				setUser({
					id:data._id,
					isAdmin: data.isAdmin
				})
			})
		}

		useEffect(() => {

		if(username !== "" && password !== "") {

			setIsActive(true)
		} else {
			setIsActive(false)
		}


	}, [username,password]);

	return(

		

		(user.id !== null) ?
		
			<Navigate to="/" />
			:
			<Container className="font" style={{ maxWidth: "400px" }}>
				<Form onSubmit={e => authenticateUser(e)}>

					<h1 className= "my-5 text-center">Login</h1>

					<Form.Group className="mb-3" controlId="Email">
					  <Form.Label>Username: </Form.Label>
					  <Form.Control 
						  type="username" 
						  placeholder="Enter Username" 
						  required
						  value={username}
						  onChange={e => {setUsername(e.target.value)}}
					  />
					</Form.Group>

					<Form.Group className="mb-3" controlId="Password">
				      <Form.Label>Password: </Form.Label>
				      <Form.Control 
					      type="password" 
					      placeholder="Password" 
					      required
					      value={password}
					      onChange={e => {setPassword(e.target.value)}}
				      />
				    </Form.Group>
				    {
				    	isActive
				    		? <Button variant="success" type="submit" id="submitBtn">Login</Button>
				    		: <Button variant="danger" type="submit" id="submitBtn" disabled>Login</Button>
					}
					<p class='my-3 text-center'>
						"Don't have an account yet?" 
						<a href='/register'>Sign up!</a>
					</p>

				</Form>
				</Container>
	)
}