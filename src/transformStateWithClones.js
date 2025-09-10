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
  let stateNew = { ...state };

  for (const value of actions) {
    switch (value.type) {
      case 'addProperties':
        stateNew = { ...stateNew, ...value.extraData };
        // Object.assign(stateNew, value.extraData);

        break;

      case 'removeProperties':
        stateNew = { ...stateNew };

        for (const key of value.keysToRemove) {
          delete stateNew[key];
        }

        break;

      case 'clear':
        stateNew = {};
        break;
      default:
        throw new Error('Unknown action type');
    }
    result.push({ ...stateNew });
  }

  return result;
}

module.exports = transformStateWithClones;
