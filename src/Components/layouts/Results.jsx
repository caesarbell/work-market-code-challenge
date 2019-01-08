import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { retrieveAnwsersFromLocalStorage } from '../../jobs/storage/localStore';

const Results = () => {
  const answers = retrieveAnwsersFromLocalStorage() || [];
  return (
    <Fragment>
      <h2 className="text-center">Results</h2>
      <div className="row">
        <div className="col-md-6 mx-auto mt-4">
          {answers.length >= 1 ? (
            answers.map((answer, index) => (
              <p key={index}>
                <span className="text-uppercase">{answer.q}</span>{' '}
                <span> {answer.a}</span>
              </p>
            ))
          ) : (
            <p
              className="text-center font-weight-bold"
              style={{ fontSize: '20px' }}
            >
              There is no answers saved at this time.
            </p>
          )}
          <Link className="btn btn-info" to="/poll">Go Back</Link>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  questions: state.questions,
});

const mapDistpatchToProps = {};

export default connect(
  mapStateToProps,
  mapDistpatchToProps
)(Results);
