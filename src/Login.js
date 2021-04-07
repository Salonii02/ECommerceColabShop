import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import db from "./firebase";

function Login() {
  /* dispatch used to update the data layer*/
  const [{}, dispatch] = useStateValue();
  // const [userId,setuserId] = useState("") ;
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(result => {
        console.log(result);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user
        });
        //for new user
        if (result.additionalUserInfo.isNewUser) {
          db.collection("user")
            .add({
              name: result.user.displayName,
              wishlist: [],
              cart: [],
              emailid: result.user.email
            })
            .then(function (docRef) {
              // userId = docRef.id;
            })
            .catch(function (error) {
              console.error("Error adding user: ", error);
            });
        }
      })
      .catch(error => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://cdn.freelogovectors.net/wp-content/uploads/2020/02/myntra-logo-768x768.png"
          alt=""
        />
        <div className="login_text">
          <h1>Sign in to ColabShop</h1>
        </div>
        <Button type="submit" onClick={signIn}>
          Sign in With Google
        </Button>
      </div>
    </div>
  );
}
// export {userId};
export default Login;
