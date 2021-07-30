import React from 'react';
import {BrowserRouter as Router, Redirect, Switch, Route} from 'react-router-dom';
import './App.css';

//HOMEPAGE
import Homepage from "./pages/Homepage";


//LOGIN
import Login from "./pages/Login";
import Registration from "./pages/Registration";


function App() {
    return (
        <div>
            <Router>
                <Switch>
                    {/* HOMEPAGE */}
                    <Route exact path="/" component={Homepage}/>

                    {/* LOGIN  */}
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Registration}/>


                    <Redirect to="/"/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
