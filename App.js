import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMailBulk, faCity } from "@fortawesome/free-solid-svg-icons";

import { Alert, Button, Container, Row, Col } from "react-bootstrap";
import { Form, InputGroup, ToggleButtonGroup, ToggleButton } from "react-bootstrap";

import validator, { field } from './validator';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      username: field({value:'', name: 'username', minLength: 2}),
      phonenumber:    field({value: '', name: 'phonenumber', pattern: /^\d{3}-\d{7}$/}),
      howyoureachedus:  field({value: '', name: ' howyoureachedus', minLength:2}),
      
    //{ value: "", errors: [], valid: true, validations: { isRequired: true} }
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange({ target: { name, value } }) {
    console.log(name, value);

    //Each value should be validated each time it changes!
    //For example: username should be
    //1- required and
    //2- more than 2 characters

    //So we did required...
    //How can we do #2?
    //How can we know we need to check this value for minimum length?
    //We need to further change our state...

    this.setState({
      [name]: {
        ...this.state[name],
        value,
        ...validator(value, name, this.state[name].validations)
      }
    });
  }

  onSubmit(e) {
    
    const user = Object.assign({}, this.state);

    for(let key in user){
        const { value, validations } = user[key];

        const { valid, errors } = validator(value, key, validations);

        if(!valid){
            user[key].valid = valid;
            user[key].errors = errors;
        }
    }

    this.setState({...user});
    //Send data to somewhere 
    //...
    e.preventDefault();
  }

  render() {
    return (
      <Alert variant="success">
        <Container>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <h1> Contact Us Form</h1>
              <hr />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <Row>
                  <Col>
                    <Form.Group controlId="formControlUsername">
                      <Form.Label>Username</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faUser} />
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          name="username"
                          placeholder="Enter your Username  "
                          aria-label="Username"
                          defaultValue={this.state.username.value}
                          onBlur={this.onInputChange}
                        />
                      </InputGroup>
                      {this.state.username.errors.map((err, i) => (
                        <Form.Text key={i} className="text-danger">
                          {err}
                        </Form.Text>
                      ))}
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formControlphone">
                      <Form.Label>phone number</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faMailBulk} />
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          name="phonenumber"
                          placeholder="Enter your phone number"
                          aria-label="phonenumber"
                          defaultValue={this.state.phonenumber.value}
                          onBlur={this.onInputChange}
                        />
                      </InputGroup>
                      {this.state.phonenumber.errors.map((err, i) => (
                        <Form.Text key={i} className="text-danger">
                          {err}
                        </Form.Text>
                      ))}
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col>
                    <Form.Group controlId="formControlhowyoureachedus">
                      <Form.Label>how you reached us</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                          <InputGroup.Text>
                            <FontAwesomeIcon icon={faMailBulk} />
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          as="select"
                          name="howyoureachedus"
                          defaultValue={this.state.howyoureachedus.value}
                          onBlur={this.onInputChange}
                        >
                         <option value="choosefromoption">choose from option</option>
                          <option value="advertisment">advertisment</option>
                          <option value="news">news</option>
                          <option value="friends">friends</option>
                          <option value="socialmedia">social media</option>
                         
                        </Form.Control>
                      </InputGroup>
                    </Form.Group>
                    {this.state.howyoureachedus.errors.map((err, i) => (
                        <Form.Text key={i} className="text-danger">
                          {err}
                        </Form.Text>
                      ))}
                  </Col>
                  
                </Row>
                <Button variant="primary" type="submit">
                  Submit
                         
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Alert>
    );
  }
}
