'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateClones = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(action.extraData);
        break;
      case 'removeProperties':
        removeProperties(action.keysToRemove);
        break;
      case 'clear':
        clear();
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    stateClones.push({ ...stateCopy });
  }

  function addProperties(extraData) {
    Object.assign(stateCopy, extraData);
  }

  function removeProperties(keysToRemove) {
    for (const key of keysToRemove) {
      delete stateCopy[key];
    }
  }

  function clear() {
    for (const key in stateCopy) {
      delete stateCopy[key];
    }
  }

  return stateClones;
}

module.exports = transformStateWithClones;
