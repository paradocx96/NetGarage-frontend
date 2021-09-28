import React from "react";
import PhoneBrandService from "../../../../services/PhoneBrandService";
import {Button, Table} from "react-bootstrap";
import {confirmAlert} from "react-confirm-alert";
import Toast1 from "../../../Toasts/Toast1";
import NavigationBarDashboard from "../../../layouts/Navigation/NavigationBarDashboard";
import CommonCheckAuth from "../../../../services/CommonCheckAuth";
import ServiceUser from "../../../../services/ServiceUser";
import {Redirect} from "react-router-dom";

class DeleteBrands extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;

        const currentUser = ServiceUser.getCurrentUser();
        this.state.currentUser = currentUser;

    }

    initialState = {
        brands: []
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

    requestDelete = (id) =>{
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
        })
    }

    performDelete = async (id) =>{
        await PhoneBrandService.deleteBrand(id)
            .then(response => response.data)
            .then((data) => {
                if (data != null){
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}),3000);
                    this.setState({
                        brands:this.state.brands.filter(brands => brands.id !== id)
                    })
                }
            }).catch(error => {
                console.log("Error in deleting brand. Error : ",error)
            });

    }

    cancelDelete =() =>{
        alert("Deletion Cancelled");
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
                <div style={{"display": this.state.show ? "block" : "none"}}>

                    <Toast1

                        children={{
                            show: this.state.show,
                            message: "Brand entry deleted successfully",
                            type: 'danger'
                        }}
                    />

                </div>

                <h2>Delete Brands</h2>

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
export default CommonCheckAuth(DeleteBrands);