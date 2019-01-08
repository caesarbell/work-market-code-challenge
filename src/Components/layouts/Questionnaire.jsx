import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { retrieveData } from '../../redux/actions/questions';
import { getUser, isUserSignedIn } from '../../redux/actions/user';
import { connect } from 'react-redux';
import QuestionBlocks from '../questions/QuestionBlocks';
import {
  isLocalStorageEnable,
  addItemToLocalStorage,
  retrieveAnwsersFromLocalStorage,
} from '../../jobs/storage/localStore';
import ModalSignIn from '../modal/ModalSignIn';

class Questionnaire extends Component {
  static propTypes = {
    questions: PropTypes.object.isRequired,
    retrieveData: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    isUserSignedIn: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { submitted: false, modal: false };

    this.onSubmit = this.onSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onShowResults = this.onShowResults.bind(this);
  }
  componentDidMount() {
    const { retrieveData, isUserSignedIn } = this.props;

    retrieveData();
    isUserSignedIn();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.questions.data.length !== this.props.questions.data.length) {
      const { data } = this.props.questions;
      console.log('data', data);
      if (isLocalStorageEnable) {
        addItemToLocalStorage('questions', data);
      }
    }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  onSignIn() {
    this.setState({
      modal: true,
    });
  }

  onSubmit() {
    const { selectedAnswers } = this.props.questions;
    addItemToLocalStorage('results', selectedAnswers);

    this.setState({
      submitted: true,
    });
  }

  onShowResults() {
    window.location.href = '/results';
    this.setState({
      submitted: false,
    });
  }

  render() {
    const { submitted, modal } = this.state;
    const { data, loading, selectedAnswers } = this.props.questions;
    const { user, error, loadingUser } = this.props.user;
    let content;

    if (loading) {
      content = (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    } else if (data.length < 1) {
      content = (
        <p>
          Opps... there seems to be no questions at this time,{' '}
          {user.hasOwnProperty('username')
            ? 'click on your avatar and add some'
            : 'sign in and add some'}
          .
        </p>
      );
    } else {
      content = data.map((value, index) => {
        const question = value.question;
        const answers = value.answers;
        return <QuestionBlocks
          key={index}
          number={index}
          selectedAnswer={selectedAnswers}
          question={question}
          answers={answers}
        />
      });
    }

    return (
      <div>
        <div className="text-center">
          <div className="row">
            <div className="col-md">
              <h2 style={{ paddingBottom: '50px' }}>
                Welcome Questionnaire Page
              </h2>
            </div>
            <div className="col-md-2">
              {user.hasOwnProperty('username') ? (
                <Link to="/admin">
                  <img
                    className="rounded-circle mt-3"
                    style={{ width: '30%' }}
                    src="http://i.pravatar.cc/100"
                    alt=""
                  />
                </Link>
              ) : (
                <button
                  className="text-white rounded bg-dark border-0 mt-2 px-2"
                  onClick={this.onSignIn}
                >
                  {loadingUser ? 'Loading...' : 'Sign In'}
                </button>
              )}
              <p className="text-danger" style={{ fontSize: '8px' }}>
                {' '}
                {error !== null ? error : ''}
              </p>
            </div>
          </div>
        </div>
        <div />
        <div style={{ marginTop: '50px' }}>
          {content}
          <Button
            className={`my-4 border-0 d-block ${
              selectedAnswers.length >= 1 &&
              data.length === selectedAnswers.length
                ? 'bg-info'
                : 'bg-secondary'
            }`}
            disabled={
              selectedAnswers.length >= 1 &&
              data.length === selectedAnswers.length
                ? false
                : true
            }
            onClick={this.onSubmit}
          >
            {submitted ? 'Submitted' : 'Submit'}
          </Button>
          {(() => {
            if (loading) {
              return <div />;
            } else if (
              submitted ||
              retrieveAnwsersFromLocalStorage()
            ) {
              return (
                <Button
                  className="d-block bg-info text-white p-2 rounded text-uppercase border-0"
                  onClick={this.onShowResults}
                >
                  Show Results
                </Button>
              );
            }
          })()}
        </div>
        <ModalSignIn isOpen={modal} toggle={this.toggle} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.questions,
  user: state.user,
});

const mapDispatchToState = {
  retrieveData,
  getUser,
  isUserSignedIn,
};

export default connect(
  mapStateToProps,
  mapDispatchToState
)(Questionnaire);
