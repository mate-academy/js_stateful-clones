'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete newState[keyToRemove];
        }
        break;
      case 'clear':
        newState = {};
        break;
      default:
        return;
    }

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
