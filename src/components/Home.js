import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import "../App.css";

const Home = () => {
  const currentUser = AuthService.getCurrentUser();
  const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);
  return (
    <div className="home-content">
      <div>
        <img src="/slika1.jpg" style={{'width':'600px','height':'600px'}}/>
      </div>
      <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
           Mauris placerat egestas lorem, quis dictum odio fringilla varius. Vestibulum odio neque, aliquam eget nulla ac, blandit eleifend est. Maecenas ligula tellus, ornare ac euismod at, porta id risus. Fusce mauris ligula, varius eget orci at, ornare elementum ante. Donec pulvinar arcu vel nulla eleifend cursus. Duis ac iaculis nisi, nec hendrerit lorem. Quisque gravida sit amet ex et posuere. Nam aliquet, neque et fringilla semper, quam libero congue mi, eget sagittis nulla massa sit amet nisi. Proin lacinia cursus ullamcorper. Suspendisse tortor nunc, interdum eu lorem ut, porta tempor ex. Maecenas rhoncus, turpis vitae rhoncus ultrices, 
          massa libero maximus nisl, viverra iaculis magna urna sit amet mi. Nullam rutrum tellus non imperdiet pharetra.</p>
       

      </div>
     

    </div>
  );
};
export default Home;