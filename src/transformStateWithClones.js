'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const allPreviousVersionsOfState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(action, copyState);
        break;

      case 'clear':
        clear(copyState);
        break;

      default:
        throw new Error(`Unknown action type ${action.type}.`);
    }

    allPreviousVersionsOfState.push({ ...copyState });
  }

  return allPreviousVersionsOfState;
}

function removeProperties(object, keysToRemove) {
  for (const key of object.keysToRemove) {
    delete keysToRemove[key];
  }
}

function clear(object) {
  for (const key in object) {
    delete object[key];
  }
}

module.exports = transformStateWithClones;
