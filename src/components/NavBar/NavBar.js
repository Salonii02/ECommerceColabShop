import React from "react";
import ToolBar from "@material-ui/core/Toolbar";
import { AppBar, IconButton, Badge, Typography } from "@material-ui/core";
import useStyles from "./styles";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import './NavBar.css';
function NavBar(){
  const classes = useStyles();
  return (
    <div className="navbar">
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <ToolBar>
          <Typography variant="h6" className={classes.title} color="inherit">
            {/* add logo link */}
            <img
              src="https://images.indianexpress.com/2021/01/myntra.png"
              alt="ColabShop.js"
              height="25px"
              className={classes.image}
            />
            ColabShop
          </Typography>
          <div className={classes.grow} />
          <div className={classes.button}>
              <div classes="icons__right">
                <IconButton>
              <PersonOutlineIcon color="secondary"/>
              </IconButton>
              <IconButton>
              <FavoriteBorderIcon color="secondary"/>
              </IconButton>
              <IconButton>
                <LocalMallIcon color="secondary"/>
                </IconButton>
            </div>
          </div>
        </ToolBar>
      </AppBar>
    </div>
  );
};

export default NavBar;
