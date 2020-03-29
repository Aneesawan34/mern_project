import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Navbar extends Component {
  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push("/");
  }
  render() {
    const loginRegLink = (
      <ul className="right">
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    );

    const userLink = (
      <ul className="right">
        <li>
          <Link to="/profile">User</Link>
        </li>
        <li>
          <a href="" onClick={this.logOut.bind(this)}>
            Logout
          </a>
        </li>
      </ul>
    );
    return (
      <nav>
        <div className="nav-wrapper">
          <ul className="left">
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
          {localStorage.usertoken ? userLink : loginRegLink}
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
