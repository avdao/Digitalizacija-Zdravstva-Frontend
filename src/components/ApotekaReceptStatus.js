import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/esm/Table";
function ApotekaReceptStatus(props) {
	const [lijek, setLijek] = useState([]);
	const[pregled,setPregled]=useState('');
	const[user,setUser]=useState('');
	useEffect(function () {
		async function getCruds() {
			try {
				const response = await axios.get(`http://localhost:8080/api/statusRecepta`);
                console.log("Ovo",response.data)
				setLijek(response.data.pregled);
			

				console.log("Lijek",lijek)

             
			} catch (error) {
				console.log("error", error);
			}
		}
		getCruds();
	}, []);





    
	return (
		<div className="container">
			<div>
				<h2>
					Status Recepta
					
				</h2>
				<hr />
			</div>
		
                        <div className="table-responsive">
			<Table striped bordered hover >
				<thead>
					<tr>
						<th>Id Recepta</th>
						<th>Status</th>
						
						
					

						
					</tr>
				</thead>
				<tbody>
					{lijek&&
						lijek.map((crud) => {
							return (
								<tr key={crud._id}>
									<td>
										
											{crud.id_recepta}
										
									</td>

									<td>{crud.status}</td>
								
									
							
								</tr>
							);
						})}
				</tbody>
			</Table>
			</div>
		</div>
	);
}

export default ApotekaReceptStatus;