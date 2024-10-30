'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const states = [];

  for (const key of actions) {
    if (key.type === 'addProperties') {
      Object.assign(newState, key.extraData);
    } else if (key.type === 'removeProperties') {
      for (const removeKey of key.keysToRemove) {
        delete newState[removeKey];
      }
    } else if (key.type === 'clear') {
      newState = {};
    }
    states.push({ ...newState });
  }

  return states;
}
module.exports = transformStateWithClones;
