'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copiedState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        copiedState = {
          ...copiedState, ...action.extraData,
        };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copiedState[key];
        }
        break;

      case 'clear':
        copiedState = {};
        break;

      default:
        throw new Error('Unknown action');
    }

    result.push({ ...copiedState });
  }

  return result;
}

module.exports = transformStateWithClones;
