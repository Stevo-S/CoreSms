import React, { Fragment } from 'react';
import ReactDatatable from '@ashvin27/react-datatable';
import { CircleLoading } from 'react-loadingg'

import axios from 'axios';
import { Card, CardBody, Col, Button } from 'reactstrap';
import { baseURL } from '../../../_helpers';
import { TOKEN } from '../../../_helpers/token';
import { BranchCreate } from './branchCreate';
import Pagination from '../../../shared/components/pagination/Pagination';
import DataPaginationTable from '../../../shared/components/table/DataPaginationTable';




export class BranchView extends React.Component {


    constructor(props) {
        super(props);
        this.submitNewUpdate = this.submitNewUpdate.bind(this);
        this._onButtonClic = this._onButtonClic.bind(this);

        const myNewTheme = {
            rows: {
                fontSize: '25px'
            }
        }

        this._onButtonClick = this._onButtonClick.bind(this);
        this.columns = [{
            key: "idx",
            text: "#",
            TrOnlyClassName: 'tsc',
            className: "tsc",
            align: "left",

        },
        {
            key: "branch_name",
            text: "Branch Name",
            TrOnlyClassName: 'tsc',

            className: "tsc",
            align: "left",
        },
        {
            key: "branch_type",
            TrOnlyClassName: 'tsc',
            text: "Branch Name",
            className: "tsc",
            align: "left"
        },

        {
            key: "entity_name",
            TrOnlyClassName: 'tsc',
            text: "Entity Name",
            className: "tsc",
            align: "left"
        },
        {
            key: "entity_level",
            TrOnlyClassName: 'tsc',
            text: "Entity Level",
            className: "tsc",
            align: "left"
        },
        {
            key: "branch_description",
            TrOnlyClassName: 'tsc',
            text: "Branch Description",
            className: "tsc",
        },
        {
            key: "iddsx",
            text: "Status",
            TrOnlyClassName: "tsc",
            className: "tsc",
            align: "left"
        },
        {
            key: "action",
            text: "Options",
            TrOnlyClassName: 'cell',
            className: "cell",
            width: 250,
            sortable: false,
            cell: record => {
                return (


                    <Fragment className="center" >
                        {/* <button
                            className=" btn-success"
                            style={{ marginRight: '10px' }}
                            onClick={() => this.viewRecord(record)}>
                            <span className="fa fa-edit dt-icon-btn">View</span>
                        </button> */}
                        <button title="Edit Details"
                            className=" btn-primary"
                            style={
                                { marginRight: '10px' }}
                            onClick={
                                () => this.editRecord(record)} >
                            <span className="fa fa-edit dt-icon-btn" > Edit </span>
                        </button>
                        <button className=" btn-danger"
                            title="Delete details"
                            style={
                                { marginRight: '10px' }}
                            onClick={(e) => {
                                if
                                    (window.confirm('Are you sure you wish to delete this record?')) this.deleteRecord(record)
                            }}
                        >
                            <span className="fa fa-trash dt-icon-btn" > Delete </span>
                        </button>
                    </Fragment>
                );
            }
        }
        ];
        this.config = {
            key_column: "tsc",
            length_menu: [10, 20, 50],
            show_filter: true,
            show_pagination: true,
            pagination: 'basic',
            page_size: 10,
            show_length_menu: false,
            length_menu: [5, 6, 8],
            language: {
                loading_text: "Please be patient while data loads..."
            }

        }




        this.state = {
            admins: [],
            isLoading: true,
            showModal: false,
            showError: false,
            isShowError: false,
            showComponent: false,
            hideComponent: false,
            first_name: '',
            last_name: '',
            selectedRegion: 'Select Region Name',
            email_address: '',
            msisdn: '',
            gender: [{
                name: 'Male'
            }, {
                name: 'Female'
            }],
            id_number: '',
            admin: '',
            region: [],
            entity: [],
            data: [],
        };
    }

