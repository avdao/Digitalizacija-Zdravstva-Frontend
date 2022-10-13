import React, { useState,useEffect } from "react";
import { post,get } from "axios";
import { useNavigate,useParams } from "react-router-dom";

function ZakaziPregled(props) {
    const [dohvacenId,setDohvacenId]=useState("")
    const [dijagnoza,setDijagnoza]=useState("")
    const [datum,setDatum]=useState("")
    const url=useParams()
    console.log(url)
	

	const navigate = useNavigate();

	function handleSubmit(event) {
		event.preventDefault();
	     async function postLijek() {
			try {
           

				const obj={
					id_usera:props.user,
					id_doktora:url.id,
					dijagnoza:dijagnoza,
					datum:datum
				}
				console.log(obj)
				 await post(`http://localhost:8080/zakazi/${url.id}`, obj);
				//navigate('/');
			} catch (error) {
				console.log("error", error);
			}
		}
		postLijek();
	}

	

	function handleCancel() {
		navigate("/");
	}

	return (
		<div className="container" style={{ maxWidth: "400px" }}>
			 <h1>Rezervisi Pregled</h1>
			<hr />
            <form onSubmit={handleSubmit}>
           
				<div className="form-group">
					<label>Opisite Bol:</label>
					<input
						name="dijagnoza"
						type="text"
						required
						value={dijagnoza}
						onChange={(e)=>setDijagnoza(e.target.value)}
						className="form-control"
					/>
					
				</div>
				<div className="form-group">
					<label>Datum</label>
					<input
						name="datum"
						type="date"
						
						required
						value={datum}
						onChange={(e)=>setDatum(e.target.value)}
						className="form-control"
					/>
				</div>
			
			
				<div className="btn-group">
					<input type="submit" value="Submit" className="btn btn-primary" />
					<button
						type="button"
						onClick={handleCancel}
						className="btn btn-secondary"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}

export default ZakaziPregled;