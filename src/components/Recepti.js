import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';

function Recepti(props) {
	const [lijek, setLijek] = useState([]);
	const[pregled,setPregled]=useState('');

	useEffect(function () {
		async function getCruds() {
			try {
				const response = await axios.get(`http://localhost:8080/api/recept`);
                console.log("Ovo",response.data)
				setLijek(response.data.lijekovi);
			

				console.log("Lijek",lijek)

             
			} catch (error) {
				console.log("error", error);
			}
		}
		getCruds();
	});

console.log("Lijek",pregled)
	async function Prihvati(a,b,c){
		try {

			const obj={
				id_usera:b,
				id_recepta:a,
                id_lijeka:c,
				status:"Prihvacen",
			
			}
			console.log(obj)
			
			 await axios.post("http://localhost:8080/api/statusRecepta", obj);
			//navigate('/');
		} catch (error) {
			console.log("error", error);
		}

	}
	async function Odbij(a,b,c){
		try {

			const obj={
				id_usera:b,
				id_recepta:a,
                id_lijeka:c,
				status:"Odbijen",
			
			}
			console.log(obj)
			 await axios.post("http://localhost:8080/api/statusRecepta", obj);
	
			//navigate('/');
		} catch (error) {
			console.log("error", error);
		}


	}




    
	return (
		<div className="container">
			<div>
				<h2>
					Recepti
					
				</h2>
				<hr />
			</div>
		
                        <div className="table-responsive">
						<Table striped bordered hover>
				<thead>
					<tr>
						<th>Ime Pacijenta</th>
						<th>Dijagnoza</th>
						<th>id_Lijeka</th>
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
										<Link to={`/user/${crud.id_usera}`} className="link-line">
											{crud.id_usera}
										</Link>
									</td>
									<td>{crud.dijagnoza}</td>
									<Link to={`/lijek/${crud.id_Lijeka}`} className="link-line">
											{crud.id_Lijeka}
										</Link>
									<>
									<td>
										
										
								

									<button onClick={()=>Prihvati(crud._id,crud.id_usera,crud.id_Lijeka)}>Prihvati</button>
									<button onClick={()=>Odbij(crud._id,crud.id_usera,crud.id_Lijeka)}>Odbij</button>

								
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

export default Recepti;