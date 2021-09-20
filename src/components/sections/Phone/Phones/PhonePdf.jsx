import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import NavigationBarDashboard from "../../../layouts/Navigation/NavigationBarDashboard";
import {Button} from "react-bootstrap";
import PhoneService from "../../../../services/PhoneService";
import PhoneChipsetService from "../../../../services/PhoneChipsetService";
import data from "bootstrap/js/src/dom/data";
import PhoneBrandService from "../../../../services/PhoneBrandService";
import PhoneOSService from "../../../../services/PhoneOSService";
import CommonCheckAuth from "../../../../services/CommonCheckAuth";

class PhonePdf extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;

        this.generatePdfPhones = this.generatePdfPhones.bind(this);
        this.generatePdfBrands = this.generatePdfBrands.bind(this);
        this.generatePdfChipsets = this.generatePdfChipsets.bind(this);
        this.generatePdfOS = this.generatePdfOS.bind(this);

    }
    initialState= {
        phones:[],
        chipsets:[],
        brands:[],
        os:[]
    }

    componentDidMount() {
        PhoneService.getAllPhones()
            .then(response => response.data)
            .then((data) => {
                this.setState({phones:data});
            }).catch(error => {
                console.log("Cannot get all phones. Error : ",error);
        });

        PhoneChipsetService.getAllChipsets()
            .then(response => response.data)
            .then((data) => {
                this.setState({chipsets: data});
            }).catch(error => {
                console.log("Cannot get all chipsets. Error: ",error);
        });

        PhoneBrandService.getAllBrandds()
            .then(response => response.data)
            .then((data) => {
                this.setState({brands: data});
            }).catch(error => {
            console.log("Cannot get all brands. Error: ",error);
        });

        PhoneOSService.getAllOSes()
            .then(response => response.data)
            .then((data) => {
                this.setState({os:data});
            }).catch(error => {
            console.log("Cannot get all OSes. Error: ",error);
        });


    }

    generatePdfPhones =( ) => {
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

    generatePdfBrands = () => {
        const doc = new jsPDF();

        const tableColumn = ["Id", "Brand"];
        const tableRows= [];

        this.state.brands.map((e) => {
            const brandData =[
                e.id,
                e.name
            ];
            tableRows.push(brandData);
        });

        doc.autoTable(tableColumn, tableRows, {startY:20});

        const date = Date().split(" ");
        const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

        doc.text("All Brands available",14,15);
        doc.save(`phone-brand-report_${dateStr}.pdf`);
    }

    generatePdfChipsets = () => {
        const doc = new jsPDF();

        const tableColumn = ["Id", "Brand and Model", "CPU", "GPU", "Lithography"];
        const tableRows= [];

        this.state.chipsets.map((e) => {
            const chipsetData =[
                e.id,
                e.brandmodel,
                e.cpu,
                e.gpu,
                e.lithography
            ];
            tableRows.push(chipsetData);
        });

        doc.autoTable(tableColumn, tableRows, {startY:20});

        const date = Date().split(" ");
        const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

        doc.text("All Chipsets available",14,15);
        doc.save(`phone-chipset-report_${dateStr}.pdf`);
    }

    generatePdfOS = () => {
        const doc = new jsPDF();

        const tableColumn = ["Id", "OS"];
        const tableRows= [];

        this.state.os.map((e) => {
            const osData =[
                e.id,
                e.name
            ];
            tableRows.push(osData);
        });

        doc.autoTable(tableColumn, tableRows, {startY:20});

        const date = Date().split(" ");
        const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

        doc.text("All OS available",14,15);
        doc.save(`phone-os-report_${dateStr}.pdf`);
    }

    render() {
        return (
            <div>
                <NavigationBarDashboard/>
                <br/> <br/>
                <div className={'container-fluid d-grid gap-2'}>
                    <Button onClick={this.generatePdfPhones} className={'btn btn-success btn-lg'}>
                        Generate Report on Phones
                    </Button>
                    <Button onClick={this.generatePdfBrands} className={'btn btn-primary btn-lg'}>
                        Generate Report on Brands
                    </Button>
                    <Button onClick={this.generatePdfChipsets} className={'btn btn-info btn-lg'}>
                        Generate Report on Chipsets
                    </Button>
                    <Button onClick={this.generatePdfOS} className={'btn btn-secondary btn-lg'}>
                        Generate Report on OS
                    </Button>
                </div>
            </div>
        );
    }




}
export default CommonCheckAuth(PhonePdf);