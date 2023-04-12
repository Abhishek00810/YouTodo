import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Fab, Zoom } from '@mui/material';
import axios from "axios";
function CreateArea(props)
{
    const [ontrue, settrue] = useState(false)
    const [inputtext, setinput] = useState({
        title:"",
        content:""
    });
    const onSubmit = (e)=>{
        let path = ""
        let s = window.location.pathname
        let flag = 0
        for(let i = 0;i<s.length-1;i++)
        {
            flag+=(s[i]=='/')
            if(flag>=2) path+=s[i+1];
        }
        console.log(path)
         props.onadd(inputtext)
        setinput({
            title: "",
            content: ""
          });
        e.preventDefault();
        axios
        .post(`http://localhost:8080/addnote/${path}`, { title:e.target[0].value, content: e.target[1].value})
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    function func()
    {
        settrue(true)
    }
    function onChange(event)
    {
        
        const {name, value} = event.target
        setinput(prevValue=>{
            if(name==="content")
            {
                return{
                    title:prevValue.title,
                    content:value
                }
            }
            else
            {
                return{
                    title: value,
                    content: prevValue.content
                }
            }
        })
    }
    return (
        <div>
            <form className="create-note" onSubmit={onSubmit}>
                {ontrue ? <input name = "title" area="title" onChange={onChange} placeholder="Title" value = {inputtext.title}></input> : null}
                <textarea name="content" onClick={func} onChange={onChange} placeholder="Take a note..." rows={ontrue ? "3" : "1"} value={inputtext.content}></textarea>
                <Zoom in={ontrue} type="submit">
                <Fab 
                ><AddIcon /></Fab>
                </Zoom>
            </form>
        </div>
    )
}
export default CreateArea;