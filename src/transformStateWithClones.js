'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let clone = { ...state };
  const result = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(clone, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const item of action.keysToRemove) {
        if (clone.hasOwnProperty(item)) {
          delete clone[item];
        }
      }
    }

    if (action.type === `clear`) {
      for (const key in clone) {
        delete clone[key];
      }
    }

    result.push(clone);
    clone = { ...result[result.length - 1] };
  }

  return result;
}

module.exports = transformStateWithClones;
