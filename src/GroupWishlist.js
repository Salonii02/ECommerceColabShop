import React from "react";
import { useStateValue } from "./StateProvider";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Typography,
  Button
} from "@material-ui/core";
import db from './firebase';
import firebase from 'firebase';
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  root: {
    maxWidth: 200,
    height: 450
  },
  media: {
    height: 300
  }
});
//const [{ user }] = useStateValue();
function addPrivateWishlist(uid, product) {
  db.collection("user")
    .doc(uid)
    .update({
      wishlist: firebase.firestore.FieldValue.arrayUnion(product)
    })
    .then(() => console.log("Sucessfully added to private wishlist"))
    .catch(error => console.log(error));
}
const GroupWishlist = ({ item , uid}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={item.img}
          title={item.title}
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle2">
            {/* {message.message[0]} */}
            {item.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="secondary">
          View this item
        </Button>
        <Button size="small" color="secondary" onClick={addPrivateWishlist(uid,item.id)}>
         Add to private wishlist
        </Button>
      </CardActions>
    </Card>
  );
};

export default GroupWishlist;
