import React, {Component} from 'react';

class LaptopHomepageSingleView extends Component {

    // TODO: Initializing state values and functions
    constructor(props) {
        super(props);
        this.state = {
            id: ''
        }
    }

    componentDidMount = async () => {
        const {match: {params}} = this.props;
        this.setState({
            id: params.id
        });
    }

    render() {
        return (
            <div>
                <h1>Laptop Single View</h1>

                <h2>Laptop ID : {this.state.id || 'Not Found'}</h2>
            </div>
        );
    }
}

export default LaptopHomepageSingleView;