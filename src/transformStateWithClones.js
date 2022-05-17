'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  const currentState = { ...state };

  for (const keys of actions) {
    switch (keys.type) {
      case 'clear' :
        for (const key in currentState) {
          delete currentState[key];
        };
        break;
      case 'addProperties' :
        Object.assign(currentState, keys.extraData);
        break;
      case 'removeProperties' :
        for (const key2 of keys.keysToRemove) {
          delete currentState[key2];
        }
        break;
    }
    arr.push({ ...currentState });
  }

  return arr;
}

module.exports = transformStateWithClones;
