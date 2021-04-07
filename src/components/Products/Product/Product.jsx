import { React, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography
} from "@material-ui/core";
import { Button } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import useStyles from "./styles";
import { useStateValue } from "../../../StateProvider";
import { Multiselect } from "multiselect-react-dropdown";
import db from "../../../firebase";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ShareIcon from "@material-ui/icons/Share";
import firebase from "firebase";
import TextField from "@material-ui/core/TextField";
function Product({ product }) {
  const classes = useStyles();
  const [{ user }] = useStateValue();
  const [openWishlist, setWishlist] = useState(false);
  const [openShare, setopenShare] = useState(false);
  const [input, setinput] = useState("");
  const [groupList, setGroupList] = useState([]);
  const handleShareOpen = () => setopenShare(true);
  const handleShareClose = () => setopenShare(false);
  const handleOpenWishlist = () => setWishlist(true);
  const handleCloseWishlist = () => setWishlist(false);
  function fetchGroups() {
    // console.log("Aditi");
    const allGroups = [];
    db.collection("group")
      .where("members", "array-contains", user.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const group = doc.data();
          allGroups.push(group);
        });
      });
    return allGroups;
  }
  function shareChat() {
    groupList.forEach(group => {
      db.collection("messages")
        .doc(group.id)
        .collection("message")
        .add({
          name: user.displayName,
          message: [input, product.img, product.title],
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then()
        .catch();
    });
  }
  function addGroupWishlist() {
    groupList.forEach(group => {
      db.collection("group")
        .doc(group.id)
        .update({
          wishlist: firebase.firestore.FieldValue.arrayUnion(product.id)
        })
        .then(() => console.log("Sucessfully added to wishlist"))
        .catch(error => console.log(error));
    });
  }

  function addPrivateWishlist() {
    db.collection("user")
      .doc(user.uid)
      .update({
        wishlist: firebase.firestore.FieldValue.arrayUnion(product.id)
      })
      .then(() => console.log("Sucessfully added to private wishlist"))
      .catch(error => console.log(error));
  }

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.img}
        title={product.title}
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="subtitle2" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="subtitle2">{product.price}</Typography>
        </div>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        {" "}
        <Button aria-label="Share on chat" onClick={handleShareOpen}>
          <ShareIcon color="secondary" fontSize="large" />
        </Button>
        <Button aria-label="Add to Wishlists" onClick={handleOpenWishlist}>
          <FavoriteIcon color="secondary" fontSize="large" />
        </Button>
        <Dialog
          open={openWishlist}
          onClose={handleCloseWishlist}
          fullWidth
          maxWidth="sm"
          fullHeight
          maxHeight="sm"
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add to wishlist</DialogTitle>
          <DialogContent>
            <DialogContentText>Find Groups</DialogContentText>
            <Multiselect
              options={fetchGroups()}
              displayValue="name"
              onSelect={(selectedList, selectedItem) => {
                setGroupList(selectedList);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={addGroupWishlist} color="primary">
              Add to your chat wishlist
            </Button>
          </DialogActions>
          <DialogActions>
            <Button onClick={addPrivateWishlist} color="primary">
              Add to your private wishlist
            </Button>
          </DialogActions>
          <DialogActions>
            <Button onClick={handleCloseWishlist} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openShare}
          onClose={handleShareClose}
          fullWidth
          maxWidth="sm"
          fullHeight
          maxHeight="sm"
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Share</DialogTitle>
          <DialogContent>
            <DialogContentText>Find Groups</DialogContentText>
            <Multiselect
              options={fetchGroups()}
              displayValue="name"
              onSelect={(selectedList, selectedItem) => {
                setGroupList(selectedList);
              }}
            />
          </DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="suggestion"
            label="Add suggestions"
            type="suggestions"
            value={input}
            onChange={event => {
              setinput(event.target.value);
            }}
            fullWidth
          />
          <DialogActions>
            <Button onClick={shareChat} color="primary">
              Share it in your groups
            </Button>
          </DialogActions>
          <DialogActions>
            <Button onClick={handleShareClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
  );
}

export default Product;
