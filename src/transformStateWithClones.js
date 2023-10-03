'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const arrayWithNewStates = [];

  for (const action of actions) {
    transform(newState, action);

    arrayWithNewStates.push({ ...newState });
  }

  return arrayWithNewStates;
}

function transform(newState, action) {
  switch (action.type) {
    case 'addProperties':
      Object.assign(newState, action.extraData);
      break;

    case 'removeProperties':
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
      break;

    case 'clear':
      for (const key of Object.keys(newState)) {
        delete newState[key];
      }
      break;

    default:
      break;
  }

  return newState;
}

module.exports = transformStateWithClones;
