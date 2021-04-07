import React, { useState, useEffect } from "react";
import PrivateIcon from "@material-ui/icons/Add";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import "./Sidebar.css";
import { Multiselect } from "multiselect-react-dropdown";
import firebase from "firebase";
import SidebarChat from "./SidebarChat";
import { Avatar, Button } from "@material-ui/core";
import db from "./firebase";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useStateValue } from "./StateProvider";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }] = useStateValue();
  //const [messages, setMessages] = useState("");
  const [addPrivate, setPrivate] = useState(false);
  const [addGroup, setGroup] = useState(false);
  const [selectedUser, setselectedUser] = useState([]);
  const [newGroupMembers, setnewGroupMembers] = useState([]);
  const [newGroupName, setnewGroupName] = useState([]);
  const handlePrivateClose = () => setPrivate(false);
  const handlePrivateOpen = () => setPrivate(true);
  const handleGroupOpen = () => setGroup(true);
  const handleGroupClose = () => setGroup(false);

  function addGroupByUserID(groupid, users) {
    var i = 0;
    for (i = 0; i < users.length; i++) {
      db.collection("user")
        .doc(users[i])
        .update({
          groups: firebase.firestore.FieldValue.arrayUnion(groupid)
          //  emailid: data.emailid
        })
        .then(() => {
          console.log("s");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  function addnewGroup() {
    let newppl = [];
    newGroupMembers.forEach(memeber => {
      newppl.push(memeber.uid);
    });
    newppl.push(user.uid);
    const group = {
      createdAt: new Date(),
      createdBy: [user.uid, user.displayName],
      members: newppl,
      name: newGroupName,
      wishlist: [],
      type: 1 //group chat
    };
    db.collection("group")
      .add(group)
      .then(function (docRef) {
        group.id = docRef.id;
        db.collection("group")
          .doc(docRef.id)
          .set(
            {
              id: docRef.id
            },
            { merge: true }
          )
          .then(() => console.log("sucessfully set"))
          .catch(error => console.log(error));
        //now add this group in the database of its members
        //user -> group

        addGroupByUserID(group.id, newGroupMembers.push(user.uid));

        //resolve(group)
      })
      .catch(function (error) {
        console.log(error);
      });
    // db.collection("group")
    // .where("members", "array-contains", user.uid)
    // .get()
    // .then(querySnapshot => {
    //   setRooms(
    //     querySnapshot.docs.map(doc => ({
    //       id: doc.id,
    //       data: doc.data()
    //     }))
    //   );
    // })
    // .catch(error => {
    //   console.log("Error getting documents: ", error);
    // });
    // // db.collection("group")
    //   .where("members", "array-contains", user.uid)
    //   .get()
    //   .then(querySnapshot => {
    //     setRooms(
    //       querySnapshot.docs.map(doc => ({
    //         id: doc.id,
    //         data: doc.data()
    //       }))
    //     );
    //   })
    //   .catch(error => {
    //     console.log("Error getting documents: ", error);
    //   });
  }
  function addPrivateChat() {
    const group = {
      createdAt: new Date(),
      createdBy: [user.uid, user.displayName],
      members: [user.uid, selectedUser.uid],
      name: selectedUser.displayName,
      type: 0 //private
    };
    //add group

    db.collection("group")
      .add(group)
      .then(function (docRef) {
        group.id = docRef.id;
        db.collection("group")
          .doc(docRef.id)
          .set(
            {
              id: docRef.id
            },
            { merge: true }
          )
          .then(() => console.log("sucessfully set"))
          .catch(error => console.log(error));
        //now add this group in the database of its members
        //user -> group

        addGroupByUserID(group.id, [user.uid, selectedUser.uid]);

        //resolve(group)
      })
      .catch(function (error) {
        console.log(error);
      });
    // db.collection("group")
    //   .where("members", "array-contains", user.uid)
    //   .get()
    //   .then(querySnapshot => {
    //     setRooms(
    //       querySnapshot.docs.map(doc => ({
    //         id: doc.id,
    //         data: doc.data()
    //       }))
    //     );
    //   })
    //   .catch(error => {
    //     console.log("Error getting documents: ", error);
    //   });
  }
  function fetchUsers() {
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
    return allUsers;
  }

  useEffect(() => {
    // db.collection('user').doc(user.uid).get()
    console.log("saloni");
    db.collection("group")
      .where("members", "array-contains", user.uid)
      .onSnapshot(querySnapshot => {
        setRooms(
          querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          }))
        );
      });
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
            <DialogTitle id="form-dialog-title">Private</DialogTitle>
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
              <Button onClick={addPrivateChat} color="secondary">
                Add Friend
              </Button>
            </DialogActions>
            <DialogActions>
              <Button onClick={handlePrivateClose} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <Button onClick={handleGroupOpen}>
            <GroupAddIcon />
          </Button>
          <Dialog
            open={addGroup}
            onClose={handleGroupClose}
            fullWidth
            maxWidth="sm"
            fullHeight
            maxHeight="sm"
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add Group</DialogTitle>
            <DialogContent>
              <DialogContentText>Add new group name</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Group Name"
                type="groupname"
                value={newGroupName}
                onChange={event => {
                  setnewGroupName(event.target.value);
                }}
                fullWidth
              />
              <DialogContentText>Add members</DialogContentText>
              <Multiselect
                options={fetchUsers()}
                displayValue="emailid"
                onSelect={(selectedList, selectedItem) => {
                  setnewGroupMembers(selectedList);
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={addnewGroup} color="secondary">
                Add Group
              </Button>
            </DialogActions>
            <DialogActions>
              <Button onClick={handleGroupClose} color="secondary">
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
        {/* <SidebarChat addNewChat /> */}
        {rooms.map(room => (
          <SidebarChat
            key={room.id}
            id={room.id}
            name={
              room.data.type === 1
                ? room.data.name
                : room.data.type === 0 && room.data.createdBy[0] === user.uid
                ? room.data.name
                : room.data.createdBy[1]
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
