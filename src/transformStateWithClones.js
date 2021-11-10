'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const newObj = { ...state };

  for (const i in actions) {
    for (const key in actions[i]) {
      switch (actions[i][key]) {
        case 'addProperties':
          for (const key1 in actions[i]['extraData']) {
            newObj[key1] = actions[i]['extraData'][key1];
          }
          break;

        case 'removeProperties':
          for (const key1 of actions[i]['keysToRemove']) {
            delete newObj[key1];
          }
          break;

        case 'clear':
          for (const key1 in newObj) {
            delete newObj[key1];
          }
      }
    }
    result[i] = { ...newObj };
  }

  return result;
}

module.exports = transformStateWithClones;
