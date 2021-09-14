import React from "react";
import PhoneService from "../../../../services/PhoneService";
import Toast1 from "../../../Toasts/Toast1";
import Toast2 from "../../../Toasts/Toast2";

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

        isPhoneAvailable:''

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
        this.setState( {brand:''});

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
        this.setState( {os:''});
        this.setState( {softwarefeatures:''});

        //chipset
        this.setState( {chipset:''});

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
        const {brandmodel, brand, network, dimensions, weight} =  this.state;
        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>

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

                </div>
            </div>
        );
    }
}