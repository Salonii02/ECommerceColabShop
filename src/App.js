import React,{useState} from 'react';
import "./App.css";
import {Link} from 'react-router-dom';
// import { useStateValue } from './StateProvider';
import SideBar from "./Sidebar.js";
import Chat from "./Chat.js";
import { BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import "./Login.css";
import {Button} from "@material-ui/core";
import {auth, provider} from "./firebase"
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
import db from './firebase';

function App() {
    const [{user},dispatch]=useStateValue();
    // console.log(Login.userId);
  //  const[{},dispatch] = useStateValue();
    // const [userId,setuserId] = useState("") ;
    let userId;
    const [loggedIn, setloggedIn] = useState(false);
    const [intermediate, setintermediate] = useState(false);
   
    const signIn = () =>{
        auth.signInWithPopup(provider).then(result=>{
            console.log(result);
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
            //for new user
            if(result.additionalUserInfo.isNewUser){
            db.collection('user').add({
                name: result.user.displayName,
                wishlist: [],
                cart: [],
                emailid: result.user.email,
            }).then(function(docRef) {
                userId = docRef.id;
                setloggedIn(true);
                {vfhnjsd}
            })
            .catch(function(error) {
                console.error("Error adding user: ", error);
            });
        }
        }).catch(error => alert(error.message));
    };
    return(
        <div className="app">
           { (!loggedIn) ? (
                  <div className="login">
                   <div className="login_container">
               <img src="https://cdn.freelogovectors.net/wp-content/uploads/2020/02/myntra-logo-768x768.png" alt=""/> 
                    <div className="login_text">
                        <h1>Sign in to ColabShop</h1>
                    </div>
                    <Button type="submit" onClick={signIn}>Sign in With Google</Button>
                            {/* <Link to={`/users/${userId}`}>Enter ColabShop</Link>  */}
           </div>
        </div>
           ) : ( <div>
            {  !intermediate ? (
            <div>
                <Router>
                <Link to={`/users/${userId}`}>
                    <button onClick={()=>{setintermediate(true)}}>Enter ColabShop</button>
                </Link>
                </Router>
            </div>
           /* <h1>Let's build Whatsapp Clone</h1>  */
            ) : (
            <div className="app__body">
                <Router>
                    <SideBar/>
                        <Switch>
                            {/*Sidebar */}
                            <Route path="/users/:userId/rooms/:roomId">
                                <Chat />
                                {/* Chat */}
                            </Route>
                            <Route path="/">
                                <Chat />
                            </Route>
                        </Switch>
                </Router>
            </div>
            )
        }
        </div>
    )
}
</div>
);
}
export default App;