import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import db from "./firebase";
import history from "./history";
function GroupWishlist() {
  const { roomId } = useParams();

  function handleClick() {
    history.push(`/rooms/${roomId}`);
  }

  return (
    <button type="button" onClick={handleClick}>
      Go Back
    </button>
  );
}

export default GroupWishlist;
