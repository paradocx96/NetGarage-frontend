import React from "react";
import PhoneOSService from "../../../../services/PhoneOSService";
import Toast1 from "../../../Toasts/Toast1";
import {Button, Table} from "react-bootstrap";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
// import data from "bootstrap/js/src/dom/data";

class DeleteOS extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;

        this.requestDelete = this.requestDelete.bind(this);
        this.performDelete = this.performDelete.bind(this);
        this.cancelDelete = this.cancelDelete.bind(this);

    }

    initialState = {
        os: []
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

    performDelete = async (id) => {
        await PhoneOSService.deleteOS(id)
            .then(response => response.data)
            .then((data) =>{
                if (data != null){
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}),3000);
                    this.setState({
                        os:this.state.os.filter(os => os.id !== id)
                    })
                }
            }).catch(error => {
                console.log("Error in deleting OS. Error : ",error)
            });
    }

    cancelDelete = () => {
        alert("Deletion Cancelled");
    }

    render() {
        return (
            <div className={'container-fluid'}>

                <div style={{"display": this.state.show ? "block" : "none"}}>

                    <Toast1

                        children={{
                            show: this.state.show,
                            message: "OS entry deleted successfully",
                            type: 'danger'
                        }}
                    />

                </div>

                <h2>Delete OS</h2>
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

export default DeleteOS;