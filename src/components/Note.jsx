import React from "react";
import { Delete, AddIcon } from "@mui/icons-material";
import axios from "axios";

function Note(props) {
  let path = ""
  let s = window.location.pathname
  let flag = 0
  for(let i = 0;i<s.length-1;i++)
  {
      flag+=(s[i]=='/')
      if(flag>=2) path+=s[i+1];
  }
    function del()
    {
      axios
      .post(`http://localhost:8080/delete/${path}`, { uid: props.uid})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
        props.to_delete(props.id)
    }
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={del}>{< Delete />}</button>
    </div>
  );
}

export default Note;
