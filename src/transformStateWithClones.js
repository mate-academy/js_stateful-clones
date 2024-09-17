'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateClone, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(stateClone, action.keysToRemove);
        break;

      case 'clear':
        stateClone = {};
        break;

      default:
        break;
    }
    result.push({ ...stateClone });
  }

  return result;
}

function addProperties(stateClone, extraData) {
  Object.assign(stateClone, extraData);
}

function removeProperties(stateClone, keysToRemove) {
  for (const key of keysToRemove) {
    delete stateClone[key];
  }
}

module.exports = transformStateWithClones;
