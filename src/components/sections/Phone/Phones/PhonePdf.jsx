import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import NavigationBarDashboard from "../../../layouts/Navigation/NavigationBarDashboard";
import {Button} from "react-bootstrap";
import PhoneService from "../../../../services/PhoneService";

class PhonePdf extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;

        this.generatePdf = this.generatePdf.bind(this);

    }
    initialState= {
        phones:[]
    }

    componentDidMount() {
        PhoneService.getAllPhones()
            .then(response => response.data)
            .then((data) => {
                this.setState({phones:data});
            }).catch(error => {
                console.log("Cannot get all phones. Error : ",error);
        });
    }

    generatePdf =( ) => {
        const doc = new jsPDF();

        const tableColumn = ["Id", "Brand and Model", "Status"];
        const tableRows= [];

        this.state.phones.map((e) => {
            const phoneData = [
                e.id,
                e.brandmodel,
                e.publishstatus
            ];
            tableRows.push(phoneData);
        });

        doc.autoTable(tableColumn, tableRows, {startY:20});

        const date = Date().split(" ");
        const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

        doc.text("All phones available",14,15);
        doc.save(`phone-report_${dateStr}.pdf`);
    }

    render() {
        return (
            <div>
                <NavigationBarDashboard/>
                <br/> <br/>
                <div className={'container-fluid d-grid gap-2'}>
                    <Button onClick={this.generatePdf} className={'btn btn-success btn-lg'}>
                        Generate Report on Phones
                    </Button>
                </div>
            </div>
        );
    }




}
export default PhonePdf;