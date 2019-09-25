import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setCurrentPost } from '../../actions/postActions';

class PostItem extends Component {
    constructor (props) {
        super(props);
        this.state = {
            post: {},
            comment: ''
        };
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value} );
    }

    handlePageChange = () => {
        const { title, date, mimeType, text, url, comments, _id } = this.props.post;
        const post = {
            id: _id,
            title,
            date,
            mimeType, 
            text,
            url,
            comments
        };
        this.setState({
            post
        }, () => {
            this.props.setCurrentPost(this.state.post, this.props.history);
        });
    };
    render () {
        const { title, mimeType, text, url } = this.props.post;
        return (
            <div className="col s12 m6 l3 post">
                <div className="card medium hoverable">
                    <div className="card-image">
                        {mimeType === 'audio/mp3' ? <audio src={`/uploads/${url}`}></audio> : null}
                        {mimeType === 'video/mp4' ? <video src={`/uploads/${url}`}></video> : null}
                        {mimeType === 'image/jpeg' ||
                            mimeType === 'image/png' || 
                            mimeType === 'image/gif' ? 
                            <img className="post-image materialboxed responsive-img" src={`/uploads/${url}`} alt=""/> 
                            :
                         null}
                        {mimeType !== 'audio/mp3' ||
                            mimeType !== 'image/jpeg' ||
                            mimeType !== 'image/png' ||
                            mimeType !== 'image/gif' ||
                            mimeType !== 'audio/mp3'
                            ? <a className="post-title" href={`/uploads/${url}`} target="_blank" rel="noopener noreferrer" alt={title}>&nbsp;</a>
                            : null
                        }
                        {/* <a href="#" className="btn-floating halfway-fab red center"><span className="mdi mdi-account"></span></a> */}
                    </div>
                    <div className="card-content">
                        <p className="truncate">{text}</p>
                    </div>
                    <div className="card-action">
                        <h6 className="post-title" title="Click to view full post" onClick={this.handlePageChange}>{title}</h6>
                        {/* <Link </Link> */}
                    </div>
                </div>
            </div>
        );
    }
}

PostItem.propTypes = {
    setCurrentPost: PropTypes.func.isRequired
};

export default connect(null, { setCurrentPost })(withRouter(PostItem));