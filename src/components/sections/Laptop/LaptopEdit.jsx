import React, {Component} from 'react';

import ServiceLaptop from "../../../services/ServiceLaptop";

class LaptopEdit extends Component {

    // TODO: Initializing state values and functions
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            LaptopList: []
        }
    }

    componentDidMount = async () => {
        const {match: {params}} = this.props;
        this.setState({
            id: params.lid
        });

        await ServiceLaptop.getLaptopObjectById(params.lid)
            .then(response => response.data)
            .then((data) => {
                console.log(data);
                // this.setState({LaptopList: data});
            }).catch(error =>
                console.log(error.message)
            );
    }

    render() {
        return (
            <div>

                <h3>Edit Laptop</h3>

            </div>
        );
    }
}

export default LaptopEdit;