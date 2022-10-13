
import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import LijekoviTable from "./Lijekovi";
const BoardKanton = (props) => {
  const [content, setContent] = useState("");
  const [i,setI]=useState(0)

  useEffect(() => {
    UserService.getKantonBoard().then(
      (response) => {
        console.log(response.data)
        setContent(response.data.poruka);
        setI(response.data.k)
        console.log(content)
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
    )

    
  }, []);
  console.log(props.role)
  return (
      
    <div className="container">

      <header className="jumbotron">
        <h2>Hello</h2>
        <h3>{content}</h3>
        <h3>{i}</h3>

        <LijekoviTable/>

      </header>
    </div>
  );
};
export default BoardKanton;