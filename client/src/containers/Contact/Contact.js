import React, { Component } from 'react';
import { Field, reduxForm, propTypes } from 'redux-form';
import { Container, Form, Message, Segment, Grid, List, Header, Divider } from 'semantic-ui-react';
import classes from './Contact.scss';

class Contact extends Component {
  handleLogin = async (values) => {
    await this.props.onAuthLogin(values);

    // handle firebase error on reduxForm. if there is an error, code will not
    // pass this error handler
    // if (Object.keys(this.props.authError).length > 0) {
    //   throw new SubmissionError({ _error: this.props.authError.message });
    // }

    this.props.reset();
  }

  renderField = ({
    input, label, placeholder, type, meta: { touched, error, warning },
  }) => (
    <Form.Field>
      <Form.Input
        {...input}
        className={classes.FormInput}
        placeholder={placeholder}
        type={type}
        label={label}
        required
      />
      {
        touched && (
          (error && <Message color="red" size="mini">{error}</Message>)
          || (warning && <Message color="yellow" size="mini">{warning}</Message>)
        )
      }
    </Form.Field>
  );

  renderTextArea = ({
    input, label, placeholder, type, meta: { touched, error, warning },
  }) => (
    <Form.Field>
      <Form.TextArea
        {...input}
        className={classes.FormInput}
        placeholder={placeholder}
        type={type}
        label={label}
        required
      />
      {
        touched && (
          (error && <Message color="red" size="mini">{error}</Message>)
          || (warning && <Message color="yellow" size="mini">{warning}</Message>)
        )
      }
    </Form.Field>
  );

  render() {
    const { handleSubmit, error: serverError } = this.props;

    return (
      <Container className={classes.Contact}>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Header size="large" textAlign="center">Contact Us!</Header>
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column computer={2} mobile={16} />
            <Grid.Column computer={4} mobile={16}>
              <List size="big" divided>
                <List.Item>
                  <List.Icon name="users" />
                  <List.Content>Hodl & Stake HQ</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="marker" />
                  <List.Content>Jersey City, NJ 07302</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name="phone" />
                  <List.Content>(123)456-7890 ext. 999</List.Content>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column computer={2} mobile={16} />
            <Grid.Column as={Segment} computer={6} mobile={16}>
              <Form onSubmit={handleSubmit(this.handleLogin)}>
                <Field
                  name="email"
                  component={this.renderField}
                  type="email"
                  label="E-Mail"
                  placeholder="ContactEmail@sample.com"
                />
                <Field
                  name="comment"
                  component={this.renderTextArea}
                  type="text"
                  label="Message"
                  placeholder="Send us a message!"
                />
                <Form.Button
                  positive
                  disabled={this.invalid}
                  type="submit"
                  className={classes.Submit}
                >Send
                </Form.Button>
                { !serverError ?
                  null
                  :
                  <Message color="red" size="mini" >{serverError}</Message>
                }
              </Form>
            </Grid.Column>
            <Grid.Column computer={2} mobile={16} />
          </Grid.Row>
          <Grid.Row>
            <Segment className={classes.Map}>
              <iframe
                title="googlemaps"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12095.293033772876!2d-74.04253002684597!3d40.72190712097657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1502051626603&ll=40.7219071, -74.04253"
                width="100%"
                height="250"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
              />
            </Segment>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

// PropTypes here
Contact.propTypes = {
  // Redux-form proptypes
  ...propTypes,
};

// validation front end.
const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Contact Email is Required';
  }

  if (!values.comment) {
    errors.comment = 'Please Enter a Message';
  }

  return errors;
};

export default reduxForm({
  validate,
  // name the form component
  form: 'ContactForm',
})(Contact);
