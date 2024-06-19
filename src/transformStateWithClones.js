'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    currentState = { ...currentState };

    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        currentState[key] = action.extraData[key];
      }
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete currentState[key];
      }
    } else if (action.type === 'clear') {
      currentState = {};
    }

    history.push({ ...currentState });
  }

  return history;
}

module.exports = transformStateWithClones;
