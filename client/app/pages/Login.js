import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import {connect} from 'react-redux';
import {compose} from 'redux';
// @material-ui/icons
import Email from '@material-ui/icons/Email';
import LockOutline from '@material-ui/icons/LockOutline';
import {  submitLoginForm } from '../actions/loginAction';
import SnackbarContent from '../Components/assets/jss/components/Snackbar/SnackbarContent';
import InfoOutline from '@material-ui/icons/InfoOutline';

import GridContainer from '../Components/assets/jss/components/Grid/GridContainer';
import GridItem from '../Components/assets/jss/components/Grid/GridItem';
import Card from '../Components/assets/jss/components/Card/Card';
import CardHeader from '../Components/assets/jss/components/Card/CardHeader';
import CardBody from '../Components/assets/jss/components/Card/CardBody';
import CardFooter from '../Components/assets/jss/components/Card/CardFooter';
import Button from '../Components/assets/jss/components/CustomButtons/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import loginStyle from '../Components/assets/jss/material-kit-react/views/componentsSections/loginStyle';


class Login extends Component {
  state = {
    username: '',
    password: ''
  }
  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.submitLoginForm(this.state);
  }
  render() {
    const { classes } = this.props
 
    return (
      <div>
          <div className={classes.section}>
            <div className={classes.container}>
              {this.props.errorMessage && <SnackbarContent
                message={
                  <span>
                    {this.props.errorMessage}
                  </span>
                }
                close
                color='danger'
                icon={InfoOutline}
              />}
              <GridContainer justify='center'>

                <GridItem xs={12} sm={12} md={4}>
                  <Card>
                    <form className={classes.form} onSubmit={this.handleSubmit.bind(this)}>
                      <CardHeader color='info' className={classes.cardHeader}>
                        <h2>Login</h2>

                      </CardHeader>
                      <CardBody>
                      

                        <FormControl  fullWidth={true}>
                          <InputLabel htmlFor='username'>Email</InputLabel>
                          <Input type={'email'} name={'username'} id='username' value={this.state.username} onChange={this.handleChange.bind(this)}
                            endAdornment={
                              <InputAdornment position='end'>
                                <Email className={classes.inputIconsColor} />
                              </InputAdornment>

                            }
                          />
                        </FormControl>

                        <FormControl fullWidth={true}>
                          <InputLabel htmlFor='password'>Password</InputLabel>
                          <Input id='password' name={'password'} type={'password'} value={this.state.password} onChange={this.handleChange.bind(this)} 
                          
                          endAdornment={
                            <InputAdornment position='end'>
                              <LockOutline
                                className={classes.inputIconsColor}
                              />
                            </InputAdornment>

                          }
                          />
                        </FormControl>

                      </CardBody>
                      <CardFooter className={classes.cardFooter}>
                        <Button type={'submit'} color='info' size='lg'>
                          Get started
                    </Button>
                      </CardFooter>
                    </form>
                  </Card>
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
    );
  }
}
const mapStateToProps = state => ({
  errorMessage: state.auth.error,
})


export default compose(withStyles(loginStyle),connect(mapStateToProps,{submitLoginForm}))(Login);