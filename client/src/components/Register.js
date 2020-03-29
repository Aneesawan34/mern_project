import React, { Component } from "react";
import { register } from "./userFunctions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const user = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    };
    register(user).then(res => {
      this.props.history.push("/login");
    });
  }
  render() {
    return (
      <div className="row">
        <form className="row" noValidate onSubmit={this.onSubmit}>
          <div className="row">
            <div className="input-field col s3">
              <input
                name="first_name"
                type="text"
                value={this.state.first_name}
                onChange={this.onChange}
              />
              <label>First Name</label>
            </div>
            <div className="input-field col s3">
              <input
                name="last_name"
                type="text"
                value={this.state.last_name}
                onChange={this.onChange}
              />
              <label>Last Name</label>
            </div>
            <div className="input-field col s3">
              <input
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.onChange}
              />
              <label>Email</label>
            </div>
            <div className="input-field col s3">
              <input
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
              />
              <label>Password</label>
            </div>
          </div>
          <button className="btn waves-effect waves-light" type="submit">
            Sign in
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
