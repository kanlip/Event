import React, { Component } from 'react';
import GridContainer from '../Components/assets/jss/components/Grid/GridContainer';
import GridItem from '../Components/assets/jss/components/Grid/GridItem';
import { onChangeCategorySearch } from '../actions/searchAction'
import withStyles from '@material-ui/core/styles/withStyles';
import teamStyle from '../Components/assets/jss/material-kit-react/views/landingPageSections/teamStyle';
import Button from '../Components/assets/jss/components/CustomButtons/Button';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Timestamp from 'grommet/components/Timestamp';
import Typography from '@material-ui/core/Typography';
import { Select, FormControl, InputLabel, Card, CardActions, CardContent, CardMedia, MenuItem } from '@material-ui/core';
import { SIGNUP_FIRSTNAME } from '../actions/types';
const styles =
  {

    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9,
      marginTop: '30'
    }
  };


class renderEvents extends Component {

  handleChange(e) {
    this.props.onChangeCategorySearch(e.target.value)
  }
  render() {
    let options = ['Science & Tech', 'Business', 'Family', 'Education', 'Hobbies', 'Music', 'Health', 'Community', 'Food & Drink', 'Art', 'Sports', 'Film Media', 'Charity','Party']
    const { classes, events } = this.props
    const eventItems = events.map(event => (
  
      <GridItem key={event._id} xs={12} sm={12} md={4} style={{ paddingTop: '20px' }}>
        <Card>
          {event.img === '' ? '' : <CardMedia
            image={event.img}
            title='Event'
            style={styles.media}
            alt='event'
          />}
          <CardContent>
            <Typography color='textSecondary'>
              <Timestamp value={event.startTime} />
            </Typography>
            <Typography gutterBottom variant='headline' component='h2'>
              {event.title}
            </Typography>
            <Typography variant='subheading' className={'description-card'}>
              {event.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button type="button" href={`/event/${event._id}`} color="info">Learn More</Button>
          </CardActions>
        </Card>
      </GridItem>

    ));
    return (
      <div className={classes.section}>
        <h2 className={classes.title}>Upcoming Events</h2>
        <GridContainer>
          <GridItem xs={10} sm={6} md={4}>
            <FormControl fullWidth={true}>
              <InputLabel htmlFor='category'>Category</InputLabel>
              <Select
                value={this.props.category}
                onChange={this.handleChange.bind(this)}
              >
                <MenuItem value={0}>
                  <em>All Events</em>
                </MenuItem>
                {options.map((item, i) => <MenuItem key={i} value={item}>{item}</MenuItem>)}
              </Select>
            </FormControl>
          </GridItem>
        </GridContainer>
        <div style={{ paddingRight: '35px' }}>
          <GridContainer>
            {eventItems}
          </GridContainer>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  category: state.search.category
})
export default compose(withStyles(teamStyle), connect(mapStateToProps, { onChangeCategorySearch }))(renderEvents);