import React, { useState,useEffect} from "react";
import { post,get } from "axios";
import { useNavigate,useParams  } from "react-router-dom";
import Card from 'react-bootstrap/Card';

function PregledId(props) {

    const [id_doktora,setIdDoktora]=useState({});
    const [dohvacenId,setDohvacenId]=useState("")
    const [dijagnoza,setDijagnoza]=useState("")
    const [datum,setDatum]=useState("")
    const url=useParams()

	

	
	useEffect(function () {
		async function getCruds() {
			try {
                //`http://localhost:8080/song/${props.match.params.id}`
				const response = await get(`http://localhost:8080/api/pregled-Info/${url.id}`);
                console.log(response.data.pregled)
				setIdDoktora(response.data.pregled);

             
			} catch (error) {
				console.log("error", error);
			}
		}
        
		getCruds();
	}, []);

	

	

	return (
		<Card>

<img src="/pregled.png" style={{'width':'400px'}}/>
			<p>
              Dijagnoza:  {id_doktora.dijagnoza}

            </p>
            
			<p>
               Datum: {id_doktora.datum}

            </p>
			 </Card>



);
}

export default PregledId;
