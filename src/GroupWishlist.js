import React from "react";
import { Button } from "@material-ui/core";
import Chat from "./Chat";
const GroupWishlist = ({ selectWishlist }) => {
  return (
    <Button
      onClick={() => {
        <Chat back={true} />;
      }}
    >
      back
    </Button>
  );
};

export default GroupWishlist;
