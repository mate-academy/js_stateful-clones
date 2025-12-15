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

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        if (action.extraData && typeof action.extraData === 'object') {
          Object.assign(currentState, action.extraData);
        }
        break;
      case 'removeProperties':
        if (action.keysToRemove && Array.isArray(action.keysToRemove)) {
          for (const removeKey of action.keysToRemove) {
            delete currentState[removeKey];
          }
        }
        break;
      case 'clear':
        currentState = {};
        break;
      default:
        throw new Error(`Unknown action type encountered: ${action.type}`);
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
