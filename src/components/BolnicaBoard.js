import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import DodajDoktorauBolnicu from "./DodajDoktorauBolnicu";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactModal from "react-modal";
import { useModal } from "react-modal-hook";
import LijekoviTable from "./Lijekovi";
const BoardBolnica = (props) => {
  const [content, setContent] = useState("");

  const [showModal, hideModal] = useModal(() => (
		<ReactModal isOpen>
		        <DodajDoktorauBolnicu id33={props.id33}/>
		  <button onClick={hideModal}>Hide modal</button>
		</ReactModal>
	  ));
  
  useEffect(() => {
    UserService.getBolnicaBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
        <button onClick={showModal}>Pritisni dugme,Pritisni dugme</button>
      </header>

      <LijekoviTable/>
    </div>
  );
};
export default BoardBolnica;