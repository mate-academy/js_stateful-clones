'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const previousVersionsArray = [];
  let stateClone = { ...state };

  for (const action of actions) {
    stateClone = { ...stateClone };

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;
      case 'removeProperties':
        for (const property of action.keysToRemove) {
          delete stateClone[property];
        }
        break;
      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;
      default:
        break;
    }
    previousVersionsArray.push(stateClone);
  }

  return previousVersionsArray;
}

module.exports = transformStateWithClones;
