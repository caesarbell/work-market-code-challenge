import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import { getUser } from '../../redux/actions/user';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ModalSignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
  };

  toggle() {
    this.props.toggle();
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const { toggle, getUser } = this.props;

    getUser({
      username,
      password,
    });
    toggle();
  }

  render() {
    const { isOpen } = this.props;
    const { username, password } = this.state;
    return <div>
        <Modal isOpen={isOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Sign In</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input type="text" name="username" id="username" placeholder="johndoe" value={username} onChange={this.onChange} required />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="***" value={password} onChange={this.onChange} required />
              </FormGroup>
              <Button type="submit" color="primary">
                Sign In
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>;
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
  getUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalSignIn);
