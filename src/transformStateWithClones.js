'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const copyActions = [ ...actions ];
  const result = [];

  for (const action of copyActions) {
    findActions(copyState, action, result);
  }

  return result;
}

function findActions(state, action, result) {
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
      for (const key of Object.keys(state)) {
        delete state[key];
      }
      break;

    default:
      const errorObject = { error: 'Unknown action type' };

      result.push(errorObject);
      break;
  }

  result.push({ ...state });
}

module.exports = transformStateWithClones;