    componentDidMount() {
        // if (window.user.data.user.role_id == "1") {
        axios.all([
            axios.get(baseURL + "branches", { headers: { "Authorization": `Bearer ` + TOKEN } }),
            axios.get(baseURL + "entities", { headers: { "Authorization": `Bearer ` + TOKEN } }),
        ]).then(axios.spread((branchResponse, entityResponse) => {
            this.setState({
                admins: branchResponse.data,
                entity: entityResponse.data,
                isLoading: false
            },
                function () {
                    console.log("bug", entityResponse.data);
                    var data = [];
                    var index_counter = this.state.admins.length;

                    for (let i = 0; i < this.state.admins.length; i++) {
                        var entiy_id = this.state.admins[i].entity_id;

                        let mstatus = this.state.admins[i].status;

                        let mstatuss

                        if (mstatus === "1") {
                            mstatuss = "active"

                        } else if (mstatus === "0") {
                            mstatuss = "inactive"

                        }


                        for (let k = 0; k < this.state.entity.length; k++) {

                            if (entiy_id === this.state.entity[k].id) {
                                let index = { idx: i + 1 };
                                let statuss = { iddsx: mstatuss }

                                data.push(Object.assign(index, statuss, this.state.entity[k], this.state.admins[i]));

                                this.setState({
                                    data: data
                                })
                                console.log("bugs", i);
                            }
                        }
                    }
                    index_counter--;
                }
            );
        }))
        // }
        // if (window.user.data.user.role_id == "2") {
        //     axios.all([
        //         axios.get(baseURL + "branches", { headers: { "Authorization": `Bearer ${window.user.data.access_token}` } }),
        //         axios.get(baseURL + "regions?id=" + window.user.data.user.region_id, { headers: { "Authorization": `Bearer ${window.user.data.access_token}` } }),
        //         axios.get(baseURL + "entities", { headers: { "Authorization": `Bearer ${window.user.data.access_token}` } }),
        //     ]).then(axios.spread((branchResponse, regionResponse, entityResponse) => {
        //         this.setState(
        //             {
        //                 admins: branchResponse.data,
        //                 region: regionResponse.data,
        //                 entity: entityResponse.data,
        //                 isLoading: false
        //             },
        //             function () {
        //                 console.log("bug", entityResponse.data);
        //                 var data = [];
        //                 for (let i = 0; i < this.state.admins.length; i++) {
        //                     //alert(this.state.users[i].id);
        //                     var user_id = this.state.admins[i].region_id;

        //                     console.log("teachers", user_id);
        //                     for (let j = 0; j < this.state.region.length; j++) {

        //                         console.log("EVANS", this.state.region[j].id);

        //                         if (user_id === this.state.region[j].id) {


        //                             var entiy_id = this.state.admins[i].entity_id;

        //                             for (let k = 0; k < this.state.entity.length; k++) {

        //                                 if (entiy_id === this.state.entity[k].id) {

        //                                     data.push(Object.assign(this.state.entity[k], this.state.region[j], this.state.admins[i]))

        //                                     this.setState({
        //                                         data: data
        //                                     })

        //                                     console.log("EVANS", data);
        //                                 }

        //                             }
        //                         }


        //                     }
        //                 }
        //             }
        //         );
        //     }))
        // }

    }





    editRecord(record) {
        console.log("Edit Record", record);
        this.setState({
            showModal: true,
            hideComponent: true,

            branch_name: record.branch_name,
            branch_description: record.branch_description,
            email_address: record.email_address,
            selectedRegion: record.region_name,
            admin: record.id,
            msisdn: record.msisdn,
            id_number: record.id_number,

            password: record.password,
        })

    }


