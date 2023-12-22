import React from 'react'

const Input = ({ type, value, field, label, onChange, isDisabled, width }) => {
  if (label === undefined) label = field;
  return (
    <div className='input-container'>
      <input type={type} value={value} onChange={(e) => onChange(e, field)} placeholder=' ' disabled={isDisabled===true} style={{width: width}}/>
      <span>{label}</span>
      <div class="error"></div>
    </div>
  )
}

Input.defaultProps = {
  type: 'text',
  isDisabled: false,
  width: '100%'
}

export default Input