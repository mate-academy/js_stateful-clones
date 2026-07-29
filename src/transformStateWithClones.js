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
    const newState = { ...currentState };

    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        newState[key] = action.extraData[key];
      }
      history.push(newState);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
      history.push(newState);
    }

    if (action.type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
      history.push(newState);
    }

    currentState = newState;
  }

  return history;
}

module.exports = transformStateWithClones;
