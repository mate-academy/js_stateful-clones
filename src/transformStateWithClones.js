'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateCopy = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateHistory.push(addProperties(stateCopy, action.extraData));
        break;
      case 'removeProperties':
        stateHistory.push(removeProperties(stateCopy, action.keysToRemove));
        break;
      case 'clear':
        stateHistory.push(clearState(stateCopy));
        break;
    }
  }

  return stateHistory;
}

function addProperties(stateCopy, properties) {
  for (const prop in properties) {
    stateCopy[prop] = properties[prop];
  }

  return { ...stateCopy };
}

function removeProperties(stateCopy, properties) {
  for (const prop of properties) {
    delete stateCopy[prop];
  }

  return { ...stateCopy };
}

function clearState(stateCopy) {
  for (const state in stateCopy) {
    delete stateCopy[state];
  }

  return { ...stateCopy };
}

module.exports = transformStateWithClones;
