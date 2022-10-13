import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
function ProfileForma(props) {
    const currentUser = AuthService.getCurrentUser();
    const [category,setCategory]=useState('')

console.log(currentUser._id)
	
 function handleSubmit(){
    const obj={
       id_doktora:currentUser.id,
       kategorija:category
    }
    console.log(obj)
    try {
        
     axios.post("http://localhost:8080/api/kategorijaDoktora", obj);
        
    } catch (error) {
        console.log("error", error);
    }

}



    
	return (
        <form onSubmit={handleSubmit}>
        <select name="id_usera" onChange={e=>setCategory(e.target.value)} value={"Izaberi primarnu profesiju"}>
                    
                    <option value={'Dematolog'}>Dermatologija</option>
                    <option value={'Okulist'}>Okulist</option>
                    <option value={'Stomatolog'}>Stomatolog</option>
                    <option value={'Ginekolog'}>Ginekologija</option>
                    
                    </select>
                   
                    
                <div className="btn-group">
					<input type="submit" value="Submit" className="btn btn-primary" />
					
				</div>
                    </form>
	);
}

export default ProfileForma;