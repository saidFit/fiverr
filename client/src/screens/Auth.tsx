import * as React from "react";
import Register from "../components/Auth/Register";
import Login from "../components/Auth/Login";

interface IRegisterProps {}

const Auth: React.FunctionComponent<IRegisterProps> = (props) => {

  const [toggle,setToggle] = React.useState<string>('register')

  return (
    <React.Fragment>
          {toggle === 'register' ?(
           <Register setToggle={setToggle}/> 
          ):(
            <Login setToggle={setToggle}/>
          )}
         
    </React.Fragment>
  );

};

export default Auth;
