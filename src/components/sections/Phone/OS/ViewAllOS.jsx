import React from "react";
import PhoneOSService from "../../../../services/PhoneOSService";
import {Button, Table} from "react-bootstrap";
import NavigationBarDashboard from "../../../layouts/Navigation/NavigationBarDashboard";
import CommonCheckAuth from "../../../../services/CommonCheckAuth";
import {Redirect} from "react-router-dom";
import ServiceUser from "../../../../services/ServiceUser";
import FooterAdmin from "../../../layouts/Footer/FooterAdmin";

class ViewAllOS extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;

        const currentUser = ServiceUser.getCurrentUser();
        this.state.currentUser = currentUser;

        this.navigateToEdit = this.navigateToEdit.bind(this);

    }

    initialState={
        os:[]
    }

    componentDidMount() {
        PhoneOSService.getAllOSes()
            .then(response => response.data)
            .then((data) => {
                this.setState({os: data});
            }).catch(error => {
            console.log("Error in getting all OS. Error : ", error);
        });
    }

    navigateToEdit = (event, id) => {
        console.log("Running navigate");
        window.location = `/phone/os/editOs/${id}`;
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
                <h2>All OS</h2>
                <Table striped bordered hover variant={'light'}>
                    <thead>
                    <tr>
                        <td>OS</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.os.length === 0?
                            <tr align={'center'}>
                                <td colSpan={6}>{this.state.os.length} records available</td>
                            </tr>:
                            this.state.os.map((e) => (
                                <tr key={e.id}>
                                    <td>{e.name}</td>

                                    <td>
                                        <Button className={'btn btn-warning'}
                                                onClick={ event => this.navigateToEdit(this,e.id)}
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

                <br/> <br/> <br/>
                <FooterAdmin/>

            </div>
        );
    }

}

export default CommonCheckAuth(ViewAllOS);