import React, { useEffect } from 'react'
import { useState } from "react"
import { useLocation } from 'react-router-dom';
import SidebarLink from './SidebarLink'

const SidebarNav = () => {

  const location = useLocation();
  const [activePage, setActivePage] = useState('');
  const pageNames = ["Dashboard", "Prison Units", "Prisoners", "Programs", "Visitations", "Prison Report", "Staff", "Medical Records"]

  const sidebarNavStyle = {
    position: "relative",
    width: "100%",
    "margin-top": "13%",
    display: "grid",
    gap: "0.4rem",
  }

  // Update the active page when the location is updated.
  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  return (
    <div style={sidebarNavStyle}>
       {pageNames.map((pageName, index) => (
        <SidebarLink 
        key={"link-" + index} 
        to={`/${pageName.toLowerCase().replace(/\s+/g, '-')}`} 
        label={pageName} 
        isActive={activePage === `/${pageName.toLowerCase().replace(/\s+/g, '-')}`}
        />
      ))}
    </div>
  )
}

export default SidebarNav
