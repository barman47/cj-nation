import React, { Component } from 'react';
import PostItem from './PostItem';
import PropTypes from 'prop-types';

class Posts extends Component {
  render() {
    return this.props.posts.map((post) => (
        <PostItem key={post._id} post={post} title={post.title} url={post.url} text={post.text} date={post.date} />
    ));
  }
}

Posts.propTypes = {
    title: PropTypes.string,
    file: PropTypes.string,
    date: PropTypes.string,
    text: PropTypes.string
};

export default Posts;