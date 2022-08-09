'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const arr = [];

  const stateNew = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateNew, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateNew[key];
        }
        break;

      case 'clear':
        for (const key in stateNew) {
          delete stateNew[key];
        }
    }
    arr.push({ ...stateNew });
  }

  return arr;
}

module.exports = transformStateWithClones;
