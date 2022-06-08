'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let prevState = state;

  for (const action of actions) {
    const newState = transform(prevState, action);

    states.push(newState);

    prevState = newState;
  }

  return states;
}

function transform(prevState, action) {
  switch (action.type) {
    case 'clear':
      return {};

    case 'addProperties':
      return {
        ...prevState,
        ...action.extraData,
      };

    case 'removeProperties': {
      const newState = { ...prevState };

      for (const key of action.keysToRemove) {
        delete newState[key];
      }

      return newState;
    };

    default:
      return prevState;
  }
}

module.exports = transformStateWithClones;
