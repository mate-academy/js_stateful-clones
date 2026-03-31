'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];
  let copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        copyState = {};
        break;

      case 'removeProperties':
        copyState = { ...copyState };

        for (const keyToRemove of action.keysToRemove) {
          delete copyState[keyToRemove];
        }
        break;

      case 'addProperties':
        copyState = { ...copyState, ...action.extraData };
        break;

      default:
        continue;
    }

    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
