import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectAnswer } from '../../redux/actions/questions'

class AnswerBlock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: ''
        }

        this.onSelectAnswer = this.onSelectAnswer.bind(this);

    }

    onSelectAnswer(e) {
        const { selectAnswer, number } = this.props;
        selectAnswer({
            q: `q${number + 1}`,
            a: e.target.value
        })

        this.setState({ selected: e.target.value });
    }

    render() {
        const { option, question, selectedAnswer } = this.props;
        const { selected } = this.state;
        let checked; 

        const found = selectedAnswer.find(selection => {
            return selection.q === question && selection.a === selected; 
        })

        checked = found ? true : false; 

        return (
            <div>
            <input
                type="radio"
                value={option}
                checked={checked}
                onChange={this.onSelectAnswer}
            />{' '}
            {option}
            </div>
        );
  }
}

AnswerBlock.propTypes = {
    option: PropTypes.string.isRequired,
    questions: PropTypes.object.isRequired,
    selectAnswer: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    questions: state.questions
});

const mapDispatchToProps = {
    selectAnswer
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnswerBlock)
