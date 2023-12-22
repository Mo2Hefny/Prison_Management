import React, { useState } from 'react'
import './LoginPanel.css' // Import the CSS file

const LoginPanel = () => {
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
