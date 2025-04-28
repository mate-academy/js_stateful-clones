'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const cloneState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key in cloneState) {
          delete cloneState[key];
        }
        break;

      case 'addProperties':
        for (const key in action.extraData) {
          cloneState[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete cloneState[key];
        }
        break;

      default:
        throw new Error('Wrong type');
    }
    result.push({ ...cloneState });
  }

  return result;
}

module.exports = transformStateWithClones;
