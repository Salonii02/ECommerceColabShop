import React from 'react';
import "./App.css"
import SideBar from "./Sidebar.js";
import Chat from "./Chat.js";
import { BrowserRouter as Router,Switch, Route} from 'react-router-dom';

function App() {
        return(
        <div className="app">
           {/* <h1>Let's build Whatsapp Clone</h1>  */}
            <div className="app__body">
                <Router>
                    <SideBar/>
                        <Switch>
                            {/*Sidebar */}
                            <Route path="/rooms/:roomId">
                                <Chat />
                                {/* Chat */}
                            </Route>
                            <Route path="/">
                                <Chat />
                            </Route>
                        </Switch>
                </Router>
            </div>
        </div>
        );
}
export default App;