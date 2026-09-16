'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformHistory = [];
  const clonedState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const data in action.extraData) {
          clonedState[data] = action.extraData[data];
        }
        break;

      case 'removeProperties':
        for (const remove of action.keysToRemove) {
          delete clonedState[remove];
        }
        break;

      case 'clear':
        for (const item in clonedState) {
          delete clonedState[item];
        }
        break;

      default:
        return 'Invalid action type';
    }
    transformHistory.push({ ...clonedState });
  }

  return transformHistory;
}

module.exports = transformStateWithClones;
