'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const arr = [];

  for (let i = 0; i < actions.length; i++) {
    for (const key in actions[i]) {
      switch (actions[i][key]) {
        case 'removeProperties':
          for (let j = 0; j < actions[i].keysToRemove.length; j++) {
            delete clone[actions[i].keysToRemove[j]];
          }
          arr[i] = { ...clone };
          break;

        case 'addProperties':
          Object.assign(clone, actions[i].extraData);
          arr[i] = { ...clone };
          break;

        case 'clear':
          for (const item in clone) {
            delete clone[item];
          }
          arr[i] = { ...clone };
          break;
      }
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
