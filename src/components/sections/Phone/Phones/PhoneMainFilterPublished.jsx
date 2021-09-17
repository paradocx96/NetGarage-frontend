import React from "react";
import {Form} from "react-bootstrap";
import PhoneBrandFilterPublished from "./PhoneBrandFilterPublished";
import PhoneOsFilterPublished from "./PhoneOsFilterPublished";
import PhoneChipsetFilterPublished from "./PhoneChipsetFilterPublished";



class PhoneMainFilterPublished extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;

        this.onChange = this.onChange.bind(this);

    }
    initialState={
        filterOption:'brand'
    }

    onChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    render() {
        return (
            <div className={'container-fluid'}>


                <h2>Filter Phones</h2>
                <Form >
                    <Form.Group>
                        <Form.Label>Filter By</Form.Label>

                        <Form.Control
                            as={"select"}
                            required
                            name={'filterOption'}
                            value={this.state.filterOption}
                            onChange={this.onChange}
                        >
                            <option value={'brand'}>Brand</option>
                            <option value={'os'}>OS</option>
                            <option value={'chipset'}>Chipset</option>
                        </Form.Control>
                    </Form.Group>
                </Form>

                <div>
                    {
                        this.state.filterOption === 'brand'?
                            <PhoneBrandFilterPublished />:
                            this.state.filterOption === 'os'?
                                <PhoneOsFilterPublished /> :
                                <PhoneChipsetFilterPublished />
                    }
                </div>
            </div>
        );
    }


}
export default PhoneMainFilterPublished;