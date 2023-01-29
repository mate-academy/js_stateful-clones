'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copy = { ...state };

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(copy, obj.extraData);
        break;

      case 'removeProperties':
        for (const removeArr of obj.keysToRemove) {
          delete copy[removeArr];
        }
        break;

      case 'clear':
        for (const prop in copy) {
          delete copy[prop];
        }
        break;
    }
    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;
