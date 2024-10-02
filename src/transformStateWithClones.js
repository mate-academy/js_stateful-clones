'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateActions = [];
  const stateCopy = {
    ...state,
  };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);
        break;

      case 'clear':
        clearProperties(stateCopy);
        break;

      default:
        return `Error, unknown action type: ${action.type}`;
    }
    stateActions.push({ ...stateCopy });
  }

  return stateActions;
}

function addProperties(stateCopy, extraData) {
  Object.assign(stateCopy, extraData);
}

function removeProperties(stateCopy, keysToRemove) {
  for (const key of keysToRemove) {
    delete stateCopy[key];
  }
}

function clearProperties(stateCopy) {
  for (const key in stateCopy) {
    delete stateCopy[key];
  }
}

module.exports = transformStateWithClones;
