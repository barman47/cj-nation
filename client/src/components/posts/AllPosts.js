import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import Posts from './Posts';

import { getAllPosts } from '../../actions/postActions';

class AllPosts extends Component {
    constructor (props) {
        super(props);
        this.state = {
            posts: [],
            loading: true,
        };

        this.props.getAllPosts();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.posts.posts) {
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
                <Helmet><title>All Posts - CJ Nation</title></Helmet>
                <main className="home-content">
                    <h4 className="center">All Stories</h4>
                    <div className="row">
                        <Posts 
                            posts={this.state.posts}
                        />
                    </div>
                </main>
            </Fragment>
        );
    }
}

AllPosts.propTypes = {
    getAllPosts: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    posts: state.posts
});

export default connect(mapStateToProps, { getAllPosts })(AllPosts);