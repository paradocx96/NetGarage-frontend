import React from 'react';
import {BrowserRouter as Router, Redirect, Switch, Route} from 'react-router-dom';
import './App.css';

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/css/bootstrap.css';

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
import Phones from "./components/pages/Phones";
import ViewAllChipsets from "./components/sections/Phone/Chipset/ViewAllChipsets";
import AddChipset from "./components/sections/Phone/Chipset/AddChipset";


//LAPTOP
import Laptop from "./components/pages/Laptop";
import DeleteChipset from "./components/sections/Phone/Chipset/DeleteChipset";
import ViewAllOS from "./components/sections/Phone/OS/ViewAllOS";
import AddOS from "./components/sections/Phone/OS/AddOS";
import DeleteOS from "./components/sections/Phone/OS/DeleteOS";
import EditChipset from "./components/sections/Phone/Chipset/EditChipset";
import EditOS from "./components/sections/Phone/OS/EditOS";




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
                    <Route path="/phones" component={Phones}/>
                    <Route path="/chipsets/viewAll" component={ViewAllChipsets}/>
                    <Route path="/chipsets/addChipset" component={AddChipset}/>
                    <Route path="/chipsets/deleteChipset" component={DeleteChipset}/>
                    <Route path="/chipsets/editChipset/:id" component={EditChipset}/>

                    <Route path="/phone/os/viewAll" component={ViewAllOS}/>
                    <Route path="/phone/os/addOS" component={AddOS}/>
                    <Route path="/phone/os/deleteOS" component={DeleteOS}/>
                    <Route path="/phone/os/editOs/:id" component={EditOS}/>



                    {/* LAPTOP */}
                    <Route path="/laptops" component={Laptop}/>



                    <Redirect to="/page-not-found"/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
