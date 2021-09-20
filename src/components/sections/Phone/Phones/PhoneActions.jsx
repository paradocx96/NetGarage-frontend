import React from "react";
import PhoneService from "../../../../services/PhoneService";
import {Button, Table} from "react-bootstrap";
import Toast1 from "../../../Toasts/Toast1";
import NavigationBarDashboard from "../../../layouts/Navigation/NavigationBarDashboard";
import CommonCheckAuth from "../../../../services/CommonCheckAuth";
import {Link} from "react-router-dom";

class PhoneActions extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.showpublished = false;
        this.state.showunbpublished = false;;

        this.publishPhone = this.publishPhone.bind(this);
        this.unpublishPhone = this.unpublishPhone.bind(this);
    }

    initialState={
        phones:[]
    }

    componentDidMount() {
        PhoneService.getAllPhones()
            .then(response => response.data)
            .then((data) => {
                this.setState({phones: data});
            }).catch(error => {
                console.log("Error in getting all phones. Error: ",error);
        })
    }
    navigateToEdit = (event,id) => {
        console.log("Running navigate");
        console.log("Id received : ",id);
        window.location = `/phones/editPhone/${id}`;
    }

    navigateToUpload = (event,id) =>{
        window.location = `/phones/uploadMainImage/${id}`;
    }

    publishPhone = (event,id) => {
        PhoneService.publishPhone(id)
            .then(response => response.data)
            .then((data) => {
                if (data != null){
                    this.setState({"showpublished":true});
                    setTimeout(() => this.setState({"showpublished":false}),3000);
                    this.componentDidMount();
                }
            })
    }

    unpublishPhone = (event,id) => {
        PhoneService.unpublishPhone(id)
            .then(response => response.data)
            .then((data) => {
                if (data != null){
                    this.setState({"showunbpublished":true});
                    setTimeout(() => this.setState({"showunbpublished":false}),3000);
                    this.componentDidMount();
                }
            })
    }


    render() {
        return (
            <div>
                <NavigationBarDashboard/>
            <div className={'container-fluid'}>

                <div style={{"display": this.state.showpublished ? "block" : "none"}}>

                    <Toast1

                        children={{
                            show: this.state.showpublished,
                            message: "Phone published successfully",
                            type: 'success'
                        }}
                    />

                </div>

                <div style={{"display": this.state.showunbpublished ? "block" : "none"}}>

                    <Toast1

                        children={{
                            show: this.state.showunbpublished,
                            message: "Phone unpublished successfully",
                            type: 'secondary'
                        }}
                    />

                </div>

                <h2>All Phones</h2>

                {/*<Link to={'/phonePdf'}>Generate Report</Link>*/}

                <Table striped bordered hover variant={'light'}>
                    <thead>
                    <tr>
                        <td>Id</td>
                        <td>Brand and Model</td>
                        <td>Brand</td>
                        <td>Status</td>
                       {/* <td>Network</td>*/}
                        {/*<td>SIM</td>*/}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.phones.length === 0?
                            <tr align={'center'}>
                                <td colSpan={6}>{this.state.phones.length} records available</td>
                            </tr>:
                            this.state.phones.map((e) => (
                                <tr key={e.id}>
                                    <td>{e.id}</td>
                                    <td>{e.brandmodel}</td>
                                    <td>{e.brand}</td>
                                    <td>{e.publishstatus}</td>
                                    {/*<td>{e.network}</td>*/}
                                    {/*<td>{e.sim}</td>*/}

                                    <td>
                                        <Button className={'btn btn-warning'}
                                                onClick={event => this.navigateToEdit(this,e.id)}
                                        >
                                            Edit
                                        </Button>
                                    </td>

                                    <td>
                                        <Button className={'btn btn-success'}
                                                onClick={event => this.publishPhone(this,e.id)}
                                        >
                                            Publish
                                        </Button>
                                    </td>

                                    <td>
                                        <Button className={'btn btn-secondary'}
                                                onClick={event => this.unpublishPhone(this,e.id)}
                                        >
                                            Unpublish
                                        </Button>
                                    </td>

                                    <td>
                                        <Button className={'btn btn-info'}
                                                onClick={event => this.navigateToUpload(this,e.id)}
                                        >
                                            Upload Image
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

export default CommonCheckAuth(PhoneActions);