// VisitorPanel.js

import React, { useState } from 'react'
import './VisitorPanel.css'
const VisitorPanel = ({ onSubmit }) => {
	const [fname, setFname] = useState('')
	const [lname, setLname] = useState('')
	const [birthdate, setBirthdate] = useState('')
	const [address, setAddress] = useState('')
	const [ssn, setSsn] = useState('')

	const [fnameError, setFnameError] = useState('')
	const [lnameError, setLnameError] = useState('')
	const [ssnError, setSsnError] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()

		// Validate First Name (should not contain numbers)
		if (!/^[a-zA-Z]+$/.test(fname)) {
			setFnameError('First Name should not contain numbers')
			return
		}

		// Validate Last Name (should not contain numbers)
		if (!/^[a-zA-Z]+$/.test(lname)) {
			setLnameError('Last Name should not contain numbers')
			return
		}

		// Validate SSN (should be a positive number)
		if (!/^\d+$/.test(ssn)) {
			setSsnError('SSN must be a positive number')
			return
		}

		// Call the parent component's onSubmit function with the visitor data
		onSubmit({ fname, lname, birthdate, address, ssn })
	}

	return (
		<div className="container">
			<h2 className="title">Visitor Panel</h2>
			<form onSubmit={handleSubmit} className="form">
				<label className="input">
					First Name:
					<input
						type="text"
						value={fname}
						onChange={(e) => {
							setFname(e.target.value)
							setFnameError('')
						}}
						required
					/>
					{fnameError && <span className="error">{fnameError}</span>}
				</label>
				<label className="input">
					Last Name:
					<input
						type="text"
						value={lname}
						onChange={(e) => {
							setLname(e.target.value)
							setLnameError('')
						}}
						required
					/>
					{lnameError && <span className="error">{lnameError}</span>}
				</label>
				<label className="input">
					Birth Date:
					<input
						type="text"
						value={birthdate}
						onChange={(e) => setBirthdate(e.target.value)}
					/>
				</label>
				<label className="input">
					Address:
					<input
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						required
					/>
				</label>
				<label className="input">
					SSN:
					<input
						type="text"
						value={ssn}
						onChange={(e) => {
							setSsn(e.target.value)
							setSsnError('')
						}}
						required
					/>
					{ssnError && <span className="error">{ssnError}</span>}
				</label>
				<button type="submit" className="button">
					Submit
				</button>
			</form>
		</div>
	)
}

export default VisitorPanel
