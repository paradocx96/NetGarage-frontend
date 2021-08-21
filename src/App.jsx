import React from 'react';
import {BrowserRouter as Router, Redirect, Switch, Route} from 'react-router-dom';
import './App.css';

//HOMEPAGE
import Homepage from "./components/pages/Homepage";
import Error404 from "./components/pages/Error404";
import HeaderBar from "./components/layouts/Header/HeaderBar";
import NavigationBar from "./components/layouts/Navigation/NavigationBar";
import Contact from "./components/pages/Contact";


//USER
import Login from "./components/pages/Login";
import Registration from "./components/pages/Registration";


//MOBILE
import Mobile from "./components/pages/Mobile";


//LAPTOP
import Laptop from "./components/pages/Laptop";
import LaptopAdd from "./components/sections/Laptop/LaptopAdd";
import LaptopDashboard from "./components/sections/Laptop/LaptopDashboard";


//DASHBOARD
import Dashboard from "./components/pages/Dashboard";


function App() {
    return (
        <div>
            <Router>
                <HeaderBar/>
                <NavigationBar/>
                <Switch>
                    {/* HOMEPAGE */}
                    <Route exact path="/" component={Homepage}/>
                    <Route path="/page-not-found" component={Error404}/>
                    <Route path="/contact" component={Contact}/>

                    {/* USER  */}
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Registration}/>


                    {/* MOBILE */}
                    <Route path="/mobiles" component={Mobile}/>


                    {/* LAPTOP */}
                    <Route path="/laptops" component={Laptop}/>
                    <Route path="/laptops-admin" component={LaptopDashboard}/>
                    <Route path="/laptops-admin-add" component={LaptopAdd}/>


                    {/* DASHBOARD */}
                    <Route path="/dashboard" component={Dashboard}/>


                    <Redirect to="/page-not-found"/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
