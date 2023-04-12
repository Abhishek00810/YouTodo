import React, { useState ,useEffect} from 'react';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import CreateArea from './CreateArea';
import notes from '././Note'
import { Route } from 'react-router-dom';
import axios from 'axios';

function App()
{
  let path = ""
  let s = window.location.pathname
  let flag = 0
  for(let i = 0;i<s.length-1;i++)
  {
      flag+=(s[i]=='/')
      if(flag>=2) path+=s[i+1];
  }
  const [message, setMessage] = useState("");
  const [items, setItems] = useState([]);
useEffect(() => {
  axios.get(`http://localhost:8080/users/${path}`).then(resp => {setItems(resp.data);});
}, []);

 
    function add_item(inputtext)
    {
        setItems(prevItems=>{
            return [...prevItems, inputtext]
        })
    }
    function delete_item(id) {
        setItems(prevItems => {
          return prevItems.filter((item, index) => {
            return index !== id;
          });
        });
      }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    return(
        <div>
            <Header > </Header>
            <CreateArea onadd = {add_item}/>
            {items.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            to_delete={delete_item}
            uid = {noteItem._id}
          />
        );
      })} 
        </div>
    );
}
export default App