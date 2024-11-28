'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionsArray = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);
        break;
      case 'clear':
        stateCopy = {};
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    actionsArray.push({ ...stateCopy });
  }

  return actionsArray;
}

function addProperties(stateCopy, extraData) {
  Object.assign(stateCopy, extraData);
}

function removeProperties(stateCopy, keysToRemove) {
  for (const keyToRemove of keysToRemove) {
    delete stateCopy[keyToRemove];
  }
}

module.exports = transformStateWithClones;
