import React from 'react'

const ProfileImage = ({imagePath}) => {
  const imageStyle = {
    width: "30px",
    height: "30px",
    "aspect-ratio": "1/1",
    border:"2px solid red",
    borderRadius: "5px",
  }
  return (
    <div style={imageStyle}>
    </div>
  )
}

export default ProfileImage
