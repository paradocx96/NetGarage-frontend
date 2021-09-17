import React from "react";
import PhoneService from "../../../../services/PhoneService";
import PhoneBrandService from "../../../../services/PhoneBrandService";
import PhoneChipsetService from "../../../../services/PhoneChipsetService";
import PhoneOSService from "../../../../services/PhoneOSService";
import Toast1 from "../../../Toasts/Toast1";
import Toast2 from "../../../Toasts/Toast2";
import {Button, Card, Form} from "react-bootstrap";

class EditPhone extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state.showNotAvailable = false;

        this.updatePhone = this.updatePhone.bind(this);
        this.onChange = this.onChange.bind(this);
        this.checkPhoneAvailability = this.checkPhoneAvailability.bind(this);

    }
    initialState={
        id:'',
        //main
        brandmodel:'',
        brand:'',
        image:'',
        publishstatus:'',

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

        currentBrandModel:'',
        currentBrand:'',
        currentOs:'',
        currentChipset:'',

        isPhoneAvailable:'',

        brands:[],
        firstBrandId:'',
        firstBrandName:'',
        chipsets:[],
        firstChipsetId:'',
        firstChipsetName:'',
        oslist:[],
        firstOsId:'',
        fistOsName:'',


    }

    componentDidMount= async () => {
        let id = this.props.match.params.id;
        console.log("Recieved ID : ",id);
        this.setState({id: id});

        await PhoneService.getPhoneById(id)
            .then(response => response.data)
            .then((data) => {
                this.setState({id:data.id});
                console.log("Phone received. Name : ", data.brandmodel);
                this.setState({brandmodel:data.brandmodel});
                this.setState({currentBrandModel:data.brandmodel});
                this.setState({brand:data.brand});
                this.setState({currentBrand:data.brand});
                this.setState({image:data.image});
                this.setState({publishstatus:data.publishstatus});

                //network
                this.setState({network:data.network});

                //body
                this.setState({dimensions:data.dimensions});
                this.setState({weight:data.weight});
                this.setState({sim:data.sim});

                //display
                this.setState({displaytype:data.displaytype});
                this.setState({displaysize:data.displaysize});
                this.setState({displayresolution:data.displayresolution});
                this.setState({displayprotection:data.displayprotection});

                //software
                this.setState({os:data.os});
                this.setState({currentOs:data.os});
                this.setState({softwarefeatures:data.softwarefeatures});

                //chipset
                this.setState({chipset:data.chipset});
                this.setState({currentChipset:data.chipset});

                //memory and storage
                this.setState({memorystorage:data.memorystorage});
                this.setState({card:data.card});

                //main camera
                this.setState({maincamera:data.maincamera});
                this.setState({maincameraDetails:data.maincameraDetails});
                this.setState({maincameraVideo:data.maincameraVideo});
                this.setState({maincameraFeatures:data.maincameraFeatures});

                //selfie camera
                this.setState({selfcamera:data.selfcamera});
                this.setState({selfcameraDetails:data.selfcameraDetails});
                this.setState({selfcameraVideo:data.selfcameraVideo});
                this.setState({selfcameraFeatures:data.selfcameraFeatures});

                //audio
                this.setState({loudspeaker:data.loudspeaker});
                this.setState({headphonejack:data.headphonejack});

                //communication
                this.setState({wlan:data.wlan});
                this.setState({bluetooth:data.bluetooth});
                this.setState({gps:data.gps});
                this.setState({nfc:data.nfc});
                this.setState({radio:data.radio});

                //sensors
                this.setState({sensors:data.sensors});

                //battery
                this.setState({batterytype:data.batterytype});
                this.setState({charging:data.charging});

                //miscellaneous
                this.setState({colors:data.colors});
                this.setState({models:data.models});
                this.setState({sar:data.sar});

            }).catch(error => {
                console.log("Cannot get phone attributes. Error : ",error);
            });

        PhoneBrandService.getAllBrandds()
            .then(response => response.data)
            .then((data) => {
                this.setState({brands: data});
            }).catch(error => {
                console.log("Cannot get brands. Error : ",error);
        });

        PhoneOSService.getAllOSes()
            .then(response => response.data)
            .then((data) => {
                console.log("OS : name : ",data[0].name);
                this.setState({oslist:data})

            }).catch(error => {
            console.log("Cannot get Oses. Error : ",error);
        });


        PhoneChipsetService.getAllChipsets()
            .then(response => response.data)
            .then((data) => {
                this.setState({chipsets:data})
            }).catch(error => {
            console.log("Cannot get chipsets. Error : ",error);
        });

    }

    onChange = async (event) => {
        //console.log("Event name : " ,event.target.name);
        this.setState({[event.target.name] : event.target.value});
    }

    updatePhone = async (event) => {
        event.preventDefault();
        await this.checkPhoneAvailability();

        if (this.state.isPhoneAvailable == 'available'){

            let phone={
                id:this.state.id,
                brandmodel:this.state.brandmodel,
                brand:this.state.brand,
                image:this.state.image,
                publishstatus: this.state.publishstatus,

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

            PhoneService.updatePhone(phone)
                .then(response => response.data)
                .then((data) => {
                    if(data != null){
                        console.log("Updated phone with id : ", data.id);
                        this.setState({"show":true});
                        setTimeout(() => this.setState({"show":false}),3000);
                    }
                }).catch(error => {
                console.log("Could not update phone. Error: ",error);
            });

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
                    this.setState({isPhoneAvailable: 'available'});
                }
                else if(this.state.brandmodel == this.state.currentBrandModel){
                    this.setState({isPhoneAvailable: 'available'});
                }
                else {
                    this.setState({isPhoneAvailable: 'notAvailable'});
                }
            }).catch(error => {
                console.log("Error in getting availability. Error : ", error);
            })
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
            <div className={'container-fluid'}>
                <div style={{"display": this.state.show ? "block" : "none"}}>

                    <Toast1

                        children={{
                            show: this.state.show,
                            message: "Phone Updated successfully",
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

                </div>

                <h2>Update Phone</h2>
                <Form onSubmit={this.updatePhone}>

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
                                    defaultValue={brandmodel}
                                    onChange={this.onChange}

                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Brand</Form.Label> <br/>
                                <Card.Text>Current Value : {this.state.currentBrand}</Card.Text>

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
                                    type={'text'}
                                    placeholder={'Enter Network'}
                                    name={'network'}
                                    defaultValue={network}
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
                                <Card.Text>Current OS: {this.state.currentOs}</Card.Text>
                                <Form.Control
                                    as={'select'}
                                    required
                                    name={'os'}
                                    defaultValue={os}
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
                                <Card.Text>Current Value : {this.state.currentChipset}</Card.Text>
                                <Form.Control
                                    as={'select'}
                                    required
                                    name={'chipset'}
                                    defaultValue={chipset}
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

                    <Button type={'submit'} className={'btn btn-success'}>Save Changes</Button>

                </Form>

                <br/>
            </div>
        );
    }

}

export default EditPhone;