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
  let index = 0;

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        Object.assign(clone, action.extraData);
        clones[index] = {};
        Object.assign(clones[index], clone);
        break;
      }

      case 'clear': {
        for (const key in clone) {
          if (clone.hasOwnProperty(key)) {
            delete clone[key];
          }
        }
        clones[index] = {};
        Object.assign(clones[index], clone);
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete clone[key];
        }
        clones[index] = {};
        Object.assign(clones[index], clone);
        break;
      }
    }
    index++;
  }

  return clones;
}

module.exports = transformStateWithClones;
