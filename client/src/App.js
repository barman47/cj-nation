import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import ScrollToTop from './components/layout/ScrollToTop';
import Header from './components/layout/Header'
import Home from './components/Home'
import Post from './components/posts/Post'
import AllPosts from './components/posts/AllPosts'
import Videos from './components/posts/Videos'
import Video from './components/posts/Video'
import Music from './components/posts/Music'
import Musics from './components/posts/Musics'
import Admin from './components/admin/Admin'
import Dashboard from './components/admin/Dashboard'
import Footer from './components/layout/Footer'

import PrivateRoute from './components/common/PrivateRoute'; 

import store from './store';
import setAuthToken from './utils/setAuthToken';
import { logoutAdmin, setCurrentUser } from './actions/authActions';

if (localStorage.adminToken) {
	// set auth tokwn to header auth
	setAuthToken(localStorage.adminToken);
	// Decode token and get user info
	const decoded = jwt_decode(localStorage.adminToken);
	// Set user and authenticated
	store.dispatch(setCurrentUser(decoded));
	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout out user
		store.dispatch(logoutAdmin());
		window.location.href = '/';
	}
}

class App extends Component {
	render () {
		return (
			<Provider store={store}>
				<Router>
					<ScrollToTop>
						<Fragment>
							<Header />
							<Route path="/" exact component={Home} />
							<Route path="/posts" exact component={AllPosts} />
							<Route path="/admin" exact component={Admin} />
							<Route path="/posts/:postTitle" exact component={Post} />
							<Route path="/videos" exact component={Videos} />
							<Route path="/videos/:videoURL" exact component={Video} />
							<Route path="/musics" exact component={Musics} />
							<Route path="/musics/:musicURL" exact component={Music} />
							<Switch>
								<PrivateRoute path="/dashboard" exact component={Dashboard} />
							</Switch>
							<Footer />
						</Fragment>
					</ScrollToTop>
				</Router>
			</Provider>
		);
	}
}

export default App;