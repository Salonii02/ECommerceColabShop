import { React, useState, useEffect } from "react";
import ToolBar from "@material-ui/core/Toolbar";
import { AppBar, IconButton, Typography } from "@material-ui/core";
import useStyles from "./styles";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import "./NavBar.css";
import logo from "../../images/ColabShop.png";
import { Grid, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import db from "../../firebase";
import { useStateValue } from "../../StateProvider";
import PrivateWishlist from "../../PrivateWishlist";
function NavBar() {
  const classes = useStyles();
  const [Wishlist, setWishlist] = useState(false);
  const [{ user }] = useStateValue();
  const [items, setitems] = useState([]);
  const handleGroupWishlistClose = () => setWishlist(false);
  function handleGroupWishlistOpen() {
    setWishlist(true);
  }
  useEffect(() => {
    let wishlist = [];
    if (user.uid) {
      db.collection("user")
        .doc(user.uid)
        .onSnapshot(doc => {
          wishlist = doc.data().wishlist;
          //console.log("Wishlist", wishlist);
          let tempItems = [];
          wishlist.forEach(itemid => {
            db.collection("Items")
              .doc(itemid)
              .onSnapshot(doc => {
                tempItems.push(doc.data());
                console.log("EachtempItem", doc.data());
              });
          });
          console.log("saloniprivate", tempItems);
          setitems(tempItems);
        });
    }
  }, [user.uid]);
  return (
    <div className="navbar">
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <ToolBar>
          <Typography variant="h6" className={classes.title} color="inherit">
            {/* add logo link */}
            <img
              src={logo}
              alt="ColabShop.js"
              height="50px"
              className={classes.image}
            />
            ColabShop
          </Typography>
          <div className={classes.grow} />
          <div className={classes.button}>
            <div classes="icons__right">
              <IconButton>
                <PersonOutlineIcon style={{ color: "#f73378" }} />
              </IconButton>
              <IconButton onClick={handleGroupWishlistOpen}>
                <FavoriteBorderIcon style={{ color: "#f73378" }} />
              </IconButton>
              <Dialog
                open={Wishlist}
                onClose={handleGroupWishlistClose}
                fullWidth
                maxWidth="sm"
                fullHeight
                maxHeight="sm"
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Your Private Wishlist
                </DialogTitle>
                <DialogContent>
                  <Grid container justify="center" spacing={4}>
                    {items.map(item => (
                      <Grid item key={item.id} xs={12} sm={6}>
                        <PrivateWishlist item={item} />
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
                <LocalMallIcon style={{ color: "#f73378" }} />
              </IconButton>
            </div>
          </div>
        </ToolBar>
      </AppBar>
    </div>
  );
}

export default NavBar;
