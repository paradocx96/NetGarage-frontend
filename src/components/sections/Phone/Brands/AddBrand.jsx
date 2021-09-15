import React from "react";

class AddBrand extends React.Component{

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.submitBrand = this.submitBrand.bind(this);

    }
    initialState={
        brand:'',
        isBrandAvailable:''
    }

    onChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    submitBrand = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <div>

            </div>
        );
    }


}

export default AddBrand;