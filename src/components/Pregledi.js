import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';

function Pregledi(props) {
	const [lijek, setLijek] = useState([]);
	const[pregled,setPregled]=useState('');
	const[user,setUser]=useState('');
	useEffect(function () {
		async function getCruds() {
			try {
				const response = await axios.get(`http://localhost:8080/api/pregledi/${props.user}`);
                console.log("Ovo",response.data)
				setLijek(response.data.object1);
			

				console.log("Lijek",lijek)

             
			} catch (error) {
				console.log("error", error);
			}
		}
		getCruds();
	});
console.log("http://localhost:8080/api/statusPregleda")
console.log("Lijek",pregled)
	async function Prihvati(a,b,c,d){
		try {

			const obj={
				id_usera:a,
				id_pregleda:b,
				dijagnoza:c,
				datum:d,
				status:"Prihvacen",
			
			}
			console.log(obj)
			
			 await axios.post("http://localhost:8080/api/statusPregleda", obj);
			//navigate('/');
		} catch (error) {
			console.log("error", error);
		}

	}
	async function Odbij(a,b,c,d){
		try {

			const obj={
				id_usera:a,
				id_pregleda:b,
				dijagnoza:c,
				datum:d,
				status:"Odbijen",
			
			}
			console.log(obj)
			 await axios.post("http://localhost:8080/api/statusPregleda", obj);
	
			//navigate('/');
		} catch (error) {
			console.log("error", error);
		}


	}




    
	return (
		<div className="container">
			<div>
				<h2>
					Pregledi
					
				</h2>
				<hr />
			</div>
		
                        <div className="table-responsive">
			<Table striped bordered hover >
				<thead>
					<tr>
						<th>Ime Pacijenta</th>
						<th>Dijagnoza</th>
						<th>Datum</th>
						<>
						<th>Status</th>

						</>
					

						
					</tr>
				</thead>
				<tbody>
					{lijek&&
						lijek.map((crud) => {
							return (
								<tr key={crud._id}>
									<td>
										<Link to={`/cruds/${crud._id}`} className="link-line">
											{crud.username}
										</Link>
									</td>
									
									<td>{crud.dijagnoza}</td>
									<td>{crud.datum}</td>
									<>
									<td>
										
										
								

									<button onClick={()=>Prihvati(crud.id_useraa,crud.id_pregleda,crud.dijagnoza,crud.datum)}>Prihvati</button>
									<button onClick={()=>Odbij(crud.id_useraa,crud.id_pregleda,crud.dijagnoza,crud.datum)}>Odbij</button>

								
									</td>
								
									</>
								
							
								</tr>
							);
						})}
				</tbody>
			</Table>
			</div>
		</div>
	);
}

export default Pregledi;