import React, { Fragment } from 'react';
import ReactDatatable from '@ashvin27/react-datatable';
import axios from 'axios';
import ReactLoading from 'react-loading';

import { Card, CardBody, Col, Button } from 'reactstrap';
import { baseURL } from '../../../_helpers';
import { TOKEN } from '../../../_helpers/token';
import Pagination from '../../../shared/components/pagination/Pagination';
import DataPaginationTable from '../../../shared/components/table/DataPaginationTable';
import { peopleCreate } from './peopleCreate';
import authService from '../../../components/api-authorization/AuthorizeService';
import { FetchData } from '../../../components/FetchData';

export class peopleView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };

        const myNewTheme = {
            rows: {
                fontSize: '25px'
            }
        }
        this.columns = [ {
            key: "date",
            text: "Date",
            TrOnlyClassName: 'tsc',

            className: "tsc",
            align: "left",
        },
        {
            key: "temperatureC",
            TrOnlyClassName: 'tsc',
            text: "Temp. (C)",
            className: "tsc",
            align: "left"
        },
        {
            key: "temperatureF",
            TrOnlyClassName: 'tsc',
            text: "Temp. (F)",
            className: "tsc",
            align: "left"
        },
        {
            key: "summary",
            TrOnlyClassName: 'tsc',
            text: "Summary",
            className: "tsc",
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
            
        }




        this.state = {
            admins: [],
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
        this.populateWeatherData();
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
    // static renderForecastsTable(forecasts) {
    //     return (
    //         < >
               
    //         </>
    //       );
    // }

    render() {
      
        return (
            <div>
                <h1 id="tabelLabel" >Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                < Col md={12} lg={12} >
                    < Card >
                        <CardBody >
                            <div className="panel-body" >
                                <div className="row">
                                    <div className="col-md-6">
                                        <Button className="pull-right"
                                            color="primary"
                                            onClick={this._onButtonClick} outline> Add Person </Button><br /> <br /><br />
                                    </div>

                                    <div className="col-md-6">
                                        <h4>BAYO</h4>
                                    </div>
                                </div>
                                {this.state.isShowError ?
                                    <div className="alert alert-success" > {this.state.statusMessage}
                                    </div> : null
                                }
                                < ReactDatatable config={this.config}
                                    records={this.state.forecasts}
                                    id="tsc"
                                    columns={this.columns}
                                    loading={this.state.isLoading}
                                    extraButtons={this.extraButtons}
                                /> </div>
                        </CardBody>

                    </Card>
                </Col>            </div>
        );
    }

    async populateWeatherData() {

        const token = await authService.getAccessToken();
        const response = await fetch('weatherforecast', {
          headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
      
    
        const data = await response.json();
        this.setState({ forecasts: data, loading: false }, function(){
            console.log("token", this.state.forecasts);
        });
    }

}