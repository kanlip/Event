import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import Parallax from "../Components/assets/jss/components/Parallax/Parallax";
import GridContainer from "../Components/assets/jss/components/Grid/GridContainer";
import GridItem from "../Components/assets/jss/components/Grid/GridItem";
import RenderDetails from "./RenderComponents/renderDetails";
import withStyles from "@material-ui/core/styles/withStyles";
import { compose } from "redux";
import { fetchSpecificEvent } from "../actions/eventAction";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import Spinning from "grommet/components/icons/Spinning";
import { Helmet } from "react-helmet";
import landingPageStyle from "../Components/assets/jss/material-kit-react/views/landingPage";
import pillsStyle from "../Components/assets/jss/material-kit-react/views/componentsSections/pillsStyle";
import Description from "@material-ui/icons/Description";
import ReportProblem from "@material-ui/icons/ReportProblem";
import List from "@material-ui/icons/List";
import NavPills from "../Components/assets/jss/components/NavPills/NavPills";
class Event extends Component {
  componentDidMount() {
    this.props.fetchSpecificEvent(this.props.id);
  }

  renderMap() {
    const { event } = this.props;

    const MyMapComponent = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          defaultZoom={14}
          center={{ lat: event.loc[0], lng: event.loc[1] }}
        >
          {props.isMarkerShown && (
            <Marker position={{ lat: event.loc[0], lng: event.loc[1] }} />
          )}
        </GoogleMap>
      ))
    );
    return (
      <MyMapComponent
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCqxA_5pYxQS4nGTjVm8_ZFSqV0KRk7HqM"
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "400px" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    );
  }

  render() {
    const { classes, loading } = this.props;
    const { description, rules, img, title } = this.props.event;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRounded,
      classes.imgFluid
    );
    if (loading) {
      return (
        <div align="center">
          <Spinning size={"large"} /> loading Map...
        </div>
      );
    } else if (title === undefined) {
      return <h1>404 No event found</h1>;
    } else {
      return (
        <div>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{title}</title>
            <link rel="canonical" href={window.location.href} />
            <meta name="description" content={description} />
          </Helmet>
          <Parallax filter image={require("../images/Event.jpg")}>
            <div className={classes.container}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <h1 className={classes.title}>{title}</h1>
                  <h4>{description}</h4>
                  <br />
                </GridItem>
              </GridContainer>
            </div>
          </Parallax>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container}>
              <GridContainer>
                <GridItem xs={12} sm={6}>
                  <img
                    style={{ paddingRight: "40px" }}
                    src={img}
                    alt="event"
                    className={"carousel-image"}
                  />
                </GridItem>
                <GridItem xs={12} sm={6} className={"detail-time"}>
                  <RenderDetails event={this.props.event} />
                </GridItem>
                <GridItem>
                  <div style={{ paddingRight: "40px" }}>
                    <NavPills
                      color="info"
                      horizontal={{
                        tabsGrid: { xs: 12, sm: 3, md: 4 },
                        contentGrid: { xs: 12, sm: 9, md: 8 }
                      }}
                      tabs={[
                        {
                          tabButton: "Description",
                          tabIcon: Description,
                          tabContent: (
                            <span style={{ color: "black" }}>
                              <p>{description}</p>
                            </span>
                          )
                        },
                        {
                          tabButton: "Rules",
                          tabIcon: ReportProblem,
                          tabContent: (
                            <span>
                              <p style={{ color: "black" }}>{rules}</p>
                            </span>
                          )
                        },
                        {
                          tabButton: "How to buy",
                          tabIcon: List,
                          tabContent: (
                            <span style={{ color: "black" }}>
                              <p>
                                Collaboratively administrate empowered markets
                                via plug-and-play networks. Dynamically
                                procrastinate B2C users after installed base
                                benefits.
                              </p>
                              <br />
                              <p>
                                Dramatically visualize customer directed
                                convergence without revolutionary ROI.
                                Collaboratively administrate empowered markets
                                via plug-and-play networks. Dynamically
                                procrastinate B2C users after installed base
                                benefits.
                              </p>
                              <br />
                              <p>
                                Dramatically visualize customer directed
                                convergence without revolutionary ROI.
                                Collaboratively administrate empowered markets
                                via plug-and-play networks. Dynamically
                                procrastinate B2C users after installed base
                                benefits.
                              </p>
                            </span>
                          )
                        }
                      ]}
                    />
                  </div>
                </GridItem>
              </GridContainer>
              <div style={{ paddingRight: "30px" }}>{this.renderMap()}</div>
            </div>
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = state => ({
  event: state.events.item,
  loading: state.events.loading
});
export default compose(
  withStyles(landingPageStyle, pillsStyle),
  connect(
    mapStateToProps,
    { fetchSpecificEvent }
  )
)(Event);
