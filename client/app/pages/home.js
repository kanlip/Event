import React, { Component } from 'react';
//import { Parallax } from 'react-parallax';
import { fetchEvents } from '../actions/eventAction';
import { connect } from 'react-redux'
import { compose } from 'redux';
import { Helmet } from 'react-helmet'
import classNames from 'classnames';
// import Card from 'grommet/components/Card';
import withStyles from '@material-ui/core/styles/withStyles';
import Parallax from '../Components/assets/jss/components/Parallax/Parallax';
import GridContainer from '../Components/assets/jss/components/Grid/GridContainer';
import GridItem from '../Components/assets/jss/components/Grid/GridItem';
import Button from '../Components/assets/jss/components/CustomButtons/Button';
import landingPageStyle from '../Components/assets/jss/material-kit-react/views/landingPage';



import RenderEvents from './renderEvents';
class Home extends Component {

  componentWillMount() {
    this.props.fetchEvents();
  }

  render() {
    const { classes} = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRounded,
      classes.imgFluid
    );
    const insideStyles = {
      color: 'white',
      background: 'transparent',
      padding: 20,
      position: 'relative',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      fontSize: '30px'
    };

    
    return (
      <div>
        <Helmet>
          <meta charSet='utf-8' />
          <title>Madi Event</title>
          <link rel='canonical' href={window.location.href} />
          <meta name='description' content={'Book an Event with Madi Today!'} />
        </Helmet>

        <Parallax filter image={require('../images/Event.jpg')}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Madi Event</h1>
                <h4>
                  Every landing page needs a small description after the big
                  bold title, that's why we added this text here. Add here all
                  the information that can make you or your product create the
                  first impression.
                </h4>
                <br />
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <RenderEvents events={this.props.events}/>
          </div>
        </div>
      </div>
    )
  }

}
const mapStateToProps = state => ({
  events: state.events.items
})
export default compose(withStyles(landingPageStyle), connect(mapStateToProps, { fetchEvents }))(Home);