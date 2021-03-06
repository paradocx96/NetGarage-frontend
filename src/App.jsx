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
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetPassword from "./components/sections/ForgotPassword/ResetPassword";
import ViewProfile from "./components/pages/ViewProfile";
import EditProfile from "./components/pages/EditProfile";
import AddFeedback from "./components/pages/AddFeedback";
import ViewAllUsers from "./components/pages/ViewAllUsers";

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
import LaptopFilter from "./components/sections/Laptop/LaptopFilter";
import LaptopAdd from "./components/sections/Laptop/LaptopAdd";
import LaptopDashboard from "./components/sections/Laptop/LaptopDashboard";
import LaptopImageUpload from "./components/sections/Laptop/LaptopImageUpload";
import LaptopMainImageUpload from "./components/sections/Laptop/LaptopMainImageUpload";
import LaptopImageViewAdmin from "./components/sections/Laptop/LaptopImageViewAdmin";
import LaptopHomepageSingleView from "./components/sections/Laptop/LaptopHomepageSingleView";
import LaptopSubCategories from "./components/sections/Laptop/LaptopSubCategories";
import LaptopEdit from "./components/sections/Laptop/LaptopEdit";


//DASHBOARD
import Dashboard from "./components/pages/Dashboard";
import PhoneActions from "./components/sections/Phone/Phones/PhoneActions";
import AddBrand from "./components/sections/Phone/Brands/AddBrand";
import ViewAllBrands from "./components/sections/Phone/Brands/ViewAllBrands";
import DeleteBrands from "./components/sections/Phone/Brands/DeleteBrands";
import AddPhone from "./components/sections/Phone/Phones/AddPhone";
import DeletePhones from "./components/sections/Phone/Phones/DeletePhones";
import EditPhone from "./components/sections/Phone/Phones/EditPhone";
import PhoneMainImageUpload from "./components/sections/Phone/Phones/PhoneMainImageUpload";
import ViewAllPhonesInternal from "./components/sections/Phone/Phones/ViewAllPhonesInternal";
import ViewAllPhonesInternal2 from "./components/sections/Phone/Phones/ViewAllPhonesInternal2";
import SinglePhoneView from "./components/sections/Phone/Phones/SinglePhoneView";
import PhoneBrandFilterPublished from "./components/sections/Phone/Phones/PhoneBrandFilterPublished";
import PhoneChipsetFilterPublished from "./components/sections/Phone/Phones/PhoneChipsetFilterPublished";
import PhoneOsFilterPublished from "./components/sections/Phone/Phones/PhoneOsFilterPublished";
import PhoneMainFilterPublished from "./components/sections/Phone/Phones/PhoneMainFilterPublished";
import ComparePhones from "./components/sections/Phone/Phones/ComparePhones";
import PhoneInternal from "./components/pages/PhoneInternal";
import PhonePdf from "./components/sections/Phone/Phones/PhonePdf";
import NoPermission from "./components/pages/NoPermission";



function App() {
    return (
        <div>
            <Router>
                <HeaderBar/>
                <NavigationBar/>
                <Switch>
                    {/* HOMEPAGE */}
                    <Route exact path="/" component={Homepage}/>
                    <Route path="/error" component={Error404}/>
                    <Route path="/contact" component={Contact}/>
                    <Route path="/no-permission" component={NoPermission}/>


                    {/* USER  */}
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Registration}/>
                    <Route path="/forgot-password" component={ForgotPassword}/>
                    <Route path="/reset-password/:id" component={ResetPassword}/>
                    <Route path="/view-profile" component={ViewProfile}/>
                    <Route path="/edit-profile" component={EditProfile}/>
                    <Route path="/add-feedback" component={AddFeedback}/>
                    <Route path="/view-all-users" component={ViewAllUsers}/>

                    {/* MOBILE */}
                    <Route path="/mobiles" component={Mobile}/>
                   {/* <Route path="/phones/main" component={Phones}/>*/}
                    <Route path="/phoneInternal" component={PhoneInternal}/>
                    <Route path="/phonePdf" component={PhonePdf}/>

                    {/*Phone chipset*/}
                    <Route path="/chipsets/viewAll" component={ViewAllChipsets}/>
                    <Route path="/chipsets/addChipset" component={AddChipset}/>
                    <Route path="/chipsets/deleteChipset" component={DeleteChipset}/>
                    <Route path="/chipsets/editChipset/:id" component={EditChipset}/>

                    {/*Phone OS*/}
                    <Route path="/phone/os/viewAll" component={ViewAllOS}/>
                    <Route path="/phone/os/addOS" component={AddOS}/>
                    <Route path="/phone/os/deleteOS" component={DeleteOS}/>
                    <Route path="/phone/os/editOs/:id" component={EditOS}/>

                    {/* Phone Brand*/}
                    <Route path="/phone/brand/addBrand" component={AddBrand}/>
                    <Route path="/phone/brand/viewAll" component={ViewAllBrands}/>
                    <Route path="/phone/brand/deleteBrand" component={DeleteBrands}/>

                    {/*phones*/}
                    <Route path="/phones/phoneActions" exact component={PhoneActions}/>
                    <Route path="/phones/viewAllPhonesInternal1" exact component={ViewAllPhonesInternal}/>
                    {/*<Route path="/phones/viewAllPhonesInternal" exact component={ViewAllPhonesInternal2}/>*/}
                    <Route path="/phones/addPhone" exact component={AddPhone}/>
                    <Route path="/phones/deletePhones" exact component={DeletePhones}/>
                    <Route path="/phones/editPhone/:id" exact component={EditPhone}/>
                    <Route path="/phones/uploadMainImage/:id" exact component={PhoneMainImageUpload}/>
                    <Route path="/phones/viewSinglePhone/:id" exact component={SinglePhoneView}/>

                    {/*Phone Filters*/}
                    <Route path="/phones/filter/publishedBrandFilter" exact component={PhoneBrandFilterPublished}/>
                    <Route path="/phones/filter/publishedChipsetFilter" exact component={PhoneChipsetFilterPublished}/>
                    <Route path="/phones/filter/publishedOsFilter" exact component={PhoneOsFilterPublished}/>
                    <Route path="/phones/filter/publishedFilterMain" exact component={PhoneMainFilterPublished}/>
                    <Route path="/phones/compare" exact component={ComparePhones}/>



                    {/* LAPTOP */}
                    <Route path="/laptops" component={Laptop}/>
                    <Route path="/laptops-finder" component={LaptopFilter}/>
                    <Route path="/laptops-view/:id" component={LaptopHomepageSingleView}/>


                    {/* LAPTOP DASHBOARD */}
                    <Route path="/laptops-admin" component={LaptopDashboard}/>
                    <Route path="/laptops-admin-add" component={LaptopAdd}/>
                    <Route path="/laptops-admin-image-upload/:lid" component={LaptopImageUpload}/>
                    <Route path="/laptops-admin-main-image-upload/:lid" component={LaptopMainImageUpload}/>
                    <Route path="/laptops-admin-image-view/:lid" component={LaptopImageViewAdmin}/>
                    <Route path="/laptops-admin-categories" component={LaptopSubCategories}/>
                    <Route path="/laptops-admin-edit/:lid" component={LaptopEdit}/>


                    {/* DASHBOARD */}
                    <Route path="/dashboard" component={Dashboard}/>


                    <Redirect to="/error"/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
