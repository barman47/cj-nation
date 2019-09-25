import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import M from 'materialize-css';

import Posts from './posts/Posts';

import { getPosts } from '../actions/postActions';

class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            posts: []
        };

        this.props.getPosts();
    }

    componentDidMount () {
        const elems = document.querySelectorAll('.slider');
        // eslint-disable-next-line
        const instances = M.Slider.init(elems, { height: 500 });

        const elems2 = document.querySelectorAll('.materialboxed');
        // eslint-disable-next-line
        const instances2 = M.Materialbox.init(elems2, {});
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.posts.posts.length > 0) {
            return {
                posts: nextProps.posts.posts,
                loading: nextProps.posts.loading
            };
        }
        return null;
    }

    render () {
        return (
            <Fragment>
                <Helmet><title>Home - CJ Nation</title></Helmet>
                <main className="home-content">
                    <div className="banner">
                        
                    </div>
                    <div className="welcome-text">
                        <h3>Welcome to CJ Nation Entertainment</h3>
                        <h6>Subheading Lorem ipsum dolor sit amet.</h6>
                    </div>
                    <div className="row">
                        <h4 style={{ color: '#ee6e73', textAlign: 'center' }}>Recent Stories</h4>
                        <Posts 
                            posts={this.state.posts}
                        />
                    </div>
                </main>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    admin: state.props,
    posts: state.posts
});

Home.propTypes = {
    getPosts: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getPosts })(Home);