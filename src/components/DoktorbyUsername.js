import React, { useState,useEffect } from "react";
import { post,get } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
function DoktorByUsername(props) {

    const [id_doktora,setIdDoktora]=useState([]);
    const [dohvacenId,setDohvacenId]=useState("")
    const [dijagnoza,setDijagnoza]=useState("")
    const [datum,setDatum]=useState("")

    const [user,setUser]=useState({})
    const username=useParams()

	console.log(username)

	
	useEffect(function () {
		async function getCruds() {
			try {
				const response = await get(`http://localhost:8080/api/user2/${username.id}`);
                console.log(response.data.user)
				setUser(response.data.user[0]);

             
			} catch (error) {
				console.log("error", error);
			}
		}
        
		getCruds();
	}, []);

	return (
		<Card className="container" style={{ maxWidth: "400px" }}>
			   <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Find by username:</Form.Label>
        <Form.Control type="text" placeholder="Pronadji Doktora po username-u:" />
		<Button variant="primary" type="submit">
        Submit
      </Button>
    
      </Form.Group>


			
			<Card style={{'display':'flex','justifyContent':'space-around','border':'1px solid black','margin':'10px','padding':'10px'}}>
				<img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"/>
				<div>
				<a href={`/zakazi/${user._id}`}>{user.username}</a>
				<hr></hr>
				<a href={`/ocjena/${user._id}`}>OCJENA RADA</a>
				</div>
			</Card>
			






			
		</Card>
	);
}

export default DoktorByUsername;