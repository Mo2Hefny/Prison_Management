import React from 'react'
import SidebarLink from './SidebarLink'

const SidebarNav = () => {
  const pageNames = ["Dashboard", "Prison Units", "Prisoners", "Programs", "Visitations", "Prison Report", "Staff", "Medical Wing"]

  const sidebarNavStyle = {
    position: "relative",
    width: "100%",
    "margin-top": "4rem",
    display: "grid",
    gap: "1.2rem",
  }

  return (
    <div style={sidebarNavStyle}>
       {pageNames.map((pageName, index) => (
        <SidebarLink 
        key={"link-" + index} 
        to={`/${pageName.toLowerCase().replace(/\s+/g, '-')}`} 
        label={pageName} />
      ))}
    </div>
  )
}

export default SidebarNav
