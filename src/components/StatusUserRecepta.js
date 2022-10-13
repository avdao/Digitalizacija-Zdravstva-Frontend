import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import { useModal } from "react-modal-hook";
import Table from 'react-bootstrap/Table';

function StatusUserRecepta(props) {

	const [lijek, setLijek] = useState([]);
	

	useEffect(function () {
		
		async function getCruds() {
			try {
				
				const response = await axios.get(`http://localhost:8080/api/statusRecepta/${props.user}`);
                console.log("Ovo",response.data.pregled)
				setLijek(response.data.pregled);

			

				console.log("Lijek",lijek)

             
			} catch (error) {
				console.log("error", error);
			}
		}
		getCruds();
	},[]);

	



    
	return (
		<div class="table">
			<div>
				<h2>
					Status Recepta
					
				</h2>
				<hr />
			</div>
		
                        <div className="table-responsive">
			<Table striped bordered hover size="sm">
				<thead>
					<tr>
						<th>Id Recepta</th>
						<th>Korisnik</th>
					
						<th>Lijek</th>
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
									<td>
										<Link to={`/user/${crud.id_usera}`} className="link-line">
											{crud.id_usera}
										</Link>
									</td>
									<td><Link to={`/lijek/${crud.id_lijeka}`} className="link-line">
											{crud.id_lijeka}
										</Link></td>
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

export default StatusUserRecepta;