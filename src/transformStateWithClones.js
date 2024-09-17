'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const statesHistory = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    transform(stateCopy, action);
    statesHistory.push({ ...stateCopy });
  }

  return statesHistory;
}

function transform(state, action) {
  switch (action.type) {
    case 'addProperties':
      Object.assign(state, action.extraData);
      break;

    case 'removeProperties':
      for (const key of action.keysToRemove) {
        delete state[key];
      }
      break;

    case 'clear':
      for (const key in state) {
        delete state[key];
      }
      break;

    default: {
      break;
    }
  }
}

module.exports = transformStateWithClones;
