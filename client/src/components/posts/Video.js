import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Comment from '../input-group/Comment';

import { getVideo, postVideoComment } from '../../actions/postActions';

class Video extends Component {
    constructor (props) {
        super(props);
        this.state = {
            video: {},
            comment: '',
            comments: [],
            errors: {}
        };
    }

    componentDidMount () {
        this.props.getVideo(this.props.match.params.videoURL);
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        if (nextProps.posts.video) {
            console.log(nextProps);
            this.setState({
                video: nextProps.posts.video,
                loading: false
            });
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const comment = {
            text: this.state.comment,
            user: 'Anonymous'
        };
        this.props.postVideoComment(this.state.video._id, comment);
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render () {
        const { comment, errors, video } = this.state;
        let comments, date;
        if (video) {
            date = new moment(video.date).format('MMMM Do, YYYY');
            if (video.comments) {
                let commentDate = new moment().format('MMM Do YY');
                comments = video.comments.map(comment => {
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
                <Helmet><title>{video.title ? video.title : ''} - CJ Nation</title></Helmet>
                <div className="container post-feed">
                    <h5>Posted on {date}</h5>
                    <h4 className="center post-title">{video.title}</h4>
                    {video ? <video autoPlay controls src={`/uploads/${video.url}`}></video> : null}
                    <p>{video.text}</p>
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
                            <button className="btn teal" type="submit">Add Comment</button>
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

Video.propTypes = {
    getVideo: PropTypes.func.isRequired,
    postVideoComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    posts: state.posts,
    errors: state.errors
});

export default connect(mapStateToProps, { getVideo, postVideoComment })(Video);