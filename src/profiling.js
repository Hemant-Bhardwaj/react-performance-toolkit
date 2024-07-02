import React, { Profiler } from 'react';
import PropTypes from 'prop-types';

const logProfile = (id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) => {
  console.log(`Profiled ${id} in ${phase} phase.`);
  console.log(`Actual duration: ${actualDuration}`);
  console.log(`Base duration: ${baseDuration}`);
  console.log(`Start time: ${startTime}`);
  console.log(`Commit time: ${commitTime}`);
  console.log('Interactions:', interactions);
};

export const withProfiler = (Component, id) => {
  const WrappedComponent = (props) => (
    <Profiler id={id} onRender={logProfile}>
      <Component {...props} />
    </Profiler>
  );

  WrappedComponent.propTypes = {
    id: PropTypes.string.isRequired,
  };

  return WrappedComponent;
};
