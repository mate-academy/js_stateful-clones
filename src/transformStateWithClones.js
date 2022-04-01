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
    switch (key.type) {
      case 'addProperties': {
        Object.assign(clone, key.extraData);
        break;
      }

      case 'removeProperties': {
        for (let i = 0; i < key.keysToRemove.length; i++) {
          delete clone[key.keysToRemove[i]];
        }
        break;
      }

      case 'clear': {
        for (const forDelete in clone) {
          delete clone[forDelete];
        }
        break;
      }
    }

    fullClone.push({ ...clone });
  }

  return fullClone;
}

module.exports = transformStateWithClones;
