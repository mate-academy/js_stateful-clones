'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const property of actions) {
    let stateClone = { ...currentState };

    switch (property.type) {
      case 'addProperties':
        stateClone = { ...stateClone, ...property.extraData };
        break;

      case 'removeProperties':
        for (const key of property.keysToRemove) {
          delete stateClone[key];
        }
        break;

      case 'clear':
        stateClone = {};
        break;

      default:
        throw new Error(`Unknown action type: ${property.type}`);
    }

    result.push(stateClone);
    currentState = stateClone;
  }

  return result;
}
module.exports = transformStateWithClones;
