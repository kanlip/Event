/*eslint-disable*/
import React from 'react';
// react components for routing our app without refresh
import { Link } from 'react-router-dom';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import { compose } from 'redux';
import { connect } from 'react-redux';
// @material-ui/icons
import { submitLoginForm, signoutUser } from '../../actions/loginAction';

import { Apps, CloudDownload, QuestionAnswer } from '@material-ui/icons';

// core components
import CustomDropdown from '../assets/jss/components/CustomDropdown/CustomDropdown';
import Button from '../assets/jss/components/CustomButtons/Button';

import headerLinksStyle from '../assets/jss/material-kit-react/components/headerLinksStyle';




function HeaderLinks({ ...props }) {
  const { classes } = props;
  return (
    <List className={classes.list}>
      {/* <ListItem className={classes.listItem}>
        <Button color="transparent" href='/events' className={classes.navLink}>
          Events
        </Button>
      </ListItem> */}
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText='Need Help'
          hoverColor="info"
          buttonProps={{
            className: classes.navLink,
            color: 'transparent'
          }}
          buttonIcon={QuestionAnswer}
          dropdownList={[
            <Link to='/contact' className={classes.dropdownLink}>
              Contact Us
            </Link>,
            <a
              href='/faq'
              target='_blank'
              className={classes.dropdownLink}
            >
              FAQ
            </a>
          ]}
        />

      </ListItem>
      {props.role === 'admin' ? <ListItem className={classes.listItem}>
        <Button color="transparent" href='/createevent' className={classes.navLink}>
          Create Event
        </Button>
      </ListItem> : ''}
      {props.authenticated ? <ListItem className={classes.listItem}>
        <Button
          className={classes.registerNavLink}
          onClick={() => props.signoutUser()}
          color="info"
        // round
        >
          Signout
    </Button>
      </ListItem> :

        <ListItem className={classes.listItem}>
          <Button
            className={classes.registerNavLink}
            href='/signup'
            color="info"
          // round
          >
            Register
          </Button>
        </ListItem>


      }
      {/* <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/CreativeTim"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/CreativeTim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/CreativeTimOfficial"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem> */}
      {props.authenticated && <ListItem className={classes.listItem}>
        <Button color="transparent" className={classes.navLink}>{localStorage.getItem('name')===''? '': `Welcome ${localStorage.getItem('name')}`}</Button>
      </ListItem>}

    </List>
  );
}
const mapStateToProps = state => ({
  errorMessage: state.auth.error,
  authenticated: state.auth.authenticated,
  role: state.auth.role
})
export default compose(withStyles(headerLinksStyle), connect(mapStateToProps, { submitLoginForm, signoutUser }))(HeaderLinks);
