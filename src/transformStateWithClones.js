'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function removeProperties(object, keysToRemove) {
  for (const keyToRemove of keysToRemove) {
    delete object[keyToRemove];
  }
}

function clearObject(object) {
  for (const key in object) {
    delete object[key];
  }
}

function transformStateWithClones(state, actions) {
  const versionsOfState = [];
  const stateClone = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateClone, stateClone, extraData);
        break;

      case 'removeProperties':
        removeProperties(stateClone, keysToRemove);
        break;

      case 'clear':
        clearObject(stateClone);
        break;

      default:
        throw new Error(`Unknown action type ${action.type}`);
    }

    versionsOfState.push({ ...stateClone });
  }

  return versionsOfState;
}

module.exports = transformStateWithClones;
