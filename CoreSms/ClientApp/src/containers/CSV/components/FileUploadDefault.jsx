import React from 'react';
import {
  Card, CardBody, Col, Button, ButtonToolbar,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import PropTypes, { func } from 'prop-types';
import "../../../_assets/css/csv.css";
import axios from 'axios';

import { withTranslation } from 'react-i18next';
import renderDropZoneField from '../../../shared/components/form/DropZone';
import { TOKEN } from '../../../_helpers/token';
import { baseURL } from '../../../_helpers';
import authService from '../../../components/api-authorization/AuthorizeService';

const handleChangeCSV = event => {
  console.log("FETCHER", event.target.files);
  this.setState({
    csvfile: event.target.files[0]
  });
};


class FileUploadDefault extends React.Component {
  constructor(props) {
    super(props)


    this.updateData = this.updateData.bind(this)

    this.state = {
      isLoading: false,
      showError: false,
      isShowError: false,

    };
  }

  importCSV = event => {
    event.preventDefault();
    this.setState({ loading: true });
    console.log("fileformat", this.state.csvfile)
    var data = new FormData();
    data.append("file", this.state.csvfile);
    this.setState({ isLoading: true });
    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(this.state.csvfile, {
      header: true,
      download: true,
      skipEmptyLines: true,
      // Here this is also available. So we can call our custom class method
      complete: this.updateData
    });

  }
  async updateData(result) {
    const data = result.data;

    const token = await authService.getAccessToken();
    axios.post('api/ContactList', data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    }).then((response) => {
      console.log("data", token)

      if (response.status) {
        this.setState({ statusMessage: "Success", isShowError: true, loading: false, isLoading: false },
          function () {
            console.log("bayo")
          }

        );
      } else {
        this.setState({ statusMessage: "error", isShowError: false, showError: true, loading: false, isLoading: false },
          function () {
            console.log("bayoddd")
          }

        );
      }

    }).catch((error) => {
      console.log('bayoo', error.response)
      this.setState({ isShowError: false, loading: false, statusMessage:"error", showError: true, isLoading: false },
        function () {
          console.log("bayyyo")
        }
      );
    })
  }


  handleChangeCSV = event => {
    console.log("FETCHER", event.target.files);
    this.setState({
      csvfile: event.target.files[0]
    });
  };
  render() {
    return (
      <Col md={12} lg={12}>
        <Card className="card--not-full-height">
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">File Upload</h5>
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
            <div className="wrapper text-center">
              <div className="section1">
                <div className="contain">
                  <br /><br />
                  <input
                    className="csv-input"
                    type="file"
                    required
                    ref={input => {
                      this.filesInput = input;
                    }}
                    name="file"
                    customHeight
                    placeholder={null}
                    onChange={this.handleChangeCSV}
                  />
                  <p />
                  <Button color="primary" outline className="btn-paypal btn-lg " onClick={this.importCSV} >
                    {this.state.isLoading ? "Uploading..." : "Import now!"}  <i className="fa fa-refresh"></i></Button> &nbsp;&nbsp;&nbsp;

                  <br /><b />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    )
  }
}

FileUploadDefault.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'file_upload_default', // a unique identifier for this form
})(withTranslation('common')(FileUploadDefault));
