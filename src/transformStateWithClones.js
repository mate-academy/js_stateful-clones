'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformations = [];
  const midState = { ...state };
  let index = 0;

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          midState[key] = action.extraData[key];
        }
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete midState[key];
        }
        break;
      case 'clear':
        for (const key in midState) {
          delete midState[key];
        }
        break;
      default:
        break;
    }
    transformations[index] = { ...midState };
    index++;
  }

  return transformations;
}

module.exports = transformStateWithClones;
