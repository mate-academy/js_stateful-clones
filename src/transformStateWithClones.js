'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateResults = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    transformState(stateCopy, action);

    stateResults.push({ ...stateCopy });
  }

  return stateResults;
}

/**
 * @param {Object} state
 * @param {Object} action
 */
function transformState(state, action) {
  switch (action.type) {
    case 'addProperties':
      Object.assign(state, action.extraData);
      break;

    case 'removeProperties':
      for (const property of action.keysToRemove) {
        delete state[property];
      }
      break;

    case 'clear':
      for (const key in state) {
        delete state[key];
      }
      break;

    default:
      throw new Error('Hey ho!');
  }
}

module.exports = transformStateWithClones;
