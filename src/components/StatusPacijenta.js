import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import { useModal } from "react-modal-hook";
import Table from 'react-bootstrap/Table';
function StatusPacijenta(props) {
	const [lijek, setLijek] = useState([]);
	const[pregled,setPregled]=useState('');
	const[user,setUser]=useState('');
	const [showModal, hideModal] = useModal(() => (
		<ReactModal isOpen>
		  <p>Modal content</p>
		  <button onClick={hideModal}>Hide modal</button>
		</ReactModal>
	  ));
	useEffect(function () {
		async function getCruds() {
			try {
				const response = await axios.get(`http://localhost:8080/api/status/${props.user}`);
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
					Pregledi
					
				</h2>
				<hr />
			</div>
		
                        <div className="table-responsive">
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Id Pregleda</th>
						<th>Status</th>
						
						
						
					

						
					</tr>
				</thead>
				<tbody>
					{lijek&&
						lijek.map((crud) => {
							return (
								<tr key={crud._id}>
									<td>
										<Link to={`/cruds/${crud._id}`} className="link-line">
											{crud.id_pregleda}
										</Link>
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

export default StatusPacijenta;