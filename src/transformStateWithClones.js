'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const array = [];
  const initial = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const data in action.extraData) {
        initial[data] = action.extraData[data];
      }
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete initial[key];
      }
    } else {
      for (const item in initial) {
        delete initial[item];
      }
    }
    array.push({ ...initial });
  }

  return array;
}

module.exports = transformStateWithClones;
