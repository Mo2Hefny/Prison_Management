import React from 'react'

const ProfileInfo = ({userName, userProfession}) => {
  const profileInfoStyle = {
    display: "flex",
    "flex-direction": "column",
  }

  const profileNameStyle = {
    "margin": 0,
    "font-weight": 900,
    "font-size": "0.8rem",
  }
  
  const profileProfessionStyle = {
    "padding": 0,
    "margin": 0,
    "font-weight": 700,
    "text-align": "left",
    "font-size": "0.6rem",
    opacity: 0.6,
  }

  return (
    <div style={profileInfoStyle}>
      <p style={profileNameStyle}>{userName}</p>
      <p style={profileProfessionStyle}>{userProfession}</p>
    </div>
  )
}

export default ProfileInfo