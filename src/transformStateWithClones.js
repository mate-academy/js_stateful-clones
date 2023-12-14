'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resMass = [];
  let currentState = { ...state };

  for (const action of actions) {
    const newState = { ...currentState };

    if (action.type === 'addProperties') {
      for (const entry of Object.entries(action.extraData)) {
        newState[entry[0]] = entry[1];
      }
    } else if (action.type === 'removeProperties') {
      for (const keyRemove of action.keysToRemove) {
        delete newState[keyRemove];
      }
    } else if (action.type === 'clear') {
      for (const key of Object.keys(newState)) {
        delete newState[key];
      }
    }

    resMass.push(newState);
    currentState = newState;
  }

  return resMass;
}

module.exports = transformStateWithClones;
