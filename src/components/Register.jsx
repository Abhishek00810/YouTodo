import React, { useState ,useEffect} from 'react';
import Signup from "./Signup"
import axios from 'axios';
function App()
{
    function onregister(username, email, password)
    {
        axios
        .post("http://localhost:8080/loginauth", { username: username, email:email, password: password})
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    return (
        <div>
            <Signup page = {"Register"} content = {"Contact us"} onRegister = {onregister}/>
        </div>
    );
}
export default App
