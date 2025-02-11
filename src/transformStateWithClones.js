'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];
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
        clearProperties(stateCopy);
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    result.push({ ...stateCopy });
  }

  return result;
}

function addProperties(obj, extraData) {
  Object.assign(obj, extraData);
}

function removeProperties(obj, keysToRemove) {
  for (const key of keysToRemove) {
    delete obj[key];
  }
}

function clearProperties(obj) {
  for (const key in obj) {
    delete obj[key];
  }
}

module.exports = transformStateWithClones;
