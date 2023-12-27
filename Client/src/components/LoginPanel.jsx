import React, { useState } from 'react'
import './LoginPanel.css' // Import the CSS file
import axios from 'axios'

const LoginPanel = (onClick) => {
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

	const handleSubmit = (e) => {
		e.preventDefault()

		// Check if there are any validation errors before proceeding
		if (userIdError || passwordError) {
			console.log('Validation failed. Please check your input.')
			return
		}

		// Your authentication logic here
		console.log('User ID:', userId)
		console.log('Password:', password)
		const backendUrl = "http://localhost:3000/admin/prisoner"; // Replace with your actual backend URL

		// Creating a Promise to handle the asynchronous operation
		const axiosPromise = new Promise((resolve, reject) => {
		  axios.post(backendUrl, {
		    id: userId,
		    password: password
		  })
		  .then(response => {
		    // Resolve the Promise if the request is successful
		    resolve(response.data);
		  })
		  .catch(error => {
		    // Reject the Promise if there is an error
		    reject(error);
		  });
		});
		// Using the Promise
		axiosPromise.then(data => {
		  // Handle the data returned from the backend
		  console.log('Backend response:', data);
		})
		.catch(error => {
		  // Handle errors
		  console.error('Error:', error);
		});
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
