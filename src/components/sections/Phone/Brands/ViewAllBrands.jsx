import React from "react";
import PhoneBrandService from "../../../../services/PhoneBrandService";
import {Button, Table} from "react-bootstrap";
import NavigationBarDashboard from "../../../layouts/Navigation/NavigationBarDashboard";
import CommonCheckAuth from "../../../../services/CommonCheckAuth";
import ServiceUser from "../../../../services/ServiceUser";
import {Redirect} from "react-router-dom";

class ViewAllBrands extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;

        const currentUser = ServiceUser.getCurrentUser();
        this.state.currentUser = currentUser;

        this.navigateToEdit = this.navigateToEdit.bind(this);

    }
    initialState={
        brands:[]
    }

    componentDidMount() {
        PhoneBrandService.getAllBrandds()
            .then(response => response.data)
            .then((data) => {
                this.setState({brands: data});
            }).catch(error => {
            console.log("Error in getting all brands. Error : ", error);
        });
    }

    navigateToEdit =(event,id) =>{

    }

    render() {
        return (
            <div>
                {
                    this.state.currentUser.roles != "ROLE_ADMIN"?
                        <Redirect to={"/no-permission"} />:
                        <div></div>
                }
                <NavigationBarDashboard />

            <div className={'container-fluid'}>
                <h2>All Brands</h2>

                <Table striped bordered hover variant={'light'}>
                    <thead>
                    <tr>
                        <td>Brand</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.brands.length === 0?
                            <tr align={'center'}>
                                <td colSpan={6}>{this.state.brands.length} records available</td>
                            </tr>:
                            this.state.brands.map((e) => (
                                <tr key={e.id}>
                                    <td>{e.name}</td>

                                    {/*<td>
                                        <Button className={'btn btn-warning'}
                                                onClick={ event => this.navigateToEdit(this,e.id)}
                                        >
                                            Edit
                                        </Button>
                                    </td>*/}
                                </tr>
                            ))
                    }
                    </tbody>
                </Table>

            </div>
            </div>
        );
    }

}
export default CommonCheckAuth(ViewAllBrands);