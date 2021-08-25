import React from 'react';
import {BrowserRouter as Router, Redirect, Switch, Route} from 'react-router-dom';
import './App.css';

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//HOMEPAGE
import Homepage from "./components/pages/Homepage";
import Error404 from "./components/pages/Error404";
import HeaderBar from "./components/layouts/Header/HeaderBar";
import NavigationBar from "./components/layouts/Navigation/NavigationBar";
import Contact from "./components/pages/Contact";


//USER
import Login from "./components/pages/Login";
import Registration from "./components/pages/Registration";
import ViewProfile from "./components/pages/ViewProfile";
import EditProfile from "./components/pages/EditProfile";


//MOBILE
import Mobile from "./components/pages/Mobile";
import Phones from "./components/pages/Phones";
import ViewAllChipsets from "./components/sections/Phone/Chipset/ViewAllChipsets";
import AddChipset from "./components/sections/Phone/Chipset/AddChipset";
import DeleteChipset from "./components/sections/Phone/Chipset/DeleteChipset";
import ViewAllOS from "./components/sections/Phone/OS/ViewAllOS";
import AddOS from "./components/sections/Phone/OS/AddOS";
import DeleteOS from "./components/sections/Phone/OS/DeleteOS";
import EditChipset from "./components/sections/Phone/Chipset/EditChipset";
import EditOS from "./components/sections/Phone/OS/EditOS";


//LAPTOP
import Laptop from "./components/pages/Laptop";
import LaptopAdd from "./components/sections/Laptop/LaptopAdd";
import LaptopDashboard from "./components/sections/Laptop/LaptopDashboard";
import LaptopImageUpload from "./components/sections/Laptop/LaptopImageUpload";
import LaptopImageViewAdmin from "./components/sections/Laptop/LaptopImageViewAdmin";


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
                    <Route path="/view-profile" component={ViewProfile}/>
                    <Route path="/edit-profile" component={EditProfile}/>


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
                    <Route path="/laptops-admin" component={LaptopDashboard}/>
                    <Route path="/laptops-admin-add" component={LaptopAdd}/>
                    <Route path="/laptops-admin-image-upload/:lid" component={LaptopImageUpload}/>
                    <Route path="/laptops-admin-image-view/:lid" component={LaptopImageViewAdmin}/>


                    {/* DASHBOARD */}
                    <Route path="/dashboard" component={Dashboard}/>


                    <Redirect to="/page-not-found"/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
