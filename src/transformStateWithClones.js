'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = Object.assign({}, state);
  const result = [];

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(clone, obj.extraData);
        break;
      case 'removeProperties':
        for (const remove of obj.keysToRemove) {
          delete clone[remove];
        }
        break;

      case 'clear':
        for (const data in clone) {
          delete clone[data];
        }
    }

    result.push(Object.assign({}, clone));
  }

  return result;
}

module.exports = transformStateWithClones;
