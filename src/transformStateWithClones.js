'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const results = [];

  let clonedState = { ...state };

  for (const action of actions) {
    const temporaryState = { ...clonedState };

    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          temporaryState[key] = action.extraData[key];
        }
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete temporaryState[key];
        }
        break;
      case 'clear':
        for (const key in temporaryState) {
          delete temporaryState[key];
        }
        break;
      default:
        throw new Error('Unexpected action.type' + action.type);
    }
    results.push(temporaryState);
    clonedState = temporaryState;
  }

  return results;
}

module.exports = transformStateWithClones;
