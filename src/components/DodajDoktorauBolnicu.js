import React, { useState,useEffect } from "react";
import { post,get} from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
const DodajDoktorauBolnicu=(props)=> {
    const[id_doktora,setIdDoktora]=useState("")
    const [izbor,setIzbor]=useState([])
	console.log(props.id33)
	const initialState = {
		id_bolnice:'',
        id_doktora:''
	
	};


	useEffect(function () {
		async function getCruds() {
			try {
				const response = await get("http://localhost:8080/api/Doktori");
                console.log(response.data.object)
				setIzbor(response.data.object);

             
			} catch (error) {
				console.log("error", error);
			}
		}
        console.log(izbor)
		getCruds();
	}, []);



	const [doktor,setDoktor] = useState(initialState);

	const navigate = useNavigate();

	function handleSubmit(event) {

		event.preventDefault();
		const obj={
			id_bolnice:props.id33,
			id_doktora:id_doktora
		}
		async function postDoktor() {
			try {
               console.log(obj)
				const response = await post("http://localhost:8080/api/dodajDoktora", obj);
				navigate('/');
			} catch (error) {
				console.log("error", error);
			}
		}
		postDoktor();
	}



	return (
		<div className="container" style={{ maxWidth: "400px" }}>
			<h1>Dodaj Doktora</h1>
			
			<hr />
			<form onSubmit={handleSubmit}>
    
            
                            
                           
                        <select name="id_doktora" className="form-control" onChange={e=>setIdDoktora(e.target.value)} value={id_doktora}>
                                {izbor&& izbor.map((crud) => 
                        <option value={crud._id}>{crud.username}</option>
                        )}
                        </select>
                            

                       
			
                
			
				<div className="btn-group">
					<input type="submit" value="Submit" className="btn btn-primary" />
					
				</div>
			</form>
		</div>
	);
}

export default DodajDoktorauBolnicu;