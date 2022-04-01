'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const fullClone = [];

  for (const key of actions) {
    if (key.type === 'addProperties') {
      Object.assign(clone, key.extraData);
    } else if (key.type === 'removeProperties') {
      for (let i = 0; i < key.keysToRemove.length; i++) {
        delete clone[key.keysToRemove[i]];
      }
    } else if (key.type === 'clear') {
      for (const forDelete in clone) {
        delete clone[forDelete];
      }
    }
    fullClone.push({ ...clone });
  }

  return fullClone;
}

module.exports = transformStateWithClones;
