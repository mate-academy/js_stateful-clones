'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resulrState = [];
  let currentState = { ...state };

  for (const item of actions) {
    if (item.type === 'addProperties') {
      Object.assign(currentState, item.extraData);
    } else if (item.type === 'removeProperties') {
      for (const key of item.keysToRemove) {
        delete currentState[key];
      }
    } else if (item.type === 'clear') {
      currentState = {};
    }
    resulrState.push({ ...currentState });
  }

  return resulrState;
}

module.exports = transformStateWithClones;
