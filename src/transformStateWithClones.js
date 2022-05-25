'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const newState = { ...state }; // Object.assign({}, state);
  const arr = [];

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        Object.assign(newState, act.extraData);
        break;

      case 'removeProperties':
        for (const key of act.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        for (const del in newState) {
          delete newState[del];
        }
        break;
    }
    arr.push({ ...newState });
  }

  return arr;
}

module.exports = transformStateWithClones;
