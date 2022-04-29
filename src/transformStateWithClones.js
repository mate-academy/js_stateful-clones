'use strict';

/*
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const clone = { ...state };

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(clone, obj.extraData);
        break;

      case 'removeProperties':
        for (const key of obj.keysToRemove) {
          delete clone[key];
        }
        break;

      case 'clear':
        for (const prop in clone) {
          delete clone[prop];
        }
    }

    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
