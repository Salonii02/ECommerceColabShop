import React,{useState,useEffect} from 'react';
import './SidebarChat.css';
import { Avatar } from '@material-ui/core';
import db from "./firebase"
import {Link} from 'react-router-dom';
import  { useParams } from "react-router-dom";


function SidebarChat({userid,roomid, name, addNewChat}) {
    const [seed,setSeed] = useState('');
    const [messages, setMessages] = useState("");
    //const {userid}=useParams();
 //console.log(userid);
    useEffect(() =>{
        if(roomid){
            db.collection('users').doc(userid).collection('rooms').doc(roomid).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map((doc) => doc.data()))
            ))
          }
    },[roomid])
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    },[])

    const createChat = () => {
        const roomName = prompt("Please enter name for chat room");

        if(roomName){
           // console.log(userid);
            db.collection('users').doc(userid).collection("rooms").add({
                name: roomName,
                members: []
            });
        }
    };

    return !addNewChat ?(
        <Link to = {`users/${userid}/rooms/${roomid}`}>
        <div className="sidebarChat">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className="sidebarChat__info">
            <h2>{name}</h2> 
             <p>{messages[0]?.message}</p>
          </div>
        </div>
        </Link>
    ):(
        <div onClick={createChat} className="sidebarChat">
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat;
