import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import M from 'materialize-css';
import axios from 'axios';

import { addPost } from '../../actions/postActions'; 

class Dashboard extends Component {
    constructor (props) {
        super(props);
        this.state = {
            title: '',
            text: '',
            type: '',
            file: null,
            uploadProgress: 0,
            errors: ''
        };
    }

    componentDidMount () {
        const elems = document.querySelectorAll('select');
        //eslint-disable-next-line
        const instances = M.FormSelect.init(elems, {});
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSelectedFile = (e) => {
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const post = new FormData();
        post.append('file', this.state.file);
        post.append('title', this.state.title);
        post.append('text', this.state.text);
        post.append('type', this.state.type);

        axios.post('/api/posts/addPost', post, {
            headers: {
                'Content-Type': 'multipart-form-data'
            },
            onUploadProgress: (ProgressEvent) => {
                this.setState({
                    uploadProgress: (ProgressEvent.loaded / ProgressEvent.total * 100)
                });
            }
        })
        .then(res => {
            console.log(res);
            this.setState({
                title: '',
                text: '',
                type: '',
                file: null
            }, () => {
                M.toast({
                    html: 'Post Successfully Published',
                    classes: 'toast-valid',
                    completeCallback: () => {
                        document.getElementById('add-post-form').reset();
                        this.setState({
                            uploadProgress: 0
                        });
                    }
                });
            });
        })
        .catch(err => {
            this.setState({
                errors: err.response.data,
                uploadProgress: 0
            });
        });
    }
    render () {
        const { errors } = this.state;
        return (
            <Fragment>
                <Helmet><title>Admin Dashboard - CJ Nation</title></Helmet>
                <h1 className="center">Admin Dashboard</h1>
                <form id="add-post-form" onSubmit={this.handleSubmit}>
                    <div className="col s12 input-field">
                        <input
                            className={classnames('validate', { 'invalid': errors.title })}
                            type="text"
                            id="title"
                            name="title"
                            value={this.state.title}
                            onChange={this.onChange}
                            title="Post title is required"
                        />
                        <label htmlFor="title">Post Title</label>
                        {errors.title ? (<span className="helper-text invalid-text">{errors.title}</span>) : null}
                    </div>
                    <div className="col s12 input-field">
                        <textarea 
                            className={classnames('validate', { 'invalid': errors.text })}
                            type="text"
                            id="text"
                            name="text"
                            value={this.state.text}
                            onChange={this.onChange}
                            text="Post content is required"
                            placeholder="Type Something Here . . ."
                        >
                        </textarea>
                        {errors.text ? (<span className="helper-text invalid-text">{errors.text}</span>) : null}
                    </div>
                    <div className="col s12 input-field">
                        <select 
                            id="type"
                            name="type" 
                            className={classnames('validate', {
                                'invalid': errors.type
                            })}
                            value={this.state.type}
                            onChange={this.onChange} 
                        >
                            <option disabled value="">Select Post Type</option>
                            <option title="This post contains only text content" value="Text Only">Text Only</option>
                            <option title="This is a post that contains a photo" value="Picture Post">Picture Post</option>
                            <option title="This post will contain an mp3 file" value="Audio">Audio</option>
                            <option title="This post will contain an mp4 file" value="Video">Video</option>
                            <option title="This post contains other file types " value="Other">Other</option>
                        </select>
                        {errors.type ? (<span className="helper-text invalid-text">{errors.type}</span>) : null}
                    </div>
                    <div className="col s12 file-field input-field">
                        <div className="btn grey">
                            <span>File</span>
                            <input 
                                type="file" 
                                id="file"
                                name="file"
                                onChange={this.handleSelectedFile}
                            />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                    <div className="col s12">
                        <button className="btn grey darken-3" type="submit">Publish</button>
                    </div>
                    <div>{Math.round(this.state.uploadProgress, 2)}%</div>
                </form>
            </Fragment>
        );
    }
};

Dashboard.propTypes = {
    addPost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    errors: state.errors
});

export default connect(mapStateToProps, { addPost })(Dashboard);