import React from "react";
import PhoneChipsetService from "../../../../services/PhoneChipsetService";
import {Button, Table} from "react-bootstrap";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import Toast1 from "../../../Toasts/Toast1";
import NavigationBarDashboard from "../../../layouts/Navigation/NavigationBarDashboard";
import CommonCheckAuth from "../../../../services/CommonCheckAuth";
import ServiceUser from "../../../../services/ServiceUser";
import {Redirect} from "react-router-dom";


class DeleteChipset extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;

        const currentUser = ServiceUser.getCurrentUser();
        this.state.currentUser = currentUser;

        this.requestDelete = this.requestDelete.bind(this);
        this.performDelete = this.performDelete.bind(this);
        this.cancelDelete = this.cancelDelete.bind(this);

    }

    initialState = {
        chipsets: []
    }

    componentDidMount() {

        PhoneChipsetService.getAllChipsets()
            .then(response => response.data)
            .then((data) => {
                this.setState({chipsets: data});
            }).catch(error => {
            console.log("Error in getting all chipsets. Error : ", error);
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

        await PhoneChipsetService.deleteChipset(id)
            .then(response => response.data)
            .then( (data) => {
                if (data != null){
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}),3000);
                    this.setState({
                        chipsets:this.state.chipsets.filter(chipsets => chipsets.id !== id)
                    })
                }
            }).catch(error => {
                console.log("Error in deleting chipset. Error : ",error)
            });

    }

    cancelDelete = () => {
        alert("Deletion Cancelled");
    }


    render()
    {
            return (
                <div>
                    {
                        this.state.currentUser.roles != "ROLE_ADMIN"?
                            <Redirect to={"/no-permission"} />:
                            <div></div>
                    }
                    <NavigationBarDashboard />

                    <div style={{"display": this.state.show ? "block" : "none"}}>

                        <Toast1

                            children={{
                                show: this.state.show,
                                message: "Chipset deleted successfully",
                                type: 'danger'
                            }}
                        />

                    </div>
                    <h2>Delete Chipsets</h2>

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
                                            <Button className={'btn btn-danger'}
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
export default CommonCheckAuth(DeleteChipset);
