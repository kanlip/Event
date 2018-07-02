import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import {compose} from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
//import Footer from './Components/Footer';

import Home from './pages/home';
import Event from './pages/event';
import RequireAuth from './Components/require_auth';
import Authenticated from './Components/authenticated';
import Footer from './Components/assets/jss/components/Footer/Footer';
import Loadable from 'react-loadable';
import { Loading } from './utils/loadable.js'
import Header from './Components/Header/Header';
import HeaderLinks from './Components/Header/HeaderLinks';
import landingPageStyle from './Components/assets/jss/material-kit-react/views/landingPage';
const createEvent = Loadable({
  loader: () => import('./pages/create_event'),
  loading: Loading,
})

const Signup = Loadable({
  loader: () => import('./pages/Signup'),
  loading: Loading,
})

const Login = Loadable({
  loader: () => import('./pages/Login'),
  loading: Loading,
})
const ContactUs =Loadable({
  loader: () => import('./pages/contactus'),
  loading: Loading,
})


const dashboardRoutes = [];
class App extends Component {
 

  render() {

    return (
      <BrowserRouter>
        <div>
          
          <Header
            color="transparent"
            routes={dashboardRoutes}
            brand="Madi Event"
            rightLinks={<HeaderLinks />}
            fixed
            changeColorOnScroll={{
              height: 400,
              color: 'white'
            }}
           
          />
          {/* <button onClick={()=> this.props.addLike()}>Like</button>
          <p>{this.props.likes.likes}</p> */}
          <Switch>
            <Route exact={true} path='/' component={Home} />
            <Route exact={true} path='/event/:id' component={(props) => <Event id={props.match.params.id} />} />
            <Route exact={true} path='/createevent' component={RequireAuth(createEvent)} />
            <Route exact={true} path='/signup' component={Authenticated(Signup)} />
            <Route exact={true} path='/login' component={Authenticated(Login)} />
            <Route exact={true} path='/contact' component={ContactUs} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}




export default compose(withStyles(landingPageStyle),connect())(App);
