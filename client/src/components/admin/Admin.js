import React, { Component, Fragment } from 'react';
import M from 'materialize-css';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { clearErrors, loginAdmin } from '../../actions/authActions';

import isEmpty from '../../validation/is-empty';

class Admin extends Component {
    constructor (props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {}
        };
    }

    componentDidMount () {
        // eslint-disable-next-line
        const instance = M.Tabs.init(document.querySelector('.tabs'), {});

        if (this.props.auth.authenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillUnmount () {
        this.setState({
            username: '',
            password: '',
            errors: {},
        }, () => {
            this.props.clearErrors();
        });
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

        if (isEmpty(nextProps.errors) && nextProps.auth.authenticated) {
            this.props.history.push('/dashboard');
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const admin = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.loginAdmin(admin, this.props.history);
    };

    render () {
        const { errors } = this.state;
        return (
            <Fragment>
                <Helmet><title>Admin - CJ Nation</title></Helmet>
                <h1 className="center">Admin Page</h1>
                <div className="row" style={{ width: '40%' }}>
                    <div className="col s12">
                        <ul className="tabs">
                            <li className="tab col s12 m6 l6"><a className="active" href="#login">Login</a></li>
                            <li className="tab col s12 m6 l6"><a href="#register">Sign Up</a></li>
                        </ul>
                    </div>
                    <div id="login" className="col s12">
                        <form id="loginForm" onSubmit={this.handleSubmit}>
                            <h5 className="center">Admin Login</h5>
                            <div className="s12 input-field validate">
                                <input type="text"
                                    className={classnames('validate', { 'invalid': errors.username })}
                                    id="username"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onChange}
                                />
                                {errors.username && <span className="helper-text invalid-text">{errors.username}</span>}
                                <label htmlFor="username">Username</label>
                            </div>
                            <div className="s12 input-field">
                                <input type="password"
                                    className={classnames('validate', { 'invalid': errors.password })}
                                    id="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                                {errors.password && <span className="helper-text invalid-text">{errors.password}</span>}
                                <label htmlFor="password">Password</label>
                            </div>
                            <div className="s12 input-field">
                                <button className="btn grey">Login</button>
                            </div>
                        </form>
                    </div>
                    <div id="register" className="col s12">Test 2</div>
                </div>
            </Fragment>
        );
    }
}

Admin.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    loginAdmin: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { clearErrors, loginAdmin })(withRouter(Admin));