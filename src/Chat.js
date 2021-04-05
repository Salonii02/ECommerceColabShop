import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";
function Chat() {
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

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
          }
        );
    }
  }, [roomId]);
  const sendMessage = e => {
    e.preventDefault();
    //console.log(" ", input);

    db.collection("messages")
      .doc(roomId)
      .collection("message")
      .add({
        name: user.displayName,
        message: input,
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
          <p className="chat-room-last-seen">
            {/* Last seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()} */}
          </p>
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
            {message.message}
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
