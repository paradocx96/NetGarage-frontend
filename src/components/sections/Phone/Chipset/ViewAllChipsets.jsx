import React from "react";
import PhoneChipsetService from "../../../../services/PhoneChipsetService";
import {Button, Table} from "react-bootstrap";
import NavigationBarDashboard from "../../../layouts/Navigation/NavigationBarDashboard";
import CommonCheckAuth from "../../../../services/CommonCheckAuth";
import ServiceUser from "../../../../services/ServiceUser";
import {Redirect} from "react-router-dom";


class ViewAllChipsets extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;

        const currentUser = ServiceUser.getCurrentUser();
        this.state.currentUser = currentUser;

        this.navigateToEdit = this.navigateToEdit.bind(this);

    }

    initialState={
        chipsets:[]
    }

    componentDidMount() {
        PhoneChipsetService.getAllChipsets()
            .then(response => response.data)
            .then((data) => {
                this.setState({chipsets: data});
            }).catch(error => {
                console.log("Error in getting all chipset. Error : ", error);
        })
    }

    navigateToEdit = (event,id) => {
        console.log("Running navigate");
        console.log("Id received : ",id);
        window.location = `/chipsets/editChipset/${id}`;
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

                <h2>All Chipsets</h2>
                <Table striped bordered hover variant={'light'}>
                    <thead>
                    <tr>
                        <td>Brand and Model </td>
                        <td>CPU </td>
                        <td>GPU </td>
                        <td>Lithography </td>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        this.state.chipsets.length === 0?
                            <tr align={'center'}>
                                <td colSpan={6}>{this.state.chipsets.length} records available</td>
                            </tr>:
                            this.state.chipsets.map( (e) => (
                                <tr key={e.id}>
                                    <td>{e.brandmodel}</td>
                                    <td>{e.cpu}</td>
                                    <td>{e.gpu}</td>
                                    <td>{e.lithography}</td>

                                    <td>
                                        <Button className={'btn btn-warning'}
                                                onClick={event => this.navigateToEdit(this,e.id)}
                                        >
                                            Edit
                                        </Button>
                                    </td>

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
export default CommonCheckAuth(ViewAllChipsets);