import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css'
import { Link, useParams } from "react-router-dom";
import ReactModal from "react-modal";
import { useModal } from "react-modal-hook";
import Card from 'react-bootstrap/Card';

function Lijek(props) {
	const [lijek, setLijek] = useState([]);
	const url=useParams()
	const [showModal, hideModal] = useModal(() => (
		<ReactModal isOpen>
		  <p>Modal content</p>
		  <button onClick={hideModal}>Hide modal</button>
		</ReactModal>
	  ));
	useEffect(function () {
		async function getCruds() {
			try {
				const response = await axios.get(`http://localhost:8080/api/lijekovi/${url.id}`);
                console.log("Ovo",response.data.lijekovi)
				setLijek(response.data.lijekovi);
			

				

             
			} catch (error) {
				console.log("error", error);
			}
		}
		getCruds();
	}, []);





    
	return (
		
		<Card  className="text-center">
            <div>
            <img src="/cure.png" style={{'width':'300px','height':'300px'}}/>
            </div>
            <div className="padding-content">
		<h1>Ime Lijeka:{lijek.ime_lijeka}</h1>
        <h1>Kategorija:{lijek.kategorija}</h1>
        <h1>Cijena:{lijek.cijena}</h1>
        </div>
		</Card>
		
	);
}

export default Lijek;