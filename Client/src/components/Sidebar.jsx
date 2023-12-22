import React from "react"
import "./Sidebar.css"
import Profile from "./Profile"
import SidebarNav from "./SidebarNav"
import Button from "./Button"

const Sidebar = (prop) => {
    const LogOutStyle = {
      position: "absolute",
      left: "50%",
      bottom: "6%",
      translate: "-60% 0",
      width: "9rem",
    }

    return (
      <div className="Sidebar">
        <Profile></Profile>
        <SidebarNav></SidebarNav>
        <Button text="Log Out" classNames="btn btn-1" btnStyle={LogOutStyle}></Button>
      </div>
    )
}

export default Sidebar