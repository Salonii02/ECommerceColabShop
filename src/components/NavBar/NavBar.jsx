import React from "react";
import ToolBar from "@material-ui/core/Toolbar";
import { AppBar, IconButton, Badge, Typography } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import useStyles from "./styles";

const NavBar = () => {
  const classes = useStyles();
  return (
    <div>
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
            <IconButton aria-label="Show cart items" color="inherit">
              <Badge badgeContent={2} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        </ToolBar>
      </AppBar>
    </div>
  );
};

export default NavBar;
