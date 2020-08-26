import React, { useState } from 'react';
import { baseURL, currentUserSubject } from '../../../_helpers';
import axios from 'axios';
import { Form, Field, FormControl } from 'react-bootstrap';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { Alert, Button } from 'reactstrap';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import EyeIcon from 'mdi-react/EyeIcon';
import { Dot } from "react-animated-dots";
import { NavLink } from 'react-router-dom';
import renderCheckBoxField from '../../../shared/components/form/CheckBox';


class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      email_address: "",
      password: "",
      showPassword: false,
      setShowPassword: false,
      channel_type: "portal",
      error: "",
      errorMsg: "",
      role: "",

      id: "",
      user: [],
      statusMessage: "",
      isShowSuccess: false,
      submitted: false,
      alert_error_color: "",
      isLoggedIn: false,
      isChecked: false,
      errorShow: false,
      successShow: false,
      statis: []
    };

  }

  handleChangeEmail = event => {
    this.setState({ email_address: event.target.value });
  };
  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  };


  showPasswordToggle = () => {
    const { showPassword } = this.state;

    if (this.state.showPassword == true) {
      this.setState({
        showPassword: false,
      })
     } else {
      this.setState({
        showPassword: true,
      })
    }
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    if (this.state.email_address === "" || this.state.password === "") {
      this.setState({
        isLoading: false,
        error: "Email Address and password is required",
        errorShow: true,
        submitted: true,

        alert_error_color: "alert alert-danger"
      });
    } else {
      let formData = {
        "email_address": this.state.email_address,
        "password": this.state.password,
        "channel_type": 'web'
      }
      console.log("DATA", formData)
      this.setState({ isLoading: true });
      axios.post(baseURL + 'login/', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      })
        .then((response) => {
          console.log("token",JSON.stringify( response.data));
         
          if (response.data.status) {
            currentUserSubject.next(response.data);
            window.user = response.data;
            this.setState({
              statusMessage: "Login Success! Redirecting....",
              isShowError: true,
              errorShow: false,
              submitted: true,
              isLoggedIn: true
            });
            if (response.data.data.user.role_id == "1") {
              window.setTimeout(function () {
                window.location.href = "/dashboard_default";
                this.setState({ isLoading: false });
              }, 2000);

            } else {
              window.setTimeout(function () {
                window.location.href = "/dashboard";
                this.setState({ isLoading: false });
              }, 2000);
            }


          } else {
            window.location.href = "/dashboard_default";
            console.log("bayoo", response.data)
            this.setState({
              alert_error_color: "alert alert-danger",
              errorShow: true,
              error: "Wrong Email or Password",
              submitted: true,
              isLoading: false

            }, function () {
              console.log('data', response.data.status)
            });
          }
        }).catch(error => {
          window.location.href = "/dashboard_default";
          console.log('bayoo', error.response)
          this.setState({
            alert_error_color: "alert alert-danger",
            errorShow: true,
            error: "Wrong Email or Password",
            submitted: true,
            isLoading: false
          }
            , function () {
              // console.log('data', error.response.status_message)
            });
        });
      this.setState({ password: "", email_address: "" });
    }
  };




  componentDidMount() {
    this.setState({ isChecked: true });
    axios.get('http://www.geoplugin.net/json.gp').then(res => {
      this.setState({ statusMessage: res.data.status_message, isShowError: false, isLoading: false });
      this.setState({
        students: res.data,
        isLoading: false,

      },
        function () {
          console.log("data", res.data);
        });
    });
  }

  render() {
    const { email_address, password, submitted, error } = this.state;
    const { showPassword } = this.state;

    const { errorShow } = this.state;

    return (
      <div className="account account--not-photo">
        <div className="account__wrapper">

          <div className="account__card">

            <div className="account__head">
              <h3 className="account__title">Welcome to
              <span className="account__logo"> Core
                <span className="account__logo-accent">SMS</span>
                </span>
              </h3>
              <h4 className="account__subhead subhead">Quality service is paramount </h4>
            </div>

            <Form className="form login-form" onSubmit={this.onSubmit}>
              {submitted ? (
                <>
                  {errorShow && (
                    <div>
                      {this.state.errorShow ? (
                        <div
                        >
                          <p
                            style={{ textAlign: "left", marginLeft: "20px" }}
                          >
                            {error}{" "}
                            {this.state.isLoggedIn ? (
                              <span>
                                <Dot>.</Dot>
                                <Dot>.</Dot>
                                <Dot>.</Dot>
                              </span>
                            ) : null}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  )}
                  {this.state.isShowError ? (
                    <div
                      color="primary"
                      style={{ fontSize: "13px", color: "green" }}>
                      {this.state.statusMessage}
                    </div>
                  ) : null}
                </>
              ) : null}
              <div className="form__form-group">
                <span className="form__form-group-label">Email Address</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <AccountOutlineIcon />
                  </div>
                  <Form.Control
                    autoFocus
                    type="email"
                    name="email_address"
                    placeholder="Email Address"
                    className="input-without-border-radius"
                    value={this.state.email_address}
                    onChange={this.handleChangeEmail}
                  />

                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Password</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <KeyVariantIcon />
                  </div>
                  <Form.Control
                    value={this.state.password}
                    placeholder="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className="input-without-border-radius"
                    onChange={this.handleChangePassword}
                  />
                  <button
                    type="button"

                    className={`form__form-group-button${showPassword ? 'active' : ''}`}
                    onClick={this.showPasswordToggle}
                  ><EyeIcon />
                  </button>
                  <div className="account__forgot-password">
                    <NavLink to="/reset_password">Forgot a password?</NavLink>
                  </div>
                </div>
              </div>
              <div className="form__form-group">
                <div className="form__form-group form__form-group-field">

                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                  </div>
                </div>
              </div> <br /><br />
              <div className="account__btns">
                {
                  <Button className="account__btn" type='submit' outline color="primary"> {
                    this.state.isLoading ? "Please wait..." : "Sign In"
                  }</Button>

                }
              </div>
            </Form>

          </div>
        </div>
      </div>
    );
  }
}

export default LogIn;
