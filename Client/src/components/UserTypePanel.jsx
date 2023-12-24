// UserTypePanel.js

import React from 'react'
import './UserTypePanel.css'
const UserTypePanel = ({ onClick }) => {
	const handleUserTypeSelect = (userType) => {
		onClick(userType)
	}

	return (
		<div className="user-type-panel">
			<h2>Welcome To CMP26 Prison! Kindly State Your Role</h2>
			<button onClick={() => handleUserTypeSelect('visitor')}>
				Visitor
			</button>
			<button onClick={() => handleUserTypeSelect('doctor')}>
				Doctor
			</button>
			<button onClick={() => handleUserTypeSelect('staff')}>Staff</button>
			<button onClick={() => handleUserTypeSelect('admin')}>Admin</button>
		</div>
	)
}

export default UserTypePanel
