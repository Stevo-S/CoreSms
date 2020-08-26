import * as React from 'react';
import '../../../_assets/css/file.css';
import { Form } from "react-bootstrap";
import Select from 'react-select';
import axios from 'axios';

import { BranchView } from "./branchView.js";
import { TOKEN } from '../../../_helpers/token';
import { baseURL } from '../../../_helpers';
import { Card, CardBody, Col, Button, ButtonToolbar } from 'reactstrap';

export class BranchCreate extends React.Component {

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


        let formData = {
            "branch_name": this.state.branch_name,
            "branch_description": this.state.branch_description,
            'region_id': this.state.selectedRegion,
            'branch_type': this.state.selectedGender,
            'county_code': this.state.selectedCounty,
            'entity_id': this.state.entity_id,
            'postal_address': this.state.postal_address
        }
        console.log("DATA", JSON.stringify(formData))
        this.setState({ isLoading: true });

        axios.post(baseURL + 'branches', formData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + TOKEN
            },
        })
            .then((response) => {

                if (response.data.status) {
                    this.setState({
                        statusMessage: response.data.status_message,
                        isShowError: true, isLoading: false, showError: false, 
                    });

                } else {

                    this.setState({ statusMessage: response.data.status_message, showError: true, isShowError: false, isLoading: false });
                }
            })
            .catch((error) => {
                console.log('bayoo', error.response)
                this.setState({ statusMessage: error.response.data.status_message, showError: true, isShowError: false, isLoading: false });
            })
    }

    async componentDidMount() {
        const [
            countyResponse, entityResponse, regionResponse] = await Promise.all([
                // axios.get(baseURL + 'users/1', { headers: { "Authorization": `Bearer ${window.user.data.access_token}` } }),
                axios.get(baseURL + 'counties', { headers: { "Authorization": `Bearer ` + TOKEN } }),
                axios.get(baseURL + "entities", { headers: { "Authorization": `Bearer ` + TOKEN } }),
                axios.get(baseURL + 'regions', { headers: { "Authorization": `Bearer ` + TOKEN } }),

            ]);

        this.setState({
            isLoading: false,
            county: countyResponse.data,
            entity: entityResponse.data,
            region: regionResponse.data,

        },
            function () {
                //console.log("admin", countryResponse.data.data);
            });
        //  console.log("Base", countyResponse.data );
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
        this.setState({
            showComponent: true,
            hideComponent: true,


        });


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

                {showComponent && (
                    <div>

                        {this.state.showComponent ?
                            <BranchView /> : null
                        }

                    </div>
                )}

                {!hideComponent && (
                    <>


                        <Col md={12} lg={12}>
                            <Card>
                                <CardBody><br />
                                    <Button className="pull-right" color="primary" outline  onClick={this._onButtonClick}> List of Branches</Button>

                                    <div className="card__title">
                                        <h5 className="bold-text">Fill the Below Fields to Add a Branch</h5>
                                    </div>

                                    {this.state.showError ? <div style={{ color: 'red' }}>
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
                                                <label className="form-label">Branch Name</label>
                                                <input id="input" type="text" className="form-control input-md"
                                                    name="branch_name" required placeholder="Enter Branch Name"
                                                    value={this.state.branch_name} onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Branch Description</label>
                                                <input id="input" type="text" className="form-control"
                                                    name="branch_description" required placeholder="Enter Branch Description"
                                                    value={this.state.branch_description} onChange={this.handleChange} />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <Form.Group controlId="first-row" className="Focus-line">
                                                    <Form.Label>Branch Type</Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        className="form-control input-md"
                                                        placeholder="Select Level"
                                                        id="county_name"

                                                        value={this.state.selectedGender}
                                                        onChange={this.handleChangeGender}
                                                        option={this.selectedGender}>
                                                        <option>Branch Type</option>
                                                        {
                                                            this.state.type && this.state.type.length > 0
                                                            && this.state.type.map((genderItem, i) =>
                                                                <option key={i} value={genderItem.name}>{genderItem.name}

                                                                </option>)
                                                        }
                                                    </Form.Control>
                                                </Form.Group>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <Form.Group className="Focus-line" >
                                                <Form.Label>County/States</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    className="form-control input-md"
                                                    placeholder="Select County Name"
                                                    value={this.state.selectedCounty}
                                                    onChange={this.handleChangeCounty}
                                                    id="county_name"
                                                    option={this.selectedCounty}>
                                                    <option>--Select County/State--</option>

                                                    {
                                                        this.state.county && this.state.county.length > 0 &&
                                                        this.state.county.map((countyItem, i) =>
                                                            <option key={i}
                                                                value={countyItem.county_code}>{countyItem.county_name}</option>)
                                                    }
                                                </Form.Control>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-6">
                                            <Form.Group className="Focus-line" >
                                                <Form.Label>Region</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    className="form-control input-md"
                                                    placeholder="Select Region Name"
                                                    value={this.state.selectedRegion}
                                                    onChange={this.handleChangeRegion}
                                                    id="county_name"
                                                    option={this.selectedRegion}>
                                                    <option>--Select Region--</option>

                                                    {
                                                        this.state.region && this.state.region.length > 0 &&
                                                        this.state.region.map((regionItem, i) =>
                                                            <option key={i}
                                                                value={regionItem.id}>{regionItem.region_name}</option>)
                                                    }
                                                </Form.Control>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Postal Address</label>
                                                <input id="input" type="text" className="form-control" name="postal_address"
                                                    required placeholder="Enter Postal Address"
                                                    value={this.state.postal_address}
                                                    onChange={this.handleChange} />
                                            </div>
                                        </div>


                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Entity</label>
                                                <Select

                                                    options={this.Country()}
                                                    onChange={this.onSelectChange}
                                                    placeholder="Select Entity"
                                                    tabSelectsValue={false}
                                                    value={this.state.onSelectChange}
                                                    className='drop'

                                                />
                                                <br />
                                            </div>



                                        </div><br />
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
