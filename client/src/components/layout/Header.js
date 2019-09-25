import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component{ 
    componentDidMount () {
        const sidenavElem = document.querySelectorAll('.sidenav');
        // eslint-disable-next-line
        const sidenavInstance = M.Sidenav.init(sidenavElem, {});
    }

    render () {
        return (
            <header>
                <nav>
                    <div className="nav-wrapper">
                        <Link to="#" className="brand-logo">Logo</Link>
                        <Link to="#" data-target="mobile-menu" className="sidenav-trigger"><span id="menu-icon" className="mdi mdi-menu"></span></Link>
                        <ul className="right hide-on-med-and-down">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/posts">Posts</Link></li>
                            <li><Link to="/posts/music">Music</Link></li>
                            <li><Link to="/posts/videos">Videos</Link></li>
                            {(this.props.auth.authenticated) ? null : <li><Link to="/admin">Admin</Link></li>}
                            {(this.props.auth.authenticated) ? <li><Link to="/dashboard">Dashboard</Link></li> : null}
                            {(this.props.auth.authenticated) ? <li><Link to="/admin">Logout</Link></li> : null}
                            {(this.props.auth.authenticated) ? <li><Link to="/admin/allPosts">All Posts</Link></li> : null}
                        </ul>
                    </div>
                </nav>
                <ul id="mobile-menu" className="sidenav">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/posts">Posts</Link></li>
                    <li><Link to="/posts/music">Music</Link></li>
                    <li><Link to="/posts/videos">Videos</Link></li>
                    {(this.props.auth.authenticated) ? null : <li><Link to="/admin">Admin</Link></li>}
                    {(this.props.auth.authenticated) ? <li><Link to="/dashboard">Dashboard</Link></li> : null}
                    {(this.props.auth.authenticated) ? <li><Link to="/admin">Logout</Link></li> : null}
                    {(this.props.auth.authenticated) ? <li><Link to="/admin/allPosts">All Posts</Link></li> : null}
                </ul>
            </header>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Header);