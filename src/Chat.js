import React, { useState, useEffect } from "react";
import "./Chat.css";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Typography
} from "@material-ui/core";
import { Avatar, IconButton, Input } from "@material-ui/core";
import { Button } from "@material-ui/core";

import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from "./StateProvider";
import firebase from "firebase";
import Product from "./components/Products/Product/Product";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});
function Chat() {
  const classes = useStyles();
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [item, setitem] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [mess, setmess] = useState([]);
  // function urlify(text) {
  //   var urlRegex = /(https?:\/\/[^\s]+)/g;
  //   return text.replace(urlRegex, function(url) {
  //     return '<a href="' + url + '">' + url + '</a>';
  //   })
  // }
  function getItem(){
    console.log(messages);
    db.collection("Items").doc(messages.message[1])
          .get()
          .then((doc)=> setitem(doc.data()))
          .catch((error)=>console.log(error));

    console.log(item);
    return true;
  }
  useEffect(() => {
    if (roomId) {
      
      db.collection("group")
        .doc(roomId)
        .onSnapshot(snapshot => {
          //console.log(snapshot.data());
          setRoomName(
             (
                snapshot.data().type === 1 ? snapshot.data().name : (
                snapshot.data().type === 0 && snapshot.data().createdBy[0] === user.uid
           // " "  
            ?snapshot.data().name
            : snapshot.data().createdBy[1])
             )
          );
        })
        db.collection("messages")
        .doc(roomId)
        .collection("message")
        .orderBy("timestamp", "asc")
        .onSnapshot(snapshot => {
          setMessages(snapshot.docs.map(doc => doc.data()))
          setmess(snapshot.docs.map(doc => doc.data().message))
          //console.log(messages);
          }
        );
        if(messages){
        console.log(mess);
        let i=0;
        for(i=0;i<mess.length;i++){
          if(mess[i][1]!=""){
            db.collection("Items").doc(mess[1])
            .get()
            .then((doc)=> setitem(doc.data()))
            .catch((error)=>console.log(error));
          }
        }
        }
        // console.log(item);
      //if(messages.message[1]){
        // db.collection("Items").doc(messages.message[1])
        //   .get()
        //   .then((doc)=> setitem(doc.data()))
        //   .catch((error)=>console.log(error));
    // console.log(item);
     // }
    }
  }, [roomId]);
  const sendMessage = e => {
    e.preventDefault();
    //console.log(" ", input);
  //   getLinkPreview('https://www.youtube.com/watch?v=MejbOFk7H6c')
  //  .then((data) => console.debug(data));
    db.collection("messages")
      .doc(roomId)
      .collection("message")
      .add({
        name: user.displayName,
        message: [input,""],
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
       .then()
      .catch();
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          
        </div>
        <div className="chat__headerRight">
          {/* <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton> */}
        </div>
      </div>
      <div className="chat__body">
        {messages.map(message => (
          <p
            className={`chat__message ${
              user.displayName === message.name && "chat__receiver"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            { ((message.message[1])!="" ) ? (
               <Card className={classes.root}>
               <CardActionArea>
                 <CardMedia
                   className={classes.media}
                   image={item.img}
                   title={item.title}
                 />
                 <CardContent>
                   <Typography gutterBottom variant="h5" component="h2">
                    {item.title}
                   </Typography>
                   {/* <Typography variant="body2" color="textSecondary" component="p">
                     Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                     across all continents except Antarctica
                   </Typography> */}
                 </CardContent>
               </CardActionArea>
               <CardActions>
                 <Button size="small" color="primary">
                   Share
                 </Button>
                 <Button size="small" color="primary">
                   Learn More
                 </Button>
               </CardActions>
             </Card>
            ) : (
              <div>
              {(message.message[0])}
              </div>
           
            )
}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
            {/* <h1>{user.name}</h1> */}
          </p>
        ))}{" "}
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={e => {
              setInput(e.target.value);
            }}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage}>Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
