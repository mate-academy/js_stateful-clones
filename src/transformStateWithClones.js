'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = [];
  const obj = { ...state };

  for (const i in actions) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(obj, actions[i].extraData);
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete obj[key];
        }
        break;

      case 'clear':
        for (const key in obj) {
          delete obj[key];
        }
        break;

      default:
        break;
    }

    clones.push({ ...obj });
  }

  return clones;
}

module.exports = transformStateWithClones;
