import React from 'react'
import "./Button.css"

const Button = ({onClick, text, classNames, btnStyle}) => {
  return (
    <div className={classNames} style={btnStyle}>{text}</div>
  )
}

export default Button