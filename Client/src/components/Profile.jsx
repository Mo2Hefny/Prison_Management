import React from "react";
import ProfileImage from "./ProfileImage";
import ProfileInfo from "./ProfileInfo";

const Profile = (prop) => {
  const profileStyle = {
    display: "flex",
    gap: "0.5rem",
    padding: "0.8rem",
    "justify-content": "center",
  }
  return (
    <div style={profileStyle}>
      <ProfileImage></ProfileImage>
      <ProfileInfo userName={"Richard Turner"} userProfession={"Warden"}></ProfileInfo>
    </div>
  )
}

export default Profile