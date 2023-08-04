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

function transformState(stateCopy, action) {
  switch (action.type) {
    case 'addProperties':
      Object.assign(stateCopy, action.extraData);
      break;

    case 'removeProperties':
      for (const property of action.keysToRemove) {
        delete stateCopy[property];
      }
      break;

    case 'clear':
      for (const key in stateCopy) {
        delete stateCopy[key];
      }
      break;

    default:
      throw new Error('Unknown properties');
  }
}

module.exports = transformStateWithClones;
