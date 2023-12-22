import React from 'react'

const Input = ({ type, value, field, label, onChange, isDisabled }) => {
  if (label === undefined) label = field;
  return (
    <div className='input-container'>
      <input type={type} value={value} onChange={(e) => onChange(e, field)} placeholder=' ' disabled={isDisabled===true} />
      <span>{label}</span>
      <div class="error"></div>
    </div>
  )
}

Input.defaultProps = {
  type: 'text',
  isDisabled: false,
}

export default Input