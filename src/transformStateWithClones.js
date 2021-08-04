'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = [];
  const clone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clone, action.extraData);
        break;
      case 'removeProperties':
        for (const toDelete of action.keysToRemove) {
          if (Object.prototype.hasOwnProperty.call(clone, toDelete)) {
            delete clone[toDelete];
          }
        }
        break;
      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }
        break;
    }
    clones.push({ ...clone });
  }

  return clones;
}

module.exports = transformStateWithClones;
