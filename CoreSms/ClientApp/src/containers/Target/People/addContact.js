import * as React from 'react';
import '../../../_assets/css/file.css';
import { Form } from "react-bootstrap";
import Select from 'react-select';
import axios from 'axios';

import { TOKEN } from '../../../_helpers/token';
import { baseURL } from '../../../_helpers';
import { Card, CardBody, Col, Button, ButtonToolbar } from 'reactstrap';
import { peopleView } from './peopleView';
import authService from '../../../components/api-authorization/AuthorizeService';
import { NavLink, Link } from 'react-router-dom';

export class addContact extends React.Component {

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
            branch_description: '',
            postal_address: '',
            role_id: '4',
            alert_color:'',
            isLoading: false,
            isShowError: false,
            entity_id: '',
            statusMessage: '',
            password: '',
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

    handleChangeRegion = (event) => {
        this.setState({ selectedRegion: event.target.value });
        //     this.setState({ region: '' });
        //     axios.get(baseURL + 'regions', { headers: { "Authorization": `Bearer ${window.user.token}` } }).then(
        //         res => {
        //             this.setState({ region: res.data })
        //         }
        //     )
        //   //  alert(event.target.value)
    };



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
                        window.location = "/main/dashboard"
                    }, 1000);

                } else {

                    this.setState({ statusMessage: "error", alert_color: "alert alert-danger", isShowError: true, isLoading: false });
                }

            }, error => {
                this.setState({ statusMessage: "error", isShowError: true, alert_color: "alert alert-danger", isLoading: false });
            });
    }

    Country() {

        return (this.state.entity && this.state.entity.length > 0 &&
            this.state.entity.map((countyItem, i) =>
                ({ label: countyItem.entity_name, value: countyItem.id })))

    }

    onSelectChange = value => {

        this.setState({ entity_id: value.value.toString() });
    };


    toSchoolList(e) {
        e.preventDefault();
        this.setState({ isLoading: true });
        setTimeout(function () {
            window.location = "/main/dashboard";
        }, 400);

    }
    handleChangeGender = (event) => {
        this.setState({ selectedGender: event.target.value });
        //alert(event.target.value)
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleChangeCountry = (event) => {
        this.setState({ selectedCountry: event.target.value });
        // this.setState({ country: '' });
        // axios.get(baseURL + 'countries/' + event.target.value, { headers: { "Authorization": `Bearer ${window.user.token}` } }).then(
        //     res => {
        //         this.setState({ country: res.data })
        //     }
        // )
    };

    handleChangeCounty = (event) => {
        this.setState({ selectedCounty: event.target.value });
    };



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

        return (
            <div className="pcoded-main-container">

                {/* {showComponent && (
                    <div>

                        {this.state.showComponent ?
                            <peopleView /> : null
                        }

                    </div>
                )} */}

                {!hideComponent && (
                    <>


                        <Col md={12} lg={12}>
                            <Card>
                                <CardBody><br />
                                    <Link to="/viewContact">
                                        <Button className="pull-right"
                                            color="primary"
                                            onClick={this._onButtonClick} outline> View Contacts </Button>
                                    </Link>
                                    <div className="card__title">
                                        <h5 className="bold-text">Fill the Below Fields to Add a Contact</h5>
                                    </div>

                                    {this.state.showError ? <div style={{ color: this.state.alert_color }}>
                                        {this.state.statusMessage}

                                    </div> : null}<br></br>


                                    {this.state.isShowError ? (
                                        <div
                                            color="success"
                                            style={{ fontSize: "13px", color: "green" }}>
                                            {this.state.statusMessage}
                                        </div>

                                    ) : null}<br></br>
                                    <form className="form" onSubmit={this.onSubmit}>


                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">First Name</label>
                                                <input id="input" type="text" className="form-control input-md"
                                                    name="branch_name" required placeholder="Enter Group Name"
                                                    value={this.state.branch_name} onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Middle Name</label>
                                                <input id="input" type="text" className="form-control input-md"
                                                    name="branch_description"  placeholder="Enter Middle Name"
                                                    value={this.state.branch_description}
                                                    onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Last Name</label>
                                                <input id="input" type="text" className="form-control input-md"
                                                    name="postal_address" required placeholder="Enter Last Name"
                                                    value={this.state.postal_address}
                                                    onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Phone</label>
                                                <input id="input" type="text" className="form-control"
                                                    name="onSelectChange" required placeholder="Enter Phone Number"
                                                    value={this.state.onSelectChange}
                                                    onChange={this.handleChange} />
                                            </div>
                                        </div>




                                        <div className="col-md-12">
                                            <Button type="submit" color="primary" className="btn-paypal btn-lg pull-right
                                                                 text-white " >
                                                {this.state.isLoading ? "Please Wait..." : "Submit"}  <i className="fa fa-refresh"></i></Button> &nbsp;&nbsp;&nbsp;
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
