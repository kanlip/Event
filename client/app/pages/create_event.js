import React, { Component } from 'react';
import FormField from 'grommet/components/FormField';
import InfoOutline from '@material-ui/icons/InfoOutline';
import Form from 'grommet/components/Form';
import TextInput from 'grommet/components/TextInput';
import NumberInput from 'grommet/components/NumberInput';
import DateTime from 'grommet/components/DateTime';
import Loader from 'react-loader-spinner'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createEvent } from '../actions/eventAction';
import Button from '../Components/assets/jss/components/CustomButtons/Button';
import axios from 'axios';
import SnackbarContent from '../Components/assets/jss/components/Snackbar/SnackbarContent';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Parallax from '../Components/assets/jss/components/Parallax/Parallax';
import GridContainer from '../Components/assets/jss/components/Grid/GridContainer';
import GridItem from '../Components/assets/jss/components/Grid/GridItem';
import landingPageStyle from '../Components/assets/jss/material-kit-react/views/landingPage';
class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: {},
      loader: false,
      error: '',
      showError: false
    }
  }

  componentDidMount() {
    this.props.role === 'admin' ? '' : this.props.history.push('/')
  }

  handleChange(e) {
    this.props.createEvent(e.target.name, e.target.value)
  }
  handleChangeDate(data) {
    this.props.createEvent('starttime', data);
  }
  handleChangeFile(e) {
    this.setState({ [e.target.name]: e.target.files[0] })

  }
  showErrorMessage(type) {
    let error = `Please enter ${type}`
    this.setState({ showError: true, error: error })
  }
  validate(props) {
    const { title, price, age, address, description, rules, startTime, category } = props;
    if (title === '') {
      this.showErrorMessage('title')
      return false
    }
    if (price === '') {
      this.showErrorMessage('price')
      return false
    }
    if (age === '') {
      this.showErrorMessage('age')
      return false;
    }
    if (address === '') {
      this.showErrorMessage('address')
      return false;
    }
    if (description === '') {
      this.showErrorMessage('description')
      return false;
    }
    if (startTime === '') {
      this.showErrorMessage('startTime')
      return false;
    }
    if (category === '') {
      this.showErrorMessage('category')
      return false;
    }
    return true;
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loader: true })
    const { title, price, age, address, description, rules, startTime, category } = this.props;

    let formData = new FormData();
    formData.append('file', this.state.image);
    formData.append('title', title)
    formData.append('price', price)
    formData.append('age', age)
    formData.append('address', address)
    formData.append('description', description)
    formData.append('rules', rules)
    formData.append('startTime', startTime)
    formData.append('category', category);
    if (this.validate(this.props) === true) {
      axios.post('/api/events/create', formData).then((response) => {

        console.log(response.status)
        if (response.status === 200) {
          this.setState({ loader: false })
          window.location.href = '/createevent'
        }
      })
    }
    else {
      this.setState({ loader: false })
    }

  }

  render() {
    const { classes } = this.props;
    let options = ['Science & Tech', 'Business', 'Family', 'Education', 'Hobbies', 'Music', 'Health', 'Community', 'Food & Drink', 'Art', 'Sports', 'Film Media', 'Charity','Party']

    return (
      <div style={{ width: '100%', paddingBottom: '50px' }}>
        <Parallax filter image={require('../images/Event.jpg')}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Create Event</h1>

                <br />
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
           
            {this.state.showError &&
              <SnackbarContent
                message={
                  <span>
                    {this.state.error}
                  </span>
                }
                close
                color="danger"
                icon={InfoOutline}
              />

            }
            <div className={'form-create'}>
            
              {this.state.loader ? <Loader type="ThreeDots" color="#424242" height={100} width={100} /> :

                <Form pad='small' onSubmit={this.handleSubmit.bind(this)}>
                  <FormField label='Event Title'>
                    <TextInput onDOMChange={this.handleChange.bind(this)} name='title' value={this.props.title} />
                  </FormField>
                  <FormField label='Category'>
                    <Select
                      value={this.props.category}
                      name='category'
                      onChange={this.handleChange.bind(this)}
                      style={{ width: '100%' }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {options.map((item, i) => <MenuItem key={i} value={item}>{item}</MenuItem>)}
                    </Select>
                  </FormField>
                  <FormField label='Minimum age'>
                    <NumberInput onChange={this.handleChange.bind(this)} name='age' step={1} value={this.props.age} />
                  </FormField>
                  <FormField label='Price'>
                    <NumberInput onChange={this.handleChange.bind(this)} name='price' value={this.props.price} min={0} />
                  </FormField>
                  <FormField label='Date and Time of Event'>
                    <DateTime id='starttime' name='starttime'
                      onChange={this.handleChangeDate.bind(this)}
                      value={this.props.startTime}
                    />
                  </FormField>
                  <FormField label='Address'>
                    <TextInput onDOMChange={this.handleChange.bind(this)} name='address' value={this.props.address} />
                  </FormField>
                  <FormField label="Description" htmlFor="description">
                    <textarea name='description' rows='7' style={{ paddingLeft: 0, paddingRight: 0 }} onChange={this.handleChange.bind(this)} value={this.props.description} />
                  </FormField>
                  <FormField label="Rules" htmlFor="rules">
                    <textarea name='rule' rows='7' onChange={this.handleChange.bind(this)} style={{ paddingLeft: 0, paddingRight: 0 }} value={this.props.rules} />
                  </FormField>
                  <FormField label='Image'>
                    <input type="file" onChange={this.handleChangeFile.bind(this)} name="image" accept="image/*" />
                  </FormField>


                  <Button color='info'
                    type='submit'>
                    Create
               </Button>
                </Form>



              }
            </div>
          </div>
        </div>


      </div>
    )
  }
}
const mapStateToProps = state => ({
  title: state.events.title,
  price: state.events.price,
  age: state.events.age,
  startTime: state.events.startTime,
  description: state.events.description,
  rules: state.events.rules,
  address: state.events.address,
  category: state.events.category,
  role: state.auth.role
})

export default compose(withStyles(landingPageStyle), connect(mapStateToProps, { createEvent }))(CreateEvent);