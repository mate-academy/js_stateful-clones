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

  for (const { type, ...action } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (cloneState.hasOwnProperty(key)) {
            delete cloneState[key];
          }
        }
        break;

      case 'clear':
        for (const key in cloneState) {
          delete cloneState[key];
        }
        break;

      default:
        throw new Error('Wrong Type');
    }

    result.push({ ...cloneState });
  }

  return result;
}

module.exports = transformStateWithClones;
