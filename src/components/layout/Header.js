import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    render() {
        const {isAuthenticated, user} = this.props;
        const authLinks = (
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item">
                    <button className="nav-link btn btn-info btn-sm text-light">Logout</button>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>

            </ul>
        );

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
                <div className="container">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <a className="navbar-brand" href="#">Blog</a>
                    { isAuthenticated? authLinks : guestLinks}
                </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    user: state.authReducer.user,
    isAuthenticated: state.authReducer.isAuthenticated
});


export default connect(mapStateToProps)(Header);
