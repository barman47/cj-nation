import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import PropTypes from 'prop-types';

import Comment from '../input-group/Comment';
import { postComment } from '../../actions/postActions';

import isEmpty from '../../validation/is-empty';

class Post extends Component {
    constructor (props) {
        super(props);
        this.state = {
            post: {},
            errors: {},
            comment: '',
            loading: true
        };
    }

    componentDidMount () {
        window.onbeforeunload = (e) => {
            e.preventDefault();
            this.props.history.push('/');
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!isEmpty(nextProps.posts.post)) {
            return {
                post: nextProps.posts.post,
                loading: nextProps.posts.loading
            };
        }
        return null;
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const comment = {
            text: this.state.comment,
            user: 'Anonymous'
        };
        this.props.postComment(this.state.post.id, comment);
    };

    render () {
        const { comment, errors, post } = this.state;
        let comments, date;
        if (post) {
            date = new moment(post.date).format('MMMM Do, YYYY');
            if (post.comments) {
                let commentDate = new moment().format('MMM Do YY');
                comments = post.comments.map(comment => {
                    return (
                        <li className="comment" key={comment._id}>
                            <span className="mdi mdi-account"></span>&nbsp;&nbsp;
                            {comment.user}:&nbsp;
                            {comment.text}<br />
                            {commentDate}
                        </li>
                    );
                });
            }
        }
        return (
            <Fragment>
                <Helmet><title>{post.title ? post.title : ''} - CJ Nation</title></Helmet>
                <div className="container post-feed">
                    <h5>Posted on {date}</h5>
                    <h4 className="center">{post.title}</h4>
                    {post.mimeType === 'audio/mp3' ? <audio autoPlay controls src={`/uploads/${post.url}`}></audio> : null}
                        {post.mimeType === 'video/mp4' ? <video autoPlay controls src={`/uploads/${post.url}`}></video> : null}
                        {post.mimeType === 'image/jpeg' ? <img className="post-image materialboxed responsive-img" src={`/uploads/${post.url}`} alt=""/> : null}
                        {post.mimeType === 'image/png' ? <img className="post-image materialboxed responsive-img" src={`/uploads/${post.url}`} alt=""/> : null}
                        {post.mimeType === 'image/gif' ? <img className="post-image materialboxed responsive-img" src={`/uploads/${post.url}`} alt=""/> : null } 
                            
                        {!post.mimeType === 'audio/mp3' ||
                            !post.mimeType === 'image/jpeg' ||
                            !post.mimeType === 'image/png' ||
                            !post.mimeType === 'image/gif' ||
                            !post.mimeType === 'audio/mp3'
                            ? <a href={`/uploads/${post.url}`} target="_blank" rel="noopener noreferrer">Download File</a>
                            : null
                        }
                    {/* <img className="post-image responsive-img" src={`data:${post.mimeType};base64,${base64ArrayBuffer(post.data)}`} alt={post.title}/> */}
                    <p>{post.text}</p>
                    <form id="comment-form" onSubmit={this.handleSubmit}>
                        <div className="input-field">
                            <Comment 
                                id="comment"
                                name="comment"
                                placeholder="Comment here . . ."
                                errorMessage={errors.comment}
                                onChange={this.onChange}
                                value={comment}
                            />
                            <button type="submit">Add Comment</button>
                        </div>
                    </form>
                    <ul>
                        {comments}
                    </ul>
                </div>
            </Fragment>
        );
    }
}

Post.propTypes = {
    postComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    posts: state.posts,
    errors: state.errors
});

export default connect(mapStateToProps, { postComment })(Post);