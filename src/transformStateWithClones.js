'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let prevState = state;

  for (const action of actions) {
    const newState = transform(prevState, action);

    result.push(newState);
    prevState = newState;
  }

  return result;
}

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

      for (const keys of keysToRemove) {
        delete newState[keys];
      }

      return newState;
    }

    default:
      return prevState;
  }
}

module.exports = transformStateWithClones;
