import React, { useState, useEffect } from "react";
import PrivateIcon from "@material-ui/icons/Add";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import { Avatar, Button, IconButton } from "@material-ui/core";
import db from "./firebase";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useStateValue } from "./StateProvider";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// import CustomisedHook from './CustomisedHook';
import Select from "react-select";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  //const [messages, setMessages] = useState("");
  const [addPrivate, setPrivate] = useState(false);
  const [addGroup, setGroup] = useState(false);
  const [selectedUser, setselectedUser] = useState([]);
  const handlePrivateClose = () => setPrivate(false);
  const handlePrivateOpen = () => setPrivate(true);
  const handleGroupOpen = () => setGroup(true);
  const handleGroupClose = () => setGroup(false);

  function addGroupByUserID(groupid, users) {
    users.forEach(userid =>
      db
        .collection("users")
        .doc(userid)
        .set({
          group: group.push(groupid)
        })
        .then(() => {
          console.log("Suc");
        })
        .catch(error => {
          console.log(error);
        })
    );
  }

  function addPrivateChat() {
    const group = {
      createdAt: new Date(),
      createdBy: user.uid,
      members: [user.uid, selectedUser.uid],
      name: selectedUser.displayName,
      type: 0 //private
    };
    //add group
    db.collection("group")
      .add(group)
      .then(function (docRef) {
        group.id = docRef.id;
        //now add this group in the database of its members
        //user -> group
        addGroupByUserID(grou.id, [user.uid, selecteduser.uid]);
        //resolve(group)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function fetchUsers() {
    //  console.log("aditi");
    const allUsers = [];
    db.collection("user")
      .get()
      .then(querySnapShot => {
        querySnapShot.forEach(doc => {
          const user = doc.data();
          allUsers.push(user);
        });
      })
      .catch(error => {
        alert(error);
      });
    console.log(allUsers);
    console.log(typeof allUsers);
    return allUsers;
  }
  useEffect(() => {
    const unsubscribe = db
      .collection("user")
      .doc(user.uid)
      .collection("rooms")
      .onSnapshot(snapshot =>
        setRooms(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          }))
        )
      );

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user.photoURL} />
        <div className="sidebar__headerRight">
          {/* <IconButton> */}
          <Button onClick={handlePrivateOpen}>
            <PrivateIcon />
          </Button>
          <Dialog
            open={addPrivate}
            onClose={handlePrivateClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                please enter your email address here.
              </DialogContentText>
              <Autocomplete
                id="combo-box-demo"
                options={fetchUsers()}
                onChange={(event, value) => setselectedUser(value)}
                getOptionLabel={option => option.emailid}
                style={{ width: 300 }}
                renderInput={params => (
                  <TextField {...params} label="Combo box" variant="outlined" />
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={addPrivateChat} color="primary">
                Add Friend
              </Button>
            </DialogActions>
            <DialogActions>
              <Button onClick={handlePrivateClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          {/* </IconButton> */}
          {/* <Select
    defaultValue={(fetchUsers())[0].displayName}
    multi
    name="groups"
    options={fetchUsers()}
    className="basic-multi-select"
    classNamePrefix="select"
    /> */}
          {/*  import React, { Component } from 'react';
import { render } from 'react-dom';
import Select from 'react-select';

const options = [
  { value: 'a', label: 'a' },
  { value: 'b', label: 'b' },
];

class App extends React.Component {
  state = {
    selectedOptions: [],
  }

  handleChange = (selectedOptions) => {
    this.setState({ selectedOptions });
  }

  render() {
    const { selectedOptions } = this.state;

    return (
      <React.Fragment>
        <Select
          isMulti
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
        />
      {selectedOptions.map(o => <p>{o.value}</p>)}
      </React.Fragment>
    );
  }
}
  /> */}
          <Button onClick={handleGroupOpen}>
            <GroupAddIcon />
          </Button>
          <Dialog
            open={addGroup}
            onClose={handleGroupClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>Add new group name</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Group Name"
                type="groupname"
                fullWidth
              />
              <DialogContentText>Add members</DialogContentText>
              {/* <CustomisedHook/> */}

              {/* <Select
    defaultValue={user.email}
    isMultiname="true"
    options={fetchUsers()}
    getOptionLabel={(option) => option.emailid}
    getOptionValue={(option) => option.emailid}
    className="basic-multi-select"
    classNamePrefix="select"
  /> */}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleGroupClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map(room => (
          //    <div>
          //    <h2>{room.data.name}</h2>
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
          //    </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
