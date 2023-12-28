import React from 'react'
import { Link } from 'react-router-dom'
import "./SidebarLink.css"

const SidebarLink = ({to, label, isActive}) => {
  return (
    <Link to={to} className={`sidebar-link ${isActive ? 'active' : ''}`}>{label}</Link>
  )
}

export default SidebarLink