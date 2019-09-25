import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Comment from '../input-group/Comment';

import { getMusic, postAudioComment } from '../../actions/postActions';

class Music extends Component {
    constructor (props) {
        super(props);
        this.state = {
            music: {},
            comment: '',
            comments: [],
            errors: {}
        };
    }

    componentDidMount () {
        this.props.getMusic(this.props.match.params.musicURL);
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        if (nextProps.posts.music) {
            console.log('next props', nextProps);
            this.setState({
                music: nextProps.posts.music,
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
        this.props.postAudioComment(this.state.music._id, comment);
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render () {
        const { comment, errors, music } = this.state;
        let comments, date;
        if (music) {
            date = new moment(music.date).format('MMMM Do, YYYY');
            if (music.comments) {
                let commentDate = new moment().format('MMM Do YY');
                comments = music.comments.map(comment => {
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
                <Helmet><title>{music.title ? music.title : ''} - CJ Nation</title></Helmet>
                <h3>Music Page</h3>
                <div className="container post-feed">
                    <h5>Posted on {date}</h5>
                    <h4 className="center post-title">{music.title}</h4>
                    {music ? <audio autoPlay controls src={`/uploads/${music.url}`}></audio> : null}
                    <p>{music.text}</p>
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

Music.propTypes = {
    getMusic: PropTypes.func.isRequired,
    postAudioComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    posts: state.posts,
    errors: state.errors
});

export default connect(mapStateToProps, { getMusic, postAudioComment })(Music);