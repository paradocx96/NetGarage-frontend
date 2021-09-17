import React from "react";
import PhoneService from "../../../../services/PhoneService";
import {Button, Table} from "react-bootstrap";

class PhoneActions extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;
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


    render() {
        return (
            <div className={'container-fluid'}>
                <h2>All Phones</h2>

                <Table striped bordered hover variant={'light'}>
                    <thead>
                    <tr>
                        <td>Id</td>
                        <td>Brand and Model</td>
                        <td>Brand</td>
                        <td>Network</td>
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
                                    <td>{e.network}</td>
                                    {/*<td>{e.sim}</td>*/}

                                    <td>
                                        <Button className={'btn btn-warning'}
                                                onClick={event => this.navigateToEdit(this,e.id)}
                                        >
                                            Edit
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
        );
    }


}

export default PhoneActions;