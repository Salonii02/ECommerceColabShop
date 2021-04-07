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
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import PollOutlinedIcon from "@material-ui/icons/PollOutlined";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";
import Product from "./components/Products/Product/Product";
import { Group } from "@material-ui/icons";
import GroupWishlist from "./GroupWishlist";
const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});
function Chat() {
  const classes = useStyles();
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [item, setitem] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [selectWishlist, setWishlist] = useState(false);
  useEffect(() => {
    if (roomId && !selectWishlist) {
      console.log("chat.js");
      console.log(selectWishlist);
      console.log(roomId);
      db.collection("group")
        .doc(roomId)
        .onSnapshot(snapshot => {
          //console.log(snapshot.data());
          setRoomName(
            snapshot.data().type === 1
              ? snapshot.data().name
              : snapshot.data().type === 0 &&
                snapshot.data().createdBy[0] === user.uid
              ? snapshot.data().name
              : snapshot.data().createdBy[1]
          );
        });
      db.collection("messages")
        .doc(roomId)
        .collection("message")
        .orderBy("timestamp", "asc")
        .onSnapshot(snapshot => {
          setMessages(snapshot.docs.map(doc => doc.data()));
          console.log("Messages Here", messages);
        });
      // if(messages){
      // console.log(mess);
      // let i=0;
      // for(i=0;i<mess.length;i++){
      //   if(mess[i][1]!=""){
      //     db.collection("Items").doc(mess[1])
      //     .get()
      //     .then((doc)=> setitem(doc.data()))
      //     .catch((error)=>console.log(error));
      //   }
      // }
      // }
      // console.log(item);
      //if(messages.message[1]){
      // db.collection("Items").doc(messages.message[1])
      //   .get()
      //   .then((doc)=> setitem(doc.data()))
      //   .catch((error)=>console.log(error));
      // console.log(item);
      // }
    }
  }, [roomId, selectWishlist]);
  const sendMessage = e => {
    e.preventDefault();
    db.collection("messages")
      .doc(roomId)
      .collection("message")
      .add({
        name: user.displayName,
        message: [input, ""],
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then()
      .catch();
    setInput("");
  };
  function showGroupWishlist() {
    setWishlist(true);
    console.log("selctWishlist", selectWishlist);
  }
  function fetchGroupwishlist() {
    const wishlist = [];
    db.collection("group")
      .doc(roomId)
      .get()
      .then(doc => {
        wishlist = doc.data().wishlist;
        console.log(wishlist);
      })
      .catch(error => console.log(error));
    return wishlist;
  }
  return (
    <>
      {selectWishlist ? (
        <GroupWishlist
          selectWishlist={selectWishlist}
          wishlistitems={fetchGroupwishlist()}
        />
      ) : (
        //<>
        <div className="chat">
          <div className="chat__header">
            <Avatar />
            <div className="chat__headerInfo">
              <h3>{roomName}</h3>
            </div>
            <div className="chat__headerRight">
              <Button onClick={showGroupWishlist}>
                <FavoriteBorderOutlinedIcon
                  style={{ color: "#ab003c" }}
                  fontSize="large"
                />
              </Button>
              <IconButton>
                <PollOutlinedIcon
                  style={{ color: "#ab003c" }}
                  fontSize="large"
                />
              </IconButton>
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
                {message.message[1] != "" ? (
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={message.message[1]}
                        title={message.message[2]}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {message.message[0]}
                        </Typography>
                        {
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {message.message[2]}
                          </Typography>
                        }
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary">
                        View this item
                      </Button>
                    </CardActions>
                  </Card>
                ) : (
                  <div>{message.message[0]}</div>
                )}
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
      )}
    </>
  );
}

export default Chat;
