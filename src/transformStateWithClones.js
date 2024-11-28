'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const listOfStates = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);
        break;
      case 'clear':
        clear(stateCopy);
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    listOfStates.push({ ...stateCopy });
  }

  return listOfStates;
}

function addProperties(copyState, extraData) {
  Object.assign(copyState, extraData);
}

function removeProperties(copyState, keysToRemove) {
  for (const key of keysToRemove) {
    delete copyState[key];
  }
}

function clear(copyState) {
  for (const key in copyState) {
    delete copyState[key];
  }
}

module.exports = transformStateWithClones;
