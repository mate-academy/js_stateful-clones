'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesArray = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      const currentState = i ? { ...statesArray[i - 1] } : { ...state };

      Object.assign(currentState, actions[i].extraData);
      statesArray.push(currentState);
    }

    if (actions[i].type === 'removeProperties') {
      const currentState = i ? { ...statesArray[i - 1] } : { ...state };

      for (const key of actions[i].keysToRemove) {
        delete currentState[key];
      }
      statesArray.push(currentState);
    }

    if (actions[i].type === 'clear') {
      const currentState = i ? { ...statesArray[i - 1] } : { ...state };

      for (const key of Object.keys(currentState)) {
        delete currentState[key];
      }
      statesArray.push(currentState);
    }
  }

  return statesArray;
}

module.exports = transformStateWithClones;
