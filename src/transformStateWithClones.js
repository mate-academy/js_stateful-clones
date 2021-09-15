'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = [];

  const buf = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(buf, actions[i].extraData);
        clone.push({ ...buf });
        break;
      case 'removeProperties':
        for (const key in actions[i].keysToRemove) {
          delete buf[actions[i].keysToRemove[key]];
        }
        clone.push({ ...buf });
        break;
      case 'clear':
        for (const key in buf) {
          delete buf[key];
        }
        clone.push({ ...buf });
        break;
    }
  }

  return clone;
}

module.exports = transformStateWithClones;
