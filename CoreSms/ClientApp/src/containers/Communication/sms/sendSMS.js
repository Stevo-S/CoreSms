import * as React from 'react';
import '../../../_assets/css/file.css';
import { Form } from "react-bootstrap";
import Select from 'react-select';
import axios from 'axios';
import { TOKEN } from '../../../_helpers/token';
import { baseURL } from '../../../_helpers';
import { Card, CardBody, Col, Button, ButtonToolbar } from 'reactstrap';
import authService from '../../../components/api-authorization/AuthorizeService';
import { NavLink, Link } from 'react-router-dom';
import MultiSelect from "react-multi-select-component";

import { textInputs } from 'polished';
import $ from 'jquery'
import jQuery from 'jquery';

window.$ = window.jQuery = require('jquery')



// require("http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js")

require('../../../_assets/jss/sms_counter.js')

export class sendSMS extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showComponent: false,
            hideComponent: true,
        };
        this._onButtonClick = this._onButtonClick.bind(this);
        this.changeStatus = this.changeStatus.bind(this);


        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            gender: [{
                name: 'Male'
            }, {
                name: 'Female'
            }],
            type: [{
                name: 'boarding'
            }, {
                name: 'day'
            }],
            selectedGender: '',
            branch_name: '',
            value: '',

            branch_description: '',
            postal_address: '',
            role_id: '4',
            alert_color: '',
            isLoading: false,
            isShowError: false,
            entity_id: '',
            name: '',
            statusMessage: '',
            setSelected: [],
         
            entity_count: '',
            countryList: [],
            regionsList: [],
            countiesList: [],
            showError: false,

            entity_id: '',
            selectedCountry: 'Select Country Name',
            selectedRegion: 'Select Region Name',
            selectedCounty: 'Select County/State Name',
        }
    }
    componentDidMount() {
        $('#message').countSms('#sms-counter');
    }
    onSubmit(e) {
        e.preventDefault();
        this.populateWeatherData()
    }
    async populateWeatherData() {
        let formData = {
            "firstName": this.state.branch_name,
            "lastName": this.state.postal_address,
            "middleName": this.state.branch_description,
            "phoneNumber": this.state.onSelectChange,

        }
        console.log("DATA", JSON.stringify(formData))
        this.setState({ isLoading: true });
        const token = await authService.getAccessToken();
        axios.post('api/Contacts', formData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
            .then((response) => {
                console.log('bayoo', response.status)
                if (response.status = 201) {
                    this.setState({ statusMessage: "Contact Created Successfully", isShowError: true, alert_color: "alert alert-success", isLoading: false });
                    window.setTimeout(function () {
                        window.location.reload();
                    }, 1000);

                } else {

                    this.setState({ statusMessage: "error", alert_color: "alert alert-danger", isShowError: true, isLoading: false });
                }

            }, error => {
                this.setState({ statusMessage: "error", isShowError: true, alert_color: "alert alert-danger", isLoading: false });
            });
    }

    Constituency() {
        return (this.state.type && (this.state.type.length == 0 || this.state.type.length > 0) &&
            this.state.type.map((countyItem, i) =>
                ({ label: countyItem.name, value: countyItem.id })))
    }


    onSelectChangeConstitueny = value => {
        this.setState({ constituency_id: value.value.toString() });
    };

    onSelectChange = value => {

        this.setState({ entity_id: value.value.toString() });
    };


    handleChangeGender = (event) => {
        this.setState({ selectedGender: event.target.value });
        //alert(event.target.value)
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }




    _onButtonClick() {

    }
    changeStatus() {
        this.setState({
            isShowError: false


        });
    }


    render() {
        const { showComponent } = this.state;
        const { hideComponent } = this.state;
        const { selected, setSelected } = this.state;

        return (
            <div className="pcoded-main-container">

                {!hideComponent && (
                    <>
                        <Col className="col-md-8 offset-md-2">
                            <Card>
                                <CardBody><br />
                                    <form onSubmit={this.onSubmit}>
                                        <div className="form-group">
                                            <Form.Group controlId="first-row" className="Focus-line">
                                                <h4>House</h4>

                                                <pre>{JSON.stringify(selected)}</pre>
                                                <MultiSelect
                                                    options={this.Constituency()}
                                                    placeholder="Select House"
                                                    onSelectedChanged={setSelected}
                                                    tabSelectsValue={false}
                                                    className='drop'
                                                />
                                            </Form.Group>
                                        </div><br />


                                        <div className="form-group">
                                            <label className="form-label">First Name</label>
                                            <input id="input" type="text" className="form-control input-md"
                                                name="branch_name" required placeholder="Enter Group Name"
                                                value={this.state.branch_name} onChange={this.handleChange} />
                                        </div><br></br>
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <textarea name="message" className="col-md-12" placeholder="type your message here"
                                                        id="message" cols="col-md-1" rows="20"></textarea>
                                                </div>
                                                <div className="col-md-4">
                                                    <ul id="sms-counter">
                                                        <li>Length: <span class="length"></span></li>
                                                        <li>SMS: <span class="messages"></span></li>
                                                        <li>Per Message: <span class="per_message"></span></li>
                                                        <li>Remaining: <span class="remaining"></span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div><br />
                                        <div className="col-md-12">
                                            <Button type="submit" color="primary" className="btn-paypal btn-lg pull-right
                                                                 text-white " >
                                                {this.state.isLoading ? "Please Wait..." : "Send "}  <i className="fa fa-refresh"></i></Button> &nbsp;&nbsp;&nbsp;
                                       </div>
                                    </form>

                                </CardBody>
                            </Card>
                        </Col>
                    </>

                )
                }

            </div>
        )

    }


}