    submitNewUpdate(e) {
        e.preventDefault();
        const userInputData = {
            "branch_name": this.state.branch_name,
            "branch_description": this.state.branch_description,
        }
        console.log("reecrd", userInputData);
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + TOKEN
            }
        };
        console.log("DATA", this.state.admin);
        this.setState({ isLoading: true })

        axios.put(baseURL + "branches/" + this.state.admin, userInputData, config).then(response => {
            if (response.data.status) {
                this.setState({ statusMessage: response.data.status_message, isShowError: true, isLoading: false });
            } else {
                this.setState({ statusMessage: response.data.status_message, showError: true, isShowError: false, isLoading: false });
            }
        }, error => {
            this.setState({ statusMessage: JSON.stringify(error), isShowError: false, showError: true, isLoading: false });
        });
        this.setState({ school_name: '', school_code: '', postal_address: '' })

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    deleteRecord(record) {
        console.log("Delete Record", record);

        this.setState({
            school_id: record.id,
        });
        const config = {
            headers: {
                "Authorization": `Bearer `+TOKEN
            }
        };
        axios.delete(baseURL + "branches/" + record.id, config).then(response => {

            if (response.data.status) {
                this.setState({ statusMessage: response.data.status_message, isShowError: true, isLoading: false });
                window.setTimeout(function () {
                    window.location.reload();
                }, 1000);

            } else {

                this.setState({ statusMessage: response.data.status_message, isShowError: true, isLoading: false });
            }

        }, error => {
            this.setState({ statusMessage: JSON.stringify(error), isShowError: true, isLoading: false });
        });
    }




    _onButtonClick() {
        this.setState({
            showComponent: true,
            hideComponent: true,
            showModal: false,

        });
    }
    _onButtonClic() {
        this.setState({
            hideComponent: false,
            showModal: false,
            isShowError: false

        }, function () {
            window.location.reload();

        });


    }

    render() {
        const { showComponent } = this.state;
        const { hideComponent } = this.state;
        const { isLoading } = this.state;
        const { showModal } = this.state;
        // console.log("Load", isLoading);


        return (

            <div style={
                { marginTop: '25px' }} > {
                    showComponent && (
                        <div >

                            {
                                this.state.showComponent ?
                                    < BranchCreate /> : null
                            }
                        </div>
                    )
                } {!hideComponent && (
                    < >

                        < Col md={12} lg={12} >
                            < Card >
                                <CardBody >


                                    <div className="panel-body" >
                                        <Button className="pull-right"
                                            color="primary"
                                            onClick={this._onButtonClick} outline> Add Branch </Button><br /> <br /><br />
                                        {this.state.isShowError ?
                                            <div className="alert alert-success" > {this.state.statusMessage}
                                            </div> : null
                                        }
                                        < ReactDatatable config={this.config}
                                            records={this.state.data}
                                            id="tsc"
                                            columns={this.columns}
                                            loading={this.state.isLoading}
                                            extraButtons={this.extraButtons}
                                        /> </div>
                                </CardBody>

                            </Card>
                        </Col>
                    </>
                )
                }

                {showModal && (
                    <Col md={12} lg={12}>
                        <Card>
                            <CardBody><br />
                                <Button className="pull-right" color="primary" onClick={this._onButtonClic} outline> List of Branches</Button>

                                <div className="card__title">
                                    <h5 className="bold-text">Fill the Below Fields to Edit a Branch</h5>
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
                                <form className="form" onSubmit={this.submitNewUpdate} >

                                    <div className="col-md-6" >
                                        <div className="form-group" >
                                            <label className="form-label" > Branch Name </label>

                                            < input id="input"
                                                type="text"
                                                className="form-control input-md"
                                                name="branch_name"
                                                required placeholder="Enter Branch Name"
                                                value={this.state.branch_name}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6" >
                                        <div className="form-group" >
                                            <label className="form-label" > Branch Description </label>
                                            <input id="input"
                                                type="text"
                                                className="form-control"
                                                name="branch_description"
                                                required placeholder="Enter Branch Description"
                                                value={this.state.branch_description}
                                                onChange={this.handleChange}
                                            />

                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <Button type="submit" color="primary" className="btn-paypal btn-lg pull-right
                                                                 text-white " >
                                            {this.state.isLoading ? "Please Wait..." : "Submit"}  <i className="fa fa-refresh"></i>
                                        </Button> &nbsp;&nbsp;&nbsp;
                                </div>

                                </form>

                            </CardBody>
                        </Card>
                    </Col>

                )}
            </div>

        )
    }
}