import React from 'react';
import {BrowserRouter as Router, Redirect, Switch, Route} from 'react-router-dom';
import './App.css';

//HOMEPAGE
import Homepage from "./pages/Homepage";
import Error404 from "./pages/Error404";


//USER
import Login from "./pages/Login";
import Registration from "./pages/Registration";


//MOBILE


//LAPTOP


function App() {
    return (
        <div>
            <Router>
                <Switch>
                    {/* HOMEPAGE */}
                    <Route exact path="/" component={Homepage}/>
                    <Route path="/page-not-found" component={Error404}/>

                    {/* USER  */}
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Registration}/>


                    {/* MOBILE */}


                    {/* LAPTOP */}


                    <Redirect to="/page-not-found"/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
