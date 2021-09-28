import React from "react";
import PhoneService from "../../../../services/PhoneService";
import {confirmAlert} from "react-confirm-alert";
import Toast1 from "../../../Toasts/Toast1";
import {Table, Button} from "react-bootstrap";
import NavigationBarDashboard from "../../../layouts/Navigation/NavigationBarDashboard";
import CommonCheckAuth from "../../../../services/CommonCheckAuth";


class DeletePhones extends React.Component{
    constructor(props) {
        super(props);

        this.state = this.initialState;
        this.state.show = false;

        this.requestDelete = this.requestDelete.bind(this);
        this.performDelete = this.performDelete.bind(this);
        this.cancelDelete = this.cancelDelete.bind(this);

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

    requestDelete = (id) => {

        confirmAlert({
                title:'Delete this entry?',
                message:'This cannot be undone',
                buttons:[
                    {
                        label:'I understand. Delete.',
                        onClick: this.performDelete.bind(this,id)
                    },
                    {
                        label:'Do not Delete',
                        onClick:this.cancelDelete.bind(this)
                    }
                ]
            }
        )

    }

    performDelete = async (id) => {
        await PhoneService.deletePhoneById(id)
            .then(response => response.data)
            .then( (data) => {
                if (data != null){
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}),3000);
                    this.setState({
                        phones:this.state.phones.filter(phones => phones.id !== id)
                    })
                }
            }).catch(error => {
                console.log("Error in deleting phone. Error : ",error)
            });
    }

    cancelDelete = () => {
        alert("Deletion Cancelled");
    }

    render() {
        return (
            <div>
                <NavigationBarDashboard/>
                <div style={{"display": this.state.show ? "block" : "none"}}>

                    <Toast1

                        children={{
                            show: this.state.show,
                            message: "Chipset deleted successfully",
                            type: 'danger'
                        }}
                    />

                </div>
                <h2>Delete Phones</h2>
                <Table striped bordered hover variant={'light'}>
                    <thead>
                    <tr>
                        <td>Brand and Model</td>
                        <td>Brand</td>
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
                                    <td>{e.brandmodel}</td>
                                    <td>{e.brand}</td>

                                    <td>
                                        <Button
                                            className={'btn btn-danger'}
                                            onClick={this.requestDelete.bind(this,e.id)}
                                        >
                                            Delete
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

export default CommonCheckAuth(DeletePhones);