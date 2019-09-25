import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css';

import { getMusics } from '../../actions/postActions';

import isEmpty from '../../validation/is-empty';

class Musics extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loading: false,
            message: '',
            musics: [],
            errors: {}
        };
    }

    componentDidMount () {
        this.props.getMusics();
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        if (nextProps.posts.musics) {
            this.setState({
                musics: nextProps.posts.musics,
                loading: false
            });
        }

        if (!isEmpty(nextProps.errors)) {
            this.setState({
                errors: nextProps.errors,
                message: 'No Musics at this time',
                loading: false
            }, () => {
                M.toast({
                    html: this.state.errors.msg,
                    classes: 'toast-invalid'
                });
            });
        }
    }

    render () {
        const { musics, message } = this.state;
        let musicsArray;
        if (musics.length > 0) {
            musicsArray = musics.map(music => (
                <Link key={music._id} to={`/musics/${music._id}`}>
                    <div className="col s12 m6 l3 musics hoverable">
                        <h5>{music.title}</h5>
                        <audio controls key={music._id} src={`/uploads/${music.url}`}></audio>
                        <p className="truncate">{music.text}</p>
                    </div>
                </Link>
            ));
        }
        return (
            <Fragment>
                <Helmet><title>Musics - CJ Nation Entertainment</title></Helmet>
                <div className="musics">
                    <h4>CJ Nation Entertainment Musics Page</h4>
                    {message !== '' ? <h5>{message}</h5> : null}
                    <div className="row">
                        {musicsArray}
                    </div>
                </div>
            </Fragment>
        );
    }
}

Musics.propTypes = {
    getMusics: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    posts: state.posts,
    errors: state.errors
});

export default connect(mapStateToProps, { getMusics })(withRouter(Musics));