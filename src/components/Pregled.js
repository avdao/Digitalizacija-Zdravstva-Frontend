import React, { useState,useEffect } from "react";
import { post,get } from "axios";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
function Pregled(props) {

    const [id_doktora,setIdDoktora]=useState([]);
    const [dohvacenId,setDohvacenId]=useState("")
    const [dijagnoza,setDijagnoza]=useState("")
    const [datum,setDatum]=useState("")
	const [user,setUser]=useState("")


	

	
	useEffect(function () {
		async function getCruds() {
			try {
				const response = await get("http://localhost:8080/api/Doktori");
                console.log(response.data.object)
				setIdDoktora(response.data.object);

             
			} catch (error) {
				console.log("error", error);
			}
		}
        
		getCruds();
	}, []);

	const navigate = useNavigate();

	function handleSubmit(event) {
		event.preventDefault();
	


		async function postLijek() {
			try {

				const obj={
					id_usera:props.user,
					id_doktora:dohvacenId,
					dijagnoza:dijagnoza,
					datum:datum
				}
				
				 await post("http://localhost:8080/api/zakaziPregled", obj);
				//navigate('/');
			} catch (error) {
				console.log("error", error);
			}
		}
		postLijek();
	}

	

	function findByUsername(name) {
		navigate("/pregled/"+name);
	}

	return (
		<Card className="container" style={{ maxWidth: "400px" }}>
			   <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Find by username:</Form.Label>
        <Form.Control type="text" value={user}
						onChange={(e)=>setUser(e.target.value)} placeholder="Pronadji Doktora po username-u:" />
		<Button  href={"/pregled/"+user} variant="primary" type="submit">
        Submit
      </Button>
    
      </Form.Group>


			 {id_doktora.map((crud) => 
			<Card style={{'display':'flex','justifyContent':'space-around','border':'1px solid black','margin':'10px','padding':'10px'}}>
				<img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"/>
				<div>
				<a href={`/zakazi/${crud._id}`}>{crud.username}</a>
				<p>{crud.ocjena}</p>
				<a href={`/ocjena/${crud._id}`}>OCJENA RADA</a>
				</div>
			</Card>
			 )}






			
		</Card>
	);
}

export default Pregled;