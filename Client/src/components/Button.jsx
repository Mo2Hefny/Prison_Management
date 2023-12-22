import React from 'react'
import "./Button.css"

const Button = ({ type, onClick, text, classNames, btnStyle }) => {

  return (
    <button type={type} onClick={onClick} className={classNames} style={btnStyle}>{text}</button>
  )
}

Button.defaultProps = {
  type: 'button',
  classNames: 'btn',
  btnStyle: {}
}

export default Button