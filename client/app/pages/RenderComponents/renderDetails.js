import withStyles from "@material-ui/core/styles/withStyles";
import React, { Component } from "react";
import Chat from "@material-ui/icons/Chat";
import CustomTabs from "../../Components/assets/jss/components/CustomTabs/CustomTabs";
import tabsStyle from "../../Components/assets/jss/material-kit-react/views/componentsSections/tabsStyle";
import Button from "../../Components/assets/jss/components/CustomButtons/Button";
import Timestamp from "grommet/components/Timestamp";

class RenderDetails extends Component {
  renderTimeStamp() {
    if (this.props.event.startTime !== undefined) {
      return <Timestamp value={this.props.event.startTime} />;
    } else {
      return <p>loading....</p>;
    }
  }
  render() {
    const { classes } = this.props;
    const { price, age, address } = this.props.event;
    return (
      <div style={{ padding: "20px 40px 0 0" }}>
        <CustomTabs
          headerColor="info"
          tabs={[
            {
              tabName: "Details",
              tabIcon: Chat,
              tabContent: (
                <h2
                  className={classes.textCenter}
                  style={{ fontWeight: "normal" }}
                >
                  Minimum Age: {age} <br />
                  Location : {address}
                  <br />
                  Time: {this.renderTimeStamp()}
                  <br />
                  Price: ‎฿ <strong>{price === 0 ? "FREE" : price}</strong>
                </h2>
              )
            }
          ]}
        />
        <div>
          <h3 style={{ color: "black" }}>Share our event:</h3>
         
          <Button
            color="facebook"
            href={`http://www.facebook.com/sharer.php?u=${
              window.location.href
            }`}
          >
            <i className={"fab fa-facebook-square"} /> Share
          </Button>
          <Button
            href={`https://twitter.com/share?url=${window.location.href}`}
            color="twitter"
          >
            <i className={"fab fa-twitter"} /> Share with Twitter
          </Button>
          <Button
            color="google"
            href={`https://plus.google.com/share?url=${window.location.href}`}
          >
            <i className={"fab fa-google-plus-square"} /> Share on Google+
          </Button>}
        </div>
      </div>
    );
  }
}

export default withStyles(tabsStyle)(RenderDetails);
