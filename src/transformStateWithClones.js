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
  const clone = global.structuredClone(state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          clone[key] = action.extraData[key];
        }
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete clone[key];
        }
        break;
      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }
        break;
    }
    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
