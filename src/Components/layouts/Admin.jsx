import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import AdminTextBlock from '../admin/AdminTextBlock';
import PropTypes from 'prop-types';
import { updateData, clearQuestions } from '.././../redux/actions/questions';
import { connect } from 'react-redux';
import AdminSubmitButtons from '../admin/AdminSubmitButtons';
import {
  removeItemsFromLocalStorage,
  retrieveQuestionsFromLocalStorage,
  retrieveAnwsersFromLocalStorage,
} from '../../jobs/storage/localStore';

class Admin extends Component {
  static propTypes = {
    updateData: PropTypes.func.isRequired,
    questions: PropTypes.object.isRequired,
    clearQuestions: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      question: '',
      answers: [],
      submitted: false,
      clearedQuestions: false,
      clearedAnswers: false,
    };

    this.onEnterQuestion = this.onEnterQuestion.bind(this);
    this.onEnterAnswer = this.onEnterAnswer.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClearStorage = this.onClearStorage.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
  }

  onEnterQuestion(e) {
    this.setState({
      question: e.target.value,
      submitted: false,
      clearedAnswers: false,
      clearedQuestions: false,
    });
  }

  onEnterAnswer(e) {
    const { answers } = this.state;
    answers[Number(e.target.name)] = e.target.value;

    this.setState({
      answers,
      submitted: false,
      clearedAnswers: false,
      clearedQuestions: false,
    });
  }

  onSignOut() {
    removeItemsFromLocalStorage('user');
    window.location.href = '/';
  }

  onSubmit() {
    const { updateData } = this.props;
    const { question, answers } = this.state;

    updateData({
      question,
      answers,
    });

    this.setState({
      question: '',
      answers: [],
      submitted: true,
    });
  }

  onClearStorage(e) {
    let clear;
    const { clearQuestions } = this.props;

    switch (e.target.value) {
      case 'questions':
        clear = 'clearedQuestions';
        break;
      case 'results':
        clear = 'clearedAnswers';
        break;
      default:
        break;
    }

    clearQuestions(e.target.value);

    this.setState({
      [clear]: true,
    });
  }

  render() {
    const { pending } = this.props.questions;
    const { submitted, clearedAnswers, clearedQuestions } = this.state;
    let submit = 'Submit';

    if (pending) {
      submit = 'Pending';
    } else if (submitted) {
      submit = 'Complete';
    }
    return (
      <div className="text-center">
        <h2>Admin Panel</h2>
        <Button onClick={this.onSignOut}>Sign out</Button>
        <div className="row" style={{ marginTop: '90px' }}>
          <div className="col-md-6 mx-auto">
            <p>Enter your question</p>
            <AdminTextBlock
              type="textarea"
              style={{ resize: 'none' }}
              value={this.state.question}
              onChange={this.onEnterQuestion}
            />
            <small>Limit is set to 140 max characters</small>

            <p style={{ marginTop: '50px' }}>
              Enter up to four possible answers
            </p>
            <AdminTextBlock
              type="text"
              name="0"
              placeholder="Answer 1"
              value={this.state.answers[0]}
              onChange={this.onEnterAnswer}
            />
            <AdminTextBlock
              type="text"
              name="1"
              placeholder="Answer 2"
              value={this.state.answers[1]}
              onChange={this.onEnterAnswer}
            />
            <AdminTextBlock
              type="text"
              name="2"
              placeholder="Answer 3"
              value={this.state.answers[2]}
              onChange={this.onEnterAnswer}
            />
            <AdminTextBlock
              type="text"
              name="3"
              placeholder="Answer 4"
              value={this.state.answers[3]}
              onChange={this.onEnterAnswer}
            />
          </div>
        </div>

        <div className="mb-4">
          <AdminSubmitButtons name={submit} onClick={this.onSubmit} />
          <AdminSubmitButtons
            name={
              clearedQuestions
                ? 'Cleared'
                : `Clear Questions (${
                    retrieveQuestionsFromLocalStorage()
                      ? retrieveQuestionsFromLocalStorage().length
                      : ''
                  })`
            }
            value="questions"
            onClick={this.onClearStorage}
          />
          <AdminSubmitButtons
            name={
              clearedAnswers
                ? 'Cleared'
                : `Clear Submissions (${
                    retrieveAnwsersFromLocalStorage()
                      ? retrieveAnwsersFromLocalStorage().length
                      : ''
                  })`
            }
            value="results"
            onClick={this.onClearStorage}
          />
        </div>
        <small style={{ paddingBottom: '30px' }}>
          Submmit questions and answers and if you want to see your questions
          click {''}
        </small>
        <Link style={{ fontSize: '13px' }} to="/poll">
          {' '}
          here
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.questions,
});

const mapDispatchToProps = {
  updateData,
  clearQuestions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
