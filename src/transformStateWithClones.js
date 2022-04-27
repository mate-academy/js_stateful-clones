'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let newState = { ...state };
  const result = [];

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(newState, obj.extraData);
        break;

      case 'removeProperties':
        for (const key2 of obj.keysToRemove) {
          delete newState[key2];
        }
        break;

      default:
        newState = {};
    }

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
