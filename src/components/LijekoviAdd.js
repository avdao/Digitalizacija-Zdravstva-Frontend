import React, { useState } from "react";
import { post } from "axios";
import { useNavigate } from "react-router-dom";

function LijekoviAdd(props) {
	const initialState = {
		ime_lijeka: "",
		kategorija: "",
		kolicina: 0,
		cijena: 0,
	
	};
	const [lijek, setLijek] = useState(initialState);

	const navigate = useNavigate();

	function handleSubmit(event) {
		event.preventDefault();
		//if (!crud.companyName || !crud.email) return;
		async function postLijek() {
			try {
				const response = await post("http://localhost:8080/api/lijekovi", lijek);
				navigate('/');
			} catch (error) {
				console.log("error", error);
			}
		}
		postLijek();
	}

	function handleChange(event) {
		setLijek({ ...lijek, [event.target.name]: event.target.value });
	}

	function handleCancel() {
		navigate("/");
	}

	return (
		<div className="container" style={{ maxWidth: "400px" }}>
			<h1>Napravi Lijek</h1>
			<hr />
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Ime Lijeka</label>
					<input
						name="ime_lijeka"
						type="text"
						required
						value={lijek.ime_lijeka}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>kategorija</label>
					<input
						name="kategorija"
						type="text"
						required
						value={lijek.kategorija}
						onChange={handleChange}
						className="form-control"
					/>
					
				</div>
				<div className="form-group">
					<label>Kolicina</label>
					<input
						name="kolicina"
						type="number"
						
						required
						value={lijek.kolicina}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Cijena</label>
					<input
						name="cijena"
						type="number"
						required
						value={lijek.cijena}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				
			
				<div className="btn-group">
					<input type="submit" value="Submit" className="btn btn-primary" />
					<button
						type="button"
						onClick={handleCancel}
						className="btn btn-secondary"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}

export default LijekoviAdd;