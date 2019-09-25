import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css';

import { getVideos, setVideo } from '../../actions/postActions';

import isEmpty from '../../validation/is-empty';

class Videos extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: false,
            message: '',
            videos: [],
            errors: {}
        };
    }

    componentDidMount () {
        this.props.getVideos();
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        if (nextProps.posts.videos) {
            this.setState({
                videos: nextProps.posts.videos,
                loading: false
            });
        }

        if (!isEmpty(nextProps.errors)) {
            this.setState({
                errors: nextProps.errors,
                message: 'No Videos at this time',
                loading: false
            }, () => {
                M.toast({
                    html: this.state.errors.msg,
                    classes: 'toast-invalid'
                });
            });
        }
    }

    setVideo = (video) => {
        console.log('clicked video');
        // this.props.setVideo(data, this.props.history);
    };

    render () {
        const { videos, message } = this.state;
        let videosArray;
        if (videos.length > 0) {
            videosArray = videos.map(video => (
                <Link key={video._id} to={`/videos/${video._id}`}>
                    <div className="col s12 m6 l3 video hoverable">
                        <video key={video._id} src={`/uploads/${video.url}`}></video>
                        <h5>{video.title}</h5>
                        <p className="truncate">{video.text}</p>
                    </div>
                </Link>
            ));
        }
        return (
            <Fragment>
                <Helmet><title>Videos - CJ Nation Entertainment</title></Helmet>
                <div className="videos">
                    <h4>CJ Nation Entertainment Videos Page</h4>
                    {message !== '' ? <h5>{message}</h5> : null}
                    <div className="row">
                        {videosArray}
                    </div>
                </div>
            </Fragment>
        );
    }
}

Videos.propTypes = {
    getVideos: PropTypes.func.isRequired,
    setVideo: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    posts: state.posts,
    errors: state.errors
});

export default connect(mapStateToProps, { getVideos, setVideo })(withRouter(Videos));