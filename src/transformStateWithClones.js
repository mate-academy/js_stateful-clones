'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let nextState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(nextState, action.extraData);
        break;
      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete nextState[keyToRemove];
        }
        break;
      case 'clear':
        nextState = {};
        break;
      default:
        return;
    }

    result.push({ ...nextState });
  }

  return result;
}

module.exports = transformStateWithClones;
