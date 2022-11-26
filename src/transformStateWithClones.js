'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  const stateClone = Object.assign({}, state);

  for (const elem in actions) {
    if (actions[elem].type === 'addProperties') {
      Object.assign(stateClone, actions[elem].extraData);
    }

    if (actions[elem].type === 'removeProperties') {
      for (const dk in actions[elem].keysToRemove) {
        delete stateClone[actions[elem].keysToRemove[dk]];
      }
    }

    if (actions[elem].type === 'clear') {
      for (const key in stateClone) {
        delete stateClone[key];
      }
    }
    arr[elem] = Object.assign({}, stateClone);
  }

  return arr;
}

module.exports = transformStateWithClones;
