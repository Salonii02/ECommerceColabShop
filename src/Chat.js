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
import { Avatar, IconButton } from "@material-ui/core";
import { Button } from "@material-ui/core";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import PollOutlinedIcon from "@material-ui/icons/PollOutlined";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";
import GroupWishlist from "./GroupWishlist";
import { Grid } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
const useStyles = makeStyles({
  root: {
    maxWidth: 200
  },
  media: {
    height: 140
  }
});
function Chat() {
  const classes = useStyles();
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [items, setitems] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();
  // //const [displayWishList, setdisplayWishlist] = useState(false);
  //const [wishlistgroup, setwishlistgroup] = useState([]);
  const [Wishlist, setWishlist] = useState(false);

  ////const handleGroupWishlistOpen = () => setdisplayWishlist(true);
  const handleGroupWishlistClose = () => setWishlist(false);
  useEffect(() => {
    if (roomId) {
      console.log("chat.js");
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
      let wishlist = [];
      db.collection("group")
        .doc(roomId)
        .get()
        .then(doc => {
          wishlist = doc.data().wishlist;
          //console.log("Wishlist", wishlist);
          let tempItems = [];
          wishlist.forEach(itemid => {
            db.collection("Items")
              .doc(itemid)
              .get()
              .then(doc => {
                tempItems.push(doc.data());
                console.log("EachtempItem", doc.data());
              })
              .catch(error => console.log(error));
          });
          console.log("saloni", tempItems);
          setitems(tempItems);
        })
        .catch(error => console.log(error));
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
  }, [roomId]);
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
  // function fetchGroupwishlist() {
  //   let wishlist = [];
  //   db.collection("group")
  //     .doc(roomId)
  //     .get()
  //     .then(doc => {
  //       wishlist = doc.data().wishlist;
  //       console.log("Wishlist", wishlist);
  //       //  setwishlistgroup(wishlist);
  //       //  console.log(wishlistgroup);
  //       let tempItems = [];
  //       wishlist.forEach(itemid => {
  //         db.collection("Items")
  //           .doc(itemid)
  //           .get()
  //           .then(doc => {
  //             tempItems.push(doc.data());
  //             console.log("tempItems", doc.data());
  //           })
  //           .catch(error => console.log(error));
  //       });
  //       console.log("saloni", tempItems);
  //       setitems(tempItems);
  //     })
  //     .catch(error => console.log(error));
  // }
  function handleGroupWishlistOpen() {
    setWishlist(true);
    // fetchGroupwishlist();
  }
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
        </div>
        <div className="chat__headerRight">
          <Button onClick={handleGroupWishlistOpen}>
            <FavoriteBorderOutlinedIcon
              style={{ color: "#ab003c" }}
              fontSize="medium"
            />
          </Button>
          <Dialog
            open={Wishlist}
            onClose={handleGroupWishlistClose}
            fullWidth
            maxWidth="sm"
            fullheight
            maxHeight="sm"
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Your GroupWishlist</DialogTitle>
            <DialogContent>
              <Grid container justify="center" spacing={4}>
                {items.map(item => (
                  <Grid item key={item.id} xs={12} sm={6}>
                    <GroupWishlist item={item} />
                  </Grid>
                ))}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleGroupWishlistClose} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

          <IconButton>
            <PollOutlinedIcon style={{ color: "#ab003c" }} fontSize="medium" />
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
            {message.message[1] !== "" ? (
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
                  <Button size="small" color="secondary">
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
      </div>
    </div>
  );
}

export default Chat;
