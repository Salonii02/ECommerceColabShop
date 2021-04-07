import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Typography,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  root: {
    maxWidth: 200,
    height: 300
  },
  media: {
    height: 100
  }
});
const GroupWishlist = ({ item }) => {
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
          <Typography gutterBottom variant="h8">
            {/* {message.message[0]} */}
            {item.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="secondary">
          View this item
        </Button>
      </CardActions>
    </Card>
  );
};

export default GroupWishlist;
