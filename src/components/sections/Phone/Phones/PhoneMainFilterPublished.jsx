import React from "react";
import {Form} from "react-bootstrap";
import PhoneBrandFilterPublished from "./PhoneBrandFilterPublished";
import PhoneOsFilterPublished from "./PhoneOsFilterPublished";
import PhoneChipsetFilterPublished from "./PhoneChipsetFilterPublished";
import SearchPhones from "./SearchPhones";



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


                <h2>Find Phones</h2>
                <Form >
                    <Form.Group>


                        <Form.Control
                            as={"select"}
                            required
                            name={'filterOption'}
                            value={this.state.filterOption}
                            onChange={this.onChange}
                        >
                            <option value={'brand'}>Filter By Brand</option>
                            <option value={'os'}>Filter By OS</option>
                            <option value={'chipset'}>Filter By Chipset</option>
                            <option value={'search'}>Search Phones</option>
                        </Form.Control>
                    </Form.Group>
                </Form>

                <div>
                    {
                        this.state.filterOption === 'brand'?
                            <PhoneBrandFilterPublished />:
                            this.state.filterOption === 'os'?
                                <PhoneOsFilterPublished /> :
                                this.state.filterOption === 'search'?
                                    <SearchPhones />:
                                <PhoneChipsetFilterPublished />
                    }
                </div>
            </div>
        );
    }


}
export default PhoneMainFilterPublished;