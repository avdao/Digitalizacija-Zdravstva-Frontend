import React,{useEffect} from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const navigate=useNavigate()
  useEffect(() => {

    async function getCruds() {
			try {
				const response = await axios.get(`http://localhost:8080/api/getKategorija/${currentUser.id}`);
        
             if(currentUser.roles== 
              "ROLE_DOKTOR" && response.data.lijekovi.length===0){
                navigate('forma')
             }

             
			} catch (error) {
				console.log("error", error);
			}
		}
		getCruds();
  })




  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
};
export default Profile;