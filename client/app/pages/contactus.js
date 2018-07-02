import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import landingPageStyle from '../Components/assets/jss/material-kit-react/views/landingPage';
import GridContainer from '../Components/assets/jss/components/Grid/GridContainer';
import GridItem from '../Components/assets/jss/components/Grid/GridItem';
import withStyles from '@material-ui/core/styles/withStyles';
import Parallax from '../Components/assets/jss/components/Parallax/Parallax';
import classNames from 'classnames';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '../Components/assets/jss/components/CustomButtons/Button';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import SnackbarContent from '../Components/assets/jss/components/Snackbar/SnackbarContent';
import InfoOutline from '@material-ui/icons/InfoOutline';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      loader: false,
      success: false,
      successMsg: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({loader:true})
    axios.post('/api/contactus', this.state)
      .then(response => {
        console.log(response)
        if(response.status===200){
          this.setState({success:true,loader:false,successMsg:response.data.msg})
        }
      })
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  validate() {
    return this.state.name.length > 0 && this.state.email.length > 0 && this.state.message.length > 0;
  }
  render() {
    const { classes } = this.props;

    return (
      <div style={{ width: '100%' }}>
        <Parallax filter image={require('../images/Event.jpg')}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Contact Us</h1>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div style={{ paddingBottom: '50px', }} className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>

          {this.state.success &&
              <SnackbarContent
                message={
                  <span>
                    {this.state.successMsg}
                  </span>
                }
                close
                color="success"
                icon={InfoOutline}
              />

            }
            {this.state.loader ? <Loader type="ThreeDots" color="#424242" height={100} width={100} /> :

              <form action='/' onSubmit={this.handleSubmit}>
                <FormControl fullWidth={true}>
                  <InputLabel htmlFor="name">Name</InputLabel>
                  <Input id="name" value={this.state.name} name='name' onChange={this.handleChange} />
                </FormControl>
                <FormControl fullWidth={true}>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input id="email" value={this.state.email} name='email' onChange={this.handleChange} />
                </FormControl>
                <FormControl fullWidth={true}>
                  <InputLabel htmlFor="message">Message</InputLabel>
                  <Input multiline rows={5} id="message" value={this.state.message} name='message' onChange={this.handleChange} />
                </FormControl>
                <Button color='info'
                  type='submit' disabled={!this.validate()}>
                  Submit Message
                </Button>
              </form>
            }

          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(Contact);