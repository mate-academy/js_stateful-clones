'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = Object.assign({}, state);

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    let nextState = {};

    if (action.type === 'clear') {
      nextState = {};
    } else if (action.type === 'addProperties') {
      for (const key in currentState) {
        nextState[key] = currentState[key];
      }

      for (const newKey in action.extraData) {
        nextState[newKey] = action.extraData[newKey];
      }
    } else if (action.type === 'removeProperties') {
      for (const k in currentState) {
        if (!action.keysToRemove.includes(k)) {
          nextState[k] = currentState[k];
        }
      }
    }

    stateHistory.push(Object.assign({}, nextState));
    currentState = Object.assign({}, nextState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
