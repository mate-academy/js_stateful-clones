'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let result = [];

  for (const action of actions) {
    const newState = structuredClone(state);

    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          newState[key] = action.extraData[key];
        }
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;

      default:
        for (const key in newState) {
          delete newState[key];
        }
    }
    result.push(newState);
  }

  return result;
}

module.exports = transformStateWithClones;
