import React from 'react'
//import { Link } from 'react-router-dom'
import "./SidebarLink.css"

const SidebarLink = ({to, label}) => {
  return (
    <div to={to} className="sidebar-link active">{label}</div>
  )
}

export default SidebarLink