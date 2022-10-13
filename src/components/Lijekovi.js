import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
function LijekoviTable(props) {
	const [lijek, setLijek] = useState([]);

	useEffect(function () {
		async function getCruds() {
			try {
				const response = await axios.get("http://localhost:8080/api/lijekovi");
                console.log(response.data.lijekovi)
				setLijek(response.data.lijekovi);

             
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
					Lijekovi
					<p>
					{props.roleO && (
						<Link to="/dodajLijek" className="btn btn-primary float-right">
							Dodaj Lijek
						</Link>
					)}
					</p>
				</h2>
				<hr />
			</div>
		
                        <div className="table-responsive">
			<Table  striped bordered hover>
				<thead>
					<tr>
						<th>Ime Lijeka</th>
						<th>Kategorija</th>
						<th>Kolicina</th>
						<th>Cijena</th>
						{props.roleO && (
							<>
							<th>View</th>
						    <th>Edit</th>
						    <th>Delete</th>
							</>


                          )}

						
					</tr>
				</thead>
				<tbody>
					{lijek&&
						lijek.map((crud) => {
							return (
								<tr key={crud._id}>
									<td>
										<Link to={`/cruds/${crud._id}`} className="link-line">
											{crud.ime_lijeka}
										</Link>
									</td>
									<td>{crud.kategorija}</td>
									<td>{crud.kolicina}</td>
									<td>{crud.cijena}</td>
									{props.roleO && (
									<>
									<td>
										<Link to={`/cruds/${crud._id}`} className="btn btn-warning">
											View
										</Link>
									</td>
									<td>
										<Link
											to={`/cruds/${crud._id}/edit`}
											className="btn btn-success"
										>
											Edit
										</Link>
									</td>
									<td>
										<Link
											to={`/cruds/${crud._id}/delete`}
											className="btn btn-danger"
										>
											Delete
										</Link>
									</td>

									</>
									)}
								</tr>
							);
						})}
				</tbody>
			</Table>
			</div>
		</div>
	);
}

export default LijekoviTable;