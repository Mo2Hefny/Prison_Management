import React, { useState } from 'react'
import './LoginPanel.css' // Import the CSS file
import axios from 'axios'

const LoginPanel = ({onClick}) => {
	const [userId, setUserId] = useState('')
	const [password, setPassword] = useState('')
	const [userIdError, setUserIdError] = useState('')
	const [passwordError, setPasswordError] = useState('')

	const handleUserIdChange = (e) => {
		const value = e.target.value
		setUserId(value)
		// Validate User ID (positive integer and non-empty)
		if (!value.trim()) {
			setUserIdError('User ID cannot be empty')
		} else if (!/^\d+$/.test(value)) {
			setUserIdError('User ID must be a positive integer')
		} else {
			setUserIdError('')
		}
	}

	const handlePasswordChange = (e) => {
		const value = e.target.value
		setPassword(value)
		// Validate Password (non-empty)
		if (!value.trim()) {
			setPasswordError('Password cannot be empty')
		} else {
			setPasswordError('')
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		// Check if there are any validation errors before proceeding
		if (userIdError || passwordError) {
			console.log('Validation failed. Please check your input.')
			return
		}

		// Your authentication logic here
		console.log('User ID:', userId)
		console.log('Password:', password)
		const id = parseInt(userId)
		console.log('User ID:', id)

		// Creating a Promise to handle the asynchronous operation
		await login(e, id, password)

	}

	const login = async (event, id, password) => {
		event.preventDefault();
		const info = {id: id, password: password};
    console.log(info);
    await axios
      .post("http://localhost:3000/admin", info)
      .then(handleLoginUser)
      .catch((err) => console.log(err));
    //await axios.get("http://localhost:8082/trainee/login").then(console.log("salam")).catch(err => console.log(err));
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/admin",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },

    });
    console.log(response.data);

		const type = response.data.admin.staff_type;

		switch (type) {
			case 0: return onClick('admin')
			case 1: return onClick('manager')
			case 2: return onClick('gaurd')
			case 3: return onClick('staff')
			case 4: return onClick('doctor')
			default: return onClick('visitor')
		}
	}

	const handleLoginUser = (res) => {
		const data = res.data.token;
    console.log(data);
    localStorage.setItem("token", data);
	}

	return (
		<div className="container">
			<h2 className="title">Login Panel</h2>
			<form onSubmit={handleSubmit} className="form">
				<label className="input">
					User ID:
					<input
						type="text"
						value={userId}
						onChange={handleUserIdChange}
						required
					/>
					{userIdError && (
						<span className="error">{userIdError}</span>
					)}
				</label>
				<label className="input">
					Password:
					<input
						type="password"
						value={password}
						onChange={handlePasswordChange}
						required
					/>
					{passwordError && (
						<span className="error">{passwordError}</span>
					)}
				</label>
				<button type="submit" className="button">
					Login
				</button>
			</form>
		</div>
	)
}

export default LoginPanel
