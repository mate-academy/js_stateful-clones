'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newObj = Object.assign({}, state);
  const arr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          newObj[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const i in action.keysToRemove) {
          delete newObj[action.keysToRemove[i]];
        }
        break;

      case 'clear':
        for (const u in newObj) {
          delete newObj[u];
        }
        break;
    }
    arr.push(Object.assign({}, newObj));
  }

  return arr;
}

module.exports = transformStateWithClones;
