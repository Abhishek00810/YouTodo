import React, { useState ,useEffect} from 'react';
import Signup from "./Signup"
import axios from 'axios';
import { Route, Routes, useNavigate } from 'react-router-dom';
import e from 'cors';

function App()
{
    const navigate = useNavigate();
    function onlogin(email, password)
    {
        let s = "http://localhost:8080/users"
        axios.get(s, {
            params: {
                email: email,
                password: password
            }
        })
        .then(function (response) {
            const doc = response
            let check = ""
            const found = Object.values(doc.data).filter(obj => {
                check = obj.email === email && obj.password === password ? obj.username : check === ""  ? "" : check
              });

            if(check === "") alert("Please check your email or password to continue")
            else{
                let url = `http://localhost:8080/profiles/${check}`
               // console.log(url)
                axios.get(url, {
                    params: {
                        email: email,
                        password: password
                    }
                })
                .then(function(response){
                    navigate(`/user/${check}`, { replace: true });
                });
            }
        })
    }
    return (
        <div>
            <Signup page = {"Login"} content = {"Dont have an account? Register Yourself"} onLogin = {onlogin}/>
        </div>
    );
}
export default App