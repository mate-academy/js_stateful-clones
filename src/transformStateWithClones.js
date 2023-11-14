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
    if (obj.type === 'addProperties') {
      Object.assign(clone, obj.extraData);
    } else if (obj.type === 'removeProperties') {
      for (const remove of obj.keysToRemove) {
        delete clone[remove];
      }
    } else if (obj.type === 'clear') {
      for (const data in clone) {
        delete clone[data];
      }
    }

    result.push(Object.assign({}, clone));
  }

  return result;
}

module.exports = transformStateWithClones;
