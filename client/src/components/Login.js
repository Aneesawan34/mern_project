import React, { Component } from "react";
import { login } from "./userFunctions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
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
      email: this.state.email,
      password: this.state.password
    };
    login(user).then(res => {
      if (res) {
        this.props.history.push("/profile");
      }
    });
  }
  render() {
    return (
      <div className="row">
        <form className="col s12" noValidate onSubmit={this.onSubmit}>
          <div className="row">
            <div className="input-field col s6">
              <input
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.onChange}
              />
              <label>Email</label>
            </div>
            <div className="input-field col s6">
              <input
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
              />
              <label>Password</label>
            </div>
            <button className="btn waves-effect waves-light" type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
