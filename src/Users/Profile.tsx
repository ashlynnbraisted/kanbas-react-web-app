import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Profile() {
  const [profile, setProfile] = useState({ username: "", password: "", 
    firstName: "", lastName: "", dob: "", email: "", role: "USER", _id: "" });
  const navigate = useNavigate();
  const fetchProfile = async () => {
    const account = await client.profile();
    console.log(account);
    setProfile(account);
  };
  const save = async () => {
    await client.updateUser(profile);
  };
  const signout = async () => {
    await client.signout();
    navigate("/Kanbas/Account/Signin");
  };
  useEffect(() => {
    console.log("fetching profile");
    fetchProfile();
    console.log(profile);
  }, []);
  return (
    <div>
      <h1>Profile</h1>   
<Link to="/Kanbas/Account/Admin/Users"
        className="btn btn-warning w-100">
        Users
      </Link>
          {profile && (
        <div>
          <h2>Username</h2>
          <input value={profile.username} onChange={(e) =>
            setProfile({ ...profile, username: e.target.value })}/>
<br/>
          <h2>Password</h2>
          <input value={profile.password} onChange={(e) =>
            setProfile({ ...profile, password: e.target.value })}/>
<br/>
          <h2>First Name</h2>
          <input value={profile.firstName} onChange={(e) =>
            setProfile({ ...profile, firstName: e.target.value })}/>
<br/>
          <h2>Last Name</h2>    
          <input value={profile.lastName} onChange={(e) =>
            setProfile({ ...profile, lastName: e.target.value })}/>
<br/>
          <h2>Date of Birth</h2>
          <input value={profile.dob} type="date" onChange={(e) =>
            setProfile({ ...profile, dob: e.target.value })}/>
<br/>
          <h2>Email</h2>
          <input value={profile.email} onChange={(e) =>
            setProfile({ ...profile, email: e.target.value })}/>
<br/>
          <select onChange={(e) =>
              setProfile({ ...profile, role: e.target.value })}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>
      )}
            <button onClick={save}>
            Save
    </button>
    <button onClick={signout}>
    Signout
  </button>
    </div>
  );
}