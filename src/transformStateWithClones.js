'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  const cloneState = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(cloneState, extraData);
        break;

      case 'removeProperties':
        for (const j of keysToRemove) {
          if (cloneState.hasOwnProperty(j)) {
            delete cloneState[j];
          }
        }
        break;

      case 'clear':
        for (const k in cloneState) {
          delete cloneState[k];
        }
        break;

      default:
        break;
    }

    result.push({ ...cloneState });
  }

  return result;
}

module.exports = transformStateWithClones;
