import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
function DodajnaRecept(props) {
	const [user,setUser] = useState([]);
    const [duser,dsetUser] = useState([]);
	const [lijekovi,setLijekovi]=useState([]);
    const [dlijekovi,dsetLijekovi]=useState([]);
    const [dijagnoza,setDijagnoza]=useState('')


	
	useEffect(function () {
		async function getCruds() {
			try {
				const response = await axios.get(`http://localhost:8080/api/pacijentitest`);
                const response1 = await axios.get(`http://localhost:8080/api/lijekovi`);
             setUser(response.data.pregled)
             setLijekovi(response1.data.lijekovi)
			} catch (error) {
				console.log("error", error);
			}
		}
		getCruds();
	}, [])
	
async function handleSubmit(){
    const obj={
        id_usera:duser,
        id_Lijeka:dlijekovi,
        dijagnoza:dijagnoza
    }
    try {
        alert(obj.id_usera)
        const response = await axios.post("http://localhost:8080/api/recept", obj);
        
    } catch (error) {
        console.log("error", error);
    }

}



    
	return (
        <form onSubmit={handleSubmit}>
            <label>Lijek za Korisnika</label>
        <select name="id_usera" className="form-control" onChange={e=>dsetUser(e.target.value)} value={duser}>
                    {user.map((crud) => 
                    <option value={crud._id}>{crud.username}</option>
                    )}
                    </select>
                    <label>Izaberi Lijek</label>
                    <select name="id_lijeka" className="form-control" onChange={e=>dsetLijekovi(e.target.value)} value={dlijekovi}>
                    {lijekovi.map((crud) => 
                    <option value={crud._id}>{crud.ime_lijeka}</option>
                    )}
                    </select>
                    <div className="form-group">
					<label>dijagnoza</label>
					<input
						name="dijagnoza"
						type="text"
						required
						value={dijagnoza}
						onChange={(e)=>setDijagnoza(e.target.value)}
						className="form-control"
					/>
					
				</div>
                <div className="btn-group">
					<input type="submit" value="Submit" className="btn btn-primary" />
					
				</div>
                    </form>
	);
}

export default DodajnaRecept;