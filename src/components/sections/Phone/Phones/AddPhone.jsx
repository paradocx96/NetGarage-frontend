import React from "react";
import PhoneService from "../../../../services/PhoneService";
import Toast1 from "../../../Toasts/Toast1";
import Toast2 from "../../../Toasts/Toast2";
import PhoneBrandService from "../../../../services/PhoneBrandService";
import PhoneChipsetService from "../../../../services/PhoneChipsetService";
import PhoneOSService from "../../../../services/PhoneOSService";
import {Card, Col, Form, Row, Button, Alert} from "react-bootstrap";
import NavigationBarDashboard from "../../../layouts/Navigation/NavigationBarDashboard";


class AddPhone extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state.showNotAvailable = false;

        this.onChange = this.onChange.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.submitPhone = this.submitPhone.bind(this);

    }
    initialState={
        //main
        brandmodel:'',
        brand:'',

        //network
        network:'',

        //body
        dimensions:'',
        weight:'',
        sim:'',

        //display
        displaytype:'',
        displaysize:'',
        displayresolution:'',
        displayprotection:'',

        //software
        os:'',
        softwarefeatures:'',

        //chipset
        chipset:'',

        //storage
        memorystorage:'',
        card:'',

        //main camera
        maincamera:'',
        maincameraDetails:'',
        maincameraVideo:'',
        maincameraFeatures:'',

        //selfie camera
        selfcamera:'',
        selfcameraDetails:'',
        selfcameraVideo:'',
        selfcameraFeatures:'',

        //audio
        loudspeaker:'',
        headphonejack:'',

        //connections
        wlan:'',
        bluetooth:'',
        gps:'',
        nfc:'',
        radio:'',

        //sensors
        sensors:'',

        //battery
        batterytype:'',
        charging:'',

        //miscellaneous
        colors:'',
        models:'',
        sar:'',

        isPhoneAvailable:'',

        brands:[],
        firstBrandId:'',
        firstBrandName:'',
        chipsets:[],
        firstChipsetId:'',
        firstChipsetName:'',
        oslist:[],
        firstOsId:'',
        fistOsName:''

    }

    componentDidMount  = async() => {
        //get all phone brands
        await PhoneBrandService.getAllBrandds()
            .then(response => response.data)
            .then((data) => {
                this.setState({brands:data});
                this.setState({firstBrandId:data[0].id});
                this.setState({firstBrandName:data[0].name});
                this.setState({brand:data[0].name});
            }).catch(error=>{
                console.log("Cannot get brands. Error : ",error);
            });

        //get all Oses
        await PhoneOSService.getAllOSes()
            .then(response => response.data)
            .then((data) => {
                this.setState({oslist:data});
                this.setState({firstOsId:data[0].id});
                this.setState({fistOsName:data[0].name});
                this.setState({os:data[0].name});
            }).catch(error=>{
                console.log("Cannot get Oses. Error : ",error);
            });

        //get all chipsets
        await PhoneChipsetService.getAllChipsets()
            .then(response => response.data)
            .then((data) => {
                this.setState({chipsets:data});
                this.setState({firstChipsetId:data[0].id});
                this.setState({firstChipsetName:data[0].brandmodel});
                this.setState({chipset:data[0].brandmodel});
            }).catch(error=>{
                console.log("Cannot get chipsets. Error : ",error);
            });
    }

    onChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    submitPhone = async(event) => {
        event.preventDefault();
        await this.checkPhoneAvailability();
        console.log("Availability : ", this.state.isPhoneAvailable );

        if (this.state.isPhoneAvailable == 'available'){
            let phone={
                brandmodel:this.state.brandmodel,
                brand:this.state.brand,

                //network
                network:this.state.network,

                //body
                dimensions:this.state.dimensions,
                weight:this.state.weight,
                sim:this.state.sim,

                //display
                displaytype:this.state.displaytype,
                displaysize:this.state.displaysize,
                displayresolution:this.state.displayresolution,
                displayprotection:this.state.displayprotection,

                //software
                os:this.state.os,
                softwarefeatures:this.state.softwarefeatures,

                //chipset
                chipset:this.state.chipset,

                //storage
                memorystorage:this.state.memorystorage,
                card:this.state.card,

                //main camera
                maincamera:this.state.maincamera,
                maincameraDetails:this.state.maincameraDetails,
                maincameraVideo:this.state.maincameraVideo,
                maincameraFeatures:this.state.maincameraFeatures,

                //selfie camera
                selfcamera:this.state.selfcamera,
                selfcameraDetails:this.state.selfcameraDetails,
                selfcameraVideo:this.state.selfcameraVideo,
                selfcameraFeatures:this.state.selfcameraFeatures,

                //audio
                loudspeaker:this.state.loudspeaker,
                headphonejack:this.state.headphonejack,

                //connections
                wlan:this.state.wlan,
                bluetooth:this.state.bluetooth,
                gps:this.state.gps,
                nfc:this.state.nfc,
                radio:this.state.radio,

                //sensors
                sensors:this.state.sensors,

                //battery
                batterytype:this.state.batterytype,
                charging:this.state.charging,

                //miscellaneous
                colors:this.state.colors,
                models:this.state.models,
                sar:this.state.sar
            }

            await PhoneService.addPhone(phone)
                .then(response => response.data)
                .then((data) => {
                    if(data != null){
                        console.log("Added phone with id : ", data.id);
                        this.setState({"show":true});
                        setTimeout(() => this.setState({"show":false}),3000);
                    }
                }).catch(error => {
                    console.log("Could not add phone. Error: ",error);
                });

            this.resetForm();
        }
        else if(this.state.isPhoneAvailable == 'notAvailable') {

            this.setState({"showNotAvailable":true});
            setTimeout(() => this.setState({"showNotAvailable":false}),3000);

        }
        else{
            console.log("Some other error");
        }
    }

    checkPhoneAvailability =async () => {
        await PhoneService.isPhoneAvailable(this.state.brandmodel)
            .then(response => response.data)
            .then((data) => {
                if(data == true){
                    this.setState({isPhoneAvailable: 'available'})
                }
                else {
                    this.setState({isPhoneAvailable: 'notAvailable'})
                }
            }).catch(error => {
                console.log("Error in getting availability. Error : ", error);
            })
    }

    resetForm =() => {
        this.setState( {brandmodel:''});
        this.setState( {brand:this.state.firstBrandName});

        //network
        this.setState( {network:''});

        //body
        this.setState( {dimensions:''});
        this.setState( {weight:''});
        this.setState( {sim:''});

        //display
        this.setState( {displaytype:''});
        this.setState( {displaysize:''});
        this.setState( {displayresolution:''});
        this.setState( {displayprotection:''});

        //software
        this.setState( {os:this.state.fistOsName});
        this.setState( {softwarefeatures:''});

        //chipset
        this.setState( {chipset:this.state.firstChipsetName});

        //storage
        this.setState( {memorystorage:''});
        this.setState( {card:''});

        //main camera
        this.setState( {maincamera:''});
        this.setState( {maincameraDetails:''});
        this.setState( {maincameraVideo:''});
        this.setState( {maincameraFeatures:''});

        this.setState( {selfcamera:''});
        this.setState( {selfcameraDetails:''});
        this.setState( {selfcameraVideo:''});
        this.setState( {selfcameraFeatures:''});

        //audio
        this.setState( {loudspeaker:''});
        this.setState( {headphonejack:''});

        //connection
        this.setState( {wlan:''});
        this.setState( {bluetooth:''});
        this.setState( {gps:''});
        this.setState( {nfc:''});
        this.setState( {radio:''});

        //sensors
        this.setState( {sensors:''});

        //battery
        this.setState( {batterytype:''});
        this.setState( {charging:''});

        //miscellaneous
        this.setState( {colors:''});
        this.setState( {models:''});
        this.setState( {sar:''});
    }

    render() {
        const {brandmodel, brand, network,
            dimensions, weight,sim,
            displaytype, displaysize, displayresolution, displayprotection,
            os, softwarefeatures,
            chipset,
            memorystorage,card,
            maincamera, maincameraDetails, maincameraVideo, maincameraFeatures,
            selfcamera, selfcameraDetails, selfcameraVideo, selfcameraFeatures,
            loudspeaker, headphonejack,
            wlan, bluetooth, gps, nfc, radio,
            sensors,
            batterytype, charging,
            colors,models,sar
        }
            =  this.state;
        return (
            <div>
                <NavigationBarDashboard />
            <div className={'container-fluid'}>
               {/* <div style={{"display": this.state.show ? "block" : "none"}}>

                    <Toast1

                        children={{
                            show: this.state.show,
                            message: "Phone added successfully",
                            type: 'success'
                        }}
                    />

                </div>

                <div style={{"display": this.state.showNotAvailable ? "block" : "none"}}>

                    <Toast2

                        children={{
                            show: this.state.showNotAvailable,
                            message: "Phone brand and model is already taken",
                            type: 'warning'
                        }}
                    />

                </div>*/}
                <h2>Add Phone</h2>
                <Form onReset={this.resetForm} onSubmit={this.submitPhone}>
                <Card className={'bg-transparent'}>
                    <Card.Header className={'bg-success text-white'}>Main Details</Card.Header>

                    <Card.Body>

                        <Form.Group>
                            <Form.Label>Brand and name</Form.Label>
                            <Form.Control
                                required
                                type={'text'}
                                placeholder={'Enter Brand and model'}
                                name={'brandmodel'}
                                value={brandmodel}
                                onChange={this.onChange}

                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                as={'select'}
                                required
                                name={'brand'}
                                value={brand}
                                onChange={this.onChange}>

                                {
                                    this.state.brands.length === 0?
                                        <option>No Brands !</option>:
                                        this.state.brands.map((e) => (
                                            <option value={e.name} datatype={'text'}>
                                                {e.name}
                                            </option>
                                        ))
                                }

                            </Form.Control>
                        </Form.Group>

                    </Card.Body>

                </Card>

                    <br/>

                    <Card className={'bg-transparent'}>
                        <Card.Header className={'bg-success text-white'}>Network</Card.Header>

                        <Card.Body>

                            <Form.Group>
                                <Form.Label>Network</Form.Label>
                                <Form.Control
                                    required
                                    type={'text'}
                                    placeholder={'Enter Network'}
                                    name={'network'}
                                    value={network}
                                    onChange={this.onChange}

                                />
                            </Form.Group>

                        </Card.Body>

                    </Card>

                    <br/>

                    <Card className={'bg-transparent'}>
                        <Card.Header className={'bg-success text-white'}>Body</Card.Header>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>Dimensions</Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'Enter Dimensions'}
                                    name={'dimensions'}
                                    value={dimensions}
                                    onChange={this.onChange}

                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Weight</Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'Enter Weight'}
                                    name={'weight'}
                                    value={weight}
                                    onChange={this.onChange}

                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>SIM</Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'Enter SIM'}
                                    name={'sim'}
                                    value={sim}
                                    onChange={this.onChange}

                                />
                            </Form.Group>
                        </Card.Body>
                    </Card>

                    <br/>
                    <Card className={'bg-transparent'}>
                        <Card.Header className={'bg-success text-white'}>Display</Card.Header>
                        <Card.Body>

                            <Form.Group>
                                <Form.Label>Display Type</Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'Enter display type'}
                                    name={'displaytype'}
                                    value={displaytype}
                                    onChange={this.onChange}

                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Display Size</Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'Enter display size'}
                                    name={'displaysize'}
                                    value={displaysize}
                                    onChange={this.onChange}

                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Display Resolution</Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'Enter display resolution'}
                                    name={'displayresolution'}
                                    value={displayresolution}
                                    onChange={this.onChange}

                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Display Protection</Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'Enter display protection'}
                                    name={'displayprotection'}
                                    value={displayprotection}
                                    onChange={this.onChange}

                                />
                            </Form.Group>

                        </Card.Body>
                    </Card>

                    <br/>
                    <Card className={'bg-transparent'}>

                        <Card.Header className={'bg-success text-white'}>Software</Card.Header>
                        <Card.Body>

                            <Form.Group>
                                <Form.Label>OS</Form.Label>
                                <Form.Control
                                    as={'select'}
                                    required
                                    name={'os'}
                                    value={os}
                                    onChange={this.onChange}>

                                    {
                                        this.state.oslist.length === 0?
                                            <option>No Oses !</option>:
                                            this.state.oslist.map((e) => (
                                                <option value={e.name} datatype={'text'}>
                                                    {e.name}
                                                </option>
                                            ))
                                    }

                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Software Features </Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'Enter software features'}
                                    name={'softwarefeatures'}
                                    value={softwarefeatures}
                                    onChange={this.onChange}

                                />
                            </Form.Group>

                        </Card.Body>

                    </Card>

                    <br/>

                    <Card className={'bg-transparent'}>
                        <Card.Header className={'bg-success text-white'}>Chipset</Card.Header>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>Chipset</Form.Label>
                                <Form.Control
                                    as={'select'}
                                    required
                                    name={'chipset'}
                                    value={chipset}
                                    onChange={this.onChange}>

                                    {
                                        this.state.chipsets.length === 0?
                                            <option>No Oses !</option>:
                                            this.state.chipsets.map((e) => (
                                                <option value={e.brandmodel} datatype={'text'}>
                                                    {e.brandmodel}
                                                </option>
                                            ))
                                    }

                                </Form.Control>
                            </Form.Group>
                        </Card.Body>
                    </Card>

                    <br/>

                    <Card className={'bg-transparent'}>
                        <Card.Header className={'bg-success text-white'}>Storage</Card.Header>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>Memory (RAM) and Storage</Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'Enter memory and storage'}
                                    name={'memorystorage'}
                                    value={memorystorage}
                                    onChange={this.onChange}

                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>SD card</Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'Enter SD card details'}
                                    name={'card'}
                                    value={card}
                                    onChange={this.onChange}

                                />
                            </Form.Group>
                        </Card.Body>
                    </Card>

                    <br/>
                    <Card className={'bg-transparent'}>
                        <Card.Header className={'bg-success text-white'}>Main Camera</Card.Header>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>Main Camera Type</Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'Enter Main Camera Type'}
                                    name={'maincamera'}
                                    value={maincamera}
                                    onChange={this.onChange}

                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Main Camera Details</Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'Enter Main Camera Details'}
                                    name={'maincameraDetails'}
                                    value={maincameraDetails}
                                    onChange={this.onChange}

                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Main Camera Video</Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'Enter Main Camera Video'}
                                    name={'maincameraVideo'}
                                    value={maincameraVideo}
                                    onChange={this.onChange}

                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Main Camera Features</Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'Enter Main Camera Features'}
                                    name={'maincameraFeatures'}
                                    value={maincameraFeatures}
                                    onChange={this.onChange}

                                />
                            </Form.Group>
                        </Card.Body>
                    </Card>

                    <br/>

                    <Card className={'bg-transparent'}>
                        <Card.Header className={'bg-success text-white'}>Selfie Camera</Card.Header>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>Selfie Camera Type</Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'Enter Selfie Camera Type'}
                                    name={'selfcamera'}
                                    value={selfcamera}
                                    onChange={this.onChange}

                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Selfie Camera Details</Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'Enter Selfie Camera Details'}
                                    name={'selfcameraDetails'}
                                    value={selfcameraDetails}
                                    onChange={this.onChange}

                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Selfie Camera Video</Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'Enter Selfie Camera Video'}
                                    name={'selfcameraVideo'}
                                    value={selfcameraVideo}
                                    onChange={this.onChange}

                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Selfie Camera Features</Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'Enter Selfie Camera Features'}
                                    name={'selfcameraFeatures'}
                                    value={selfcameraFeatures}
                                    onChange={this.onChange}

                                />
                            </Form.Group>
                        </Card.Body>
                    </Card>

                    <br/>
                    <Card className={'bg-transparent'}>
                        <Card.Header className={'bg-success text-white'}>Audio</Card.Header>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>Loudspeaker</Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'Enter Loudspeaker details'}
                                    name={'loudspeaker'}
                                    value={loudspeaker}
                                    onChange={this.onChange}

                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Headphone Jack</Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'Enter headphone jack details'}
                                    name={'headphonejack'}
                                    value={headphonejack}
                                    onChange={this.onChange}

                                />
                            </Form.Group>
                        </Card.Body>
                    </Card>

                    <br/>

                    <Card className={'bg-transparent'}>
                        <Card.Header className={'bg-success text-white'}>Communications</Card.Header>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>WLAN</Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'Enter WLAN details'}
                                    name={'wlan'}
                                    value={wlan}
                                    onChange={this.onChange}

                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Bluetooth</Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'Enter bluetooth details'}
                                    name={'bluetooth'}
                                    value={bluetooth}
                                    onChange={this.onChange}

                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>GPS</Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'Enter GPS details'}
                                    name={'gps'}
                                    value={gps}
                                    onChange={this.onChange}

                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>NFC</Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'Enter NFC details'}
                                    name={'nfc'}
                                    value={nfc}
                                    onChange={this.onChange}

                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Radio</Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'Enter radio details'}
                                    name={'radio'}
                                    value={radio}
                                    onChange={this.onChange}

                                />
                            </Form.Group>
                        </Card.Body>
                    </Card>

                    <br/>
                    <Card className={'bg-transparent'}>
                        <Card.Header className={'bg-success text-white'}>Sensors</Card.Header>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>Sensors</Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'Enter sensor details'}
                                    name={'sensors'}
                                    value={sensors}
                                    onChange={this.onChange}

                                />
                            </Form.Group>
                        </Card.Body>
                    </Card>

                    <br/>

                    <Card className={'bg-transparent'}>
                        <Card.Header className={'bg-success text-white'}>Battery</Card.Header>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>Battery</Form.Label>
                                <Form.Control
                                    type={'text'}
                                    placeholder={'Enter battery details'}
                                    name={'batterytype'}
                                    value={batterytype}
                                    onChange={this.onChange}

                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Charging</Form.Label>

                                <Form.Control

                                    type={'text'}
                                    placeholder={'Enter charging details'}
                                    name={'charging'}
                                    value={charging}
                                    onChange={this.onChange}

                                />
                            </Form.Group>
                        </Card.Body>

                    </Card>

                    <br/>
                    <Card className={'bg-transparent'}>
                        <Card.Header className={'bg-success text-white'}>Miscellaneous</Card.Header>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>Colors</Form.Label>

                                <Form.Control

                                    type={'text'}
                                    placeholder={'Enter color details'}
                                    name={'colors'}
                                    value={colors}
                                    onChange={this.onChange}

                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Models</Form.Label>

                                <Form.Control

                                    type={'text'}
                                    placeholder={'Enter model details'}
                                    name={'models'}
                                    value={models}
                                    onChange={this.onChange}

                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>SAR</Form.Label>

                                <Form.Control

                                    type={'text'}
                                    placeholder={'Enter SAR details'}
                                    name={'sar'}
                                    value={sar}
                                    onChange={this.onChange}

                                />
                            </Form.Group>
                        </Card.Body>
                    </Card>

                    <br/>

                    <div>
                        {
                            this.state.show === true?
                                <Alert  variant={'success'} dismissible={false}>
                                    <Alert.Heading>Success</Alert.Heading>
                                    <p>Successfully added phone</p>

                                </Alert>:
                                this.state.showNotAvailable === true?
                                    <Alert  variant={'warning'} dismissible={false}>
                                        <Alert.Heading>Warning</Alert.Heading>
                                        <p>Phone brand and model is already taken</p>

                                    </Alert> :
                                    <div></div>
                        }
                    </div>

                    <div>

                        <Row>
                            <Col>
                                <Button type={'reset'} className={'btn btn-warning'}>Clear</Button>
                            </Col>
                            <Col>
                                <Button type={'submit'} className={'btn btn-success'}>Submit</Button>
                            </Col>
                        </Row>




                    </div>

                    <br/>
                </Form>
            </div>
            </div>
        );
    }
}

export default AddPhone;