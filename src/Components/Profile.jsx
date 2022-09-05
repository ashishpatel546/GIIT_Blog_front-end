import { getSuggestedQuery } from "@testing-library/react";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import NavBar from "./NavBar";
import usericon from './usericon.png'
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";

const Profile = ({ setAuth, isauth }) => {

    const [user, setUser] = useState({});

    const getUser = async () => {
        const resp = await fetch('http://[::1]:8000/user/fetch/currentuser',{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        });
        const data= await resp.json();
        setUser(data);
   
    }

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
      }

    useEffect(()=>{
        
            getUser()
        
    },[])
    return (
        <>
            <NavBar setAuth={setAuth} isauth={isauth} />
            <div className=" container profile-page">
                <div className="container profile-container">
                    <img className="img-fluid profile-img" src={usericon} />
                    
                            
                            <h2>{user.name}</h2>
                            <div className="user-details">
                            <ul>
                                <li>Email: </li>
                                <li>Mobile:</li>
                                <li>Country:</li>
                                <li>Joined On:</li>
                            </ul>
                            <ul>
                                <li>{user.email}</li>
                                <li>{user.mobile}</li>
                                <li>{user.country}</li>
                                <li>{formatDate(user.created_on)}</li>
                            </ul>
                            </div>
                            
                            <div className="profile-btns">
                                 <EditProfile/>
                                 <ChangePassword/>
                            </div>
                        
                    
                </div>
            </div>

        </>
    )
}

export default Profile;