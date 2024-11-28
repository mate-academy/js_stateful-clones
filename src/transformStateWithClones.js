'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actionss) {
  const stateNeww = { ...state };
  const sttates = [];

  for (const action of actionss) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          stateNeww[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (key in stateNeww) {
            delete stateNeww[key];
          }
        }
        break;

      case 'clear':
        for (const key in stateNeww) {
          delete stateNeww[key];
        }
        break;

      default:
        throw new Error('error');
    }
    sttates.push({ ...stateNeww });
  }

  return sttates;
}

module.exports = transformStateWithClones;
