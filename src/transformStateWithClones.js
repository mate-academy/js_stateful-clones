'use strict';

function transform(state, action) {
  switch (action.type) {
    case 'clear':
      return {};

    case 'addProperties':
      return {
        ...state,
        ...action.extraData,
      };

    case 'removeProperties': {
      const copy = { ...state };

      for (const key of action.keysToRemove) {
        delete copy[key];
      }

      return copy;
    }

    default:
      return state;
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
