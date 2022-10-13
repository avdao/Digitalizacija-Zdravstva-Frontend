import React, { useState ,useEffect} from "react";
import { post,get } from "axios";
import { useNavigate,useParams,Link } from "react-router-dom";
import '../App.css'
import AuthService from "../services/auth.service";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function OcjenaDoktora(props) {
    const currentUser = AuthService.getCurrentUser();

    const [misljenje,setMisljenje]=useState("")
    const [ocjena,setOcjena]=useState(1)
	const [docjene,setDocjene]=useState([])
    const url=useParams()
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
    console.log(url)
	

	const navigate = useNavigate();

	useEffect(function () {
		async function getCruds() {
			try {
				const response = await get(`http://localhost:8080/api/getOcjena/${url.id}`);
                console.log("Ovo",response.data)
				setDocjene(response.data.object1);
			

				console.log("Lijek",docjene)

             
			} catch (error) {
				console.log("error", error);
			}
		}
		getCruds();
	}, []);

	function handleSubmit(event) {
		event.preventDefault();
	     async function postLijek() {
			try {
           

				const obj={
					id_usera:currentUser.id,
					id_doktora:url.id,
					ocjena:ocjena,
					misljenje:misljenje
				}
				console.log(obj)
				 await post(`http://localhost:8080/api/ocjenaDoktora`, obj);
				//navigate('/');
			} catch (error) {
				console.log("error", error);
			}
		}
		postLijek();
	}

	

	function handleCancel() {
		navigate("/");
	}

	return (
		<div>
			 <Button variant="primary" onClick={handleShow}>
        Daj Ocjenu za Doktora
      </Button>


	  <Modal show={show} onHide={handleClose} style={{'width':'900px','margin':'300px'}}>
	  <h1>Ocjeni Doktora:</h1>
			<hr />
            <form onSubmit={handleSubmit}>
           
				<div className="form-group">
					<label>Daj te svoje misljenje o radu doktora:</label>
					<input
						name="misljenje"
						type="text"
						required
						value={misljenje}
						onChange={(e)=>setMisljenje(e.target.value)}
						className="form-control"
					/>
					
				</div>
                <select name="ocjena" onChange={e=>setOcjena(e.target.value)} value={ocjena}>
                    
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    
                    </select>
                   
			
			
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
		
      
      </Modal>
			
			{docjene.map((crud) => 
		
		<Card style={{ width: '900px' }}>
			<div >
				<img src="/user.png" style={{'width':'200px','height':'200px'}}/>
			</div>
			<div>
			<h1><Link to={`/user/${crud.id_usera}`} className="link-line">
											{crud.id_usera}
										</Link></h1>
			<h1>Ocjena:{crud.ocjena}</h1>
			<h1>Misljenje:{crud.misljenje}</h1>
			</div>
	
			</Card>
					
			)}
		
		</div>
	);
}

export default OcjenaDoktora;

