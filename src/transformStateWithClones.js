'use strict';

function transform(prevState, action) {
  const { type, extraData, keysToRemove } = action;

  switch (type) {
    case 'clear':
      return {};

    case 'addProperties':
      return {
        ...prevState,
        ...extraData,
      };

    case 'removeProperties': {
      const newState = { ...prevState };

      for (const key of keysToRemove) {
        delete newState[key];
      }

      return newState;
    }

    default:
      return { ...prevState };
  }
}

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

module.exports = transformStateWithClones;
