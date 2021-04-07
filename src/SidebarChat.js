import React, { useState, useEffect } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import db from "./firebase";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
function SidebarChat({ id, name, addNewChat }) {
  const [messages, setMessages] = useState("");
  const [{ user }] = useStateValue();
  useEffect(() => {
    if (id) {
      db.collection("users")
        .doc(user.uid)
        .collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot(snapshot => {
          setMessages(snapshot.docs.map(doc => doc.data()));
        });
    }
  }, [id]);

  return (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
        </div>
      </div>
    </Link>
  );
}

export default SidebarChat;
