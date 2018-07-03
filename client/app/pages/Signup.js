import React, { Component } from 'react';
import { openDialog, signupEmail, signupPassword, signupConfirmPassword, signupLastName, signupFirstName, submittingForm, errorEmailForm, submitLoginForm, signoutUser, loginFacebook } from '../actions/loginAction';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Spinning from 'grommet/components/icons/Spinning';
import InfoOutline from '@material-ui/icons/InfoOutline';
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
// @material-ui/icons
import Email from '@material-ui/icons/Email';
// core components
import SnackbarContent from '../Components/assets/jss/components/Snackbar/SnackbarContent';
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
import FacebookLogin from 'react-facebook-login';
class Signup extends Component {
  state = {
    errorPassword: false,
    errorFirstName: false,
    errorLastName: false,
    errorEmail: false
  }
  handleSubmitLogin(data) {
    this.props.submitLoginForm(data);
  }
  handleChangeEmail(e) {
    this.props.signupEmail(e.target.value);
  }
  handleChangePassword(e) {
    this.props.signupPassword(e.target.value);
  }
  handleChangeConfirmPassword(e) {
    this.props.signupConfirmPassword(e.target.value);
  }
  validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  handleChangeFirstName(e) {
    this.props.signupFirstName(e.target.value);
  }
  handleChangeLastName(e) {
    this.props.signupLastName(e.target.value);
  }

  responseFacebook = (response) => {
    // console.log(response);
    this.props.loginFacebook(response);
  }
  handleSubmit(e) {
    const { email, password, confirmPassword, firstName, lastName } = this.props;
    if (password === confirmPassword && this.validateEmail(email) && firstName !== '' && lastName !== '') {

      let data = { name: `${firstName} ${lastName}`, local: { email: email, password: password } }
      this.props.submittingForm(data);

    }
    e.preventDefault();
    if (!this.validateEmail(email)) {
      this.props.errorEmailForm('Incorrect Email format')
      return false;
    }
    if (password !== confirmPassword) {
      this.props.errorEmailForm('password does not match')
      return false;
    }
    if (email === '') {
      this.setState({ errorEmail: true })
      return false;
    }
    if (firstName === '') {
      this.setState({ errorFirstName: true })
      return false;
    }
    if (lastName === '') {
      this.setState({ errorLastName: true })
      return false;
    }
  }

  SignupForm(classes) {
    if (this.props.submitting) {
      return (<Spinning size={'large'} />)
    }
    else {
      return (
        <div>
          <div className={classes.section}>
            <div className={classes.container}>
              {this.props.errorEmail && <SnackbarContent
                message={
                  <span>
                    {this.props.errorEmail}
                  </span>
                }
                close
                color="danger"
                icon={InfoOutline}
              />}
              <GridContainer justify='center'>

                <GridItem xs={12} sm={12} md={4}>
                  <Card>
                    <form className={classes.form} onSubmit={this.handleSubmit.bind(this)}>
                      <CardHeader color='info' className={classes.cardHeader}>
                        <h2>Signup</h2>

                      </CardHeader>
                      <CardBody>
                        <FormControl error={this.state.errorFirstName} fullWidth={true}>
                          <InputLabel htmlFor="name-simple">First Name</InputLabel>
                          <Input id="name-simple" value={this.props.firstName} onChange={this.handleChangeFirstName.bind(this)} />
                        </FormControl>

                        <FormControl error={this.state.errorLastName} fullWidth={true}>
                          <InputLabel htmlFor="lastName">Last Name</InputLabel>
                          <Input id="lastName" value={this.props.lastName} onChange={this.handleChangeLastName.bind(this)} />
                        </FormControl>

                        <FormControl error={this.state.errorEmail} fullWidth={true}>
                          <InputLabel htmlFor="email">Email</InputLabel>
                          <Input type={'email'} id="email" value={this.props.email} onChange={this.handleChangeEmail.bind(this)}
                            endAdornment={
                              <InputAdornment position="end">
                                <Email className={classes.inputIconsColor} />
                              </InputAdornment>

                            }
                          />
                        </FormControl>

                        <FormControl error={this.state.errorPassword} fullWidth={true}>
                          <InputLabel htmlFor="password">Password</InputLabel>
                          <Input id="password" type={'password'} value={this.props.password} onChange={this.handleChangePassword.bind(this)} />
                        </FormControl>

                        <FormControl error={this.state.errorPassword} fullWidth={true}>
                          <InputLabel htmlFor="confirmpass">Confirm Password</InputLabel>
                          <Input id="confirmpass" type={'password'} value={this.props.confirmPassword} onChange={this.handleChangeConfirmPassword.bind(this)} />
                        </FormControl>


                      </CardBody>
                      <CardFooter className={classes.cardFooter}>
                        <Button type={'submit'} color='info' size='lg'>
                          Get started
                    </Button>
                      </CardFooter>
                    </form>
                    <div align='center'>
                      <FacebookLogin
                        appId="1938125696449294"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={this.responseFacebook}
                        icon="fa-facebook"
                        disableMobileRedirect={true}
                        isMobile={true}
                      />
                    </div>
                    <Button size='lg' href='/login' color='info'>
                      Login
                    </Button>


                  </Card>
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
      )
    }
  }
  render() {
    const { classes } = this.props

    return (this.SignupForm(classes))
  }
}
const mapStateToProps = state => ({
  email: state.signUpForm.email,
  password: state.signUpForm.password,
  confirmPassword: state.signUpForm.confirmPassword,
  firstName: state.signUpForm.firstName,
  lastName: state.signUpForm.lastName,
  submitting: state.signUpForm.submitting,
  errorEmail: state.signUpForm.errorEmail,
  notification: state.signUpForm.notification,
  errorMessage: state.auth.error,
  authenticated: state.auth.authenticated,
  role: state.auth.role
})

export default compose(withStyles(loginStyle), connect(mapStateToProps, { signupEmail, signupPassword, signupConfirmPassword, signupLastName, signupFirstName, submittingForm, errorEmailForm, submitLoginForm, signoutUser, loginFacebook }))(Signup);