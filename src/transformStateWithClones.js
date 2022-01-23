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

  for (const x of actions) {
    if (x.type === 'addProperties') {
      Object.assign(clone, x.extraData);
      result.push(clone);
      clone = { ...result[result.length - 1] };
    }

    if (x.type === 'removeProperties') {
      for (const item of x.keysToRemove) {
        if (clone.hasOwnProperty(item)) {
          delete clone[item];
        }
      }
      result.push(clone);
      clone = { ...result[result.length - 1] };
    }

    if (x.type === `clear`) {
      for (const key in clone) {
        delete clone[key];
      }
      result.push(clone);
      clone = { ...result[result.length - 1] };
    }
  }

  return result;
}

module.exports = transformStateWithClones;
