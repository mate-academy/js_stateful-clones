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
    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        newObj[key] = action.extraData[key];
      }
    } else if (action.type === 'removeProperties') {
      for (const i in action.keysToRemove) {
        delete newObj[action.keysToRemove[i]];
      }
    } else if (action.type === 'clear') {
      for (const u in newObj) {
        delete newObj[u];
      }
    }
    arr.push({ ...newObj });
  }

  return arr;
}

module.exports = transformStateWithClones;
