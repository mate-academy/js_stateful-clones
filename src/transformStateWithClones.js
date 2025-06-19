'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateCopy = addProperties(stateCopy, action.extraData);
        stateHistory.push({ ...stateCopy });
        break;

      case 'removeProperties':
        stateCopy = removeProperties(stateCopy, action.keysToRemove);
        stateHistory.push({ ...stateCopy });
        break;

      case 'clear':
        stateCopy = {};
        stateHistory.push({ ...stateCopy });
        break;

      default:
        break;
    }
  }

  return stateHistory;
}

function addProperties(state, properties) {
  return Object.assign(state, properties);
}

function removeProperties(state, properties) {
  for (const props of properties) {
    delete state[props];
  }

  return state;
}

module.exports = transformStateWithClones;
