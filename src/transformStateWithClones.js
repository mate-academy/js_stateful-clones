'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = { ...state };
  const result = [];

  for (const obj of actions) {
    switch (obj.type) {
      case
        'addProperties':
        Object.assign(copy, obj.extraData);
        break;

      case
        'removeProperties':
        for (const keys of obj.keysToRemove) {
          delete copy[keys];
        };
        break;

      case
        'clear':
        for (const i in copy) {
          delete copy[i];
        }
    }
    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;
