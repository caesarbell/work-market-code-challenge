import React from 'react'
import PropTypes from 'prop-types'
import AnswerBlock from '../answer/AnswerBlock';

const QuestionBlocks = props => {
    const { question, number, answers, selectedAnswer } = props;
    console.log('selectedAnswer', selectedAnswer);
    let checked; 

    return <div style={{ width: '400px' }}>
        <p className="mt-4">
          <span>Q{number + 1}:</span> {question} ?
        </p>
       {answers.map((answer, index) => {

           return <AnswerBlock 
                        key={index} 
                        number={number} 
                        checked={checked} 
                        option={answer}
                        question={`q${number + 1}`}
                        selectedAnswer={selectedAnswer} /> 
       })}
      </div>;
}

QuestionBlocks.propTypes = {
    question: PropTypes.string.isRequired,
    answers: PropTypes.array.isRequired,
    number: PropTypes.number.isRequired
}

export default QuestionBlocks
