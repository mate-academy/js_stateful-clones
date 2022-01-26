'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateNew = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateNew, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateNew[key];
        }
        break;

      case 'clear':
        for (const key in stateNew) {
          delete stateNew[key];
        }
        break;
      default:
    }
    result.push({ ...stateNew });
  }

  return result;
}

module.exports = transformStateWithClones;
