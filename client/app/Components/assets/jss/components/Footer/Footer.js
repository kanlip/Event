/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import { List, ListItem, withStyles } from "@material-ui/core";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import footerStyle from "../../material-kit-react/components/footerStyle";

function Footer({ ...props }) {
  const { classes, whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                href="/"
                className={classes.block}
                target="_blank"
              >
                Madi Event
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="/term-policy"
                className={classes.block}
                target="_blank"
              >
                Term & Policy
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="/becomeorganizer"
                className={classes.block}
                target="_blank"
              >
                Become an Organizer
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="/contact"
                className={classes.block}
                target="_blank"
              >
                contact us
              </a>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()} Madi Event , Made by  {' '}
          <a
            href="https://kan-profile.herokuapp.com"
            className={aClasses}
            target="_blank"
          >
            Kan
          </a>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  whiteFont: PropTypes.bool
};

export default withStyles(footerStyle)(Footer);
