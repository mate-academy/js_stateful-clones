'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function cloneObject(obj) {
  // Create a shallow clone of the object
  return { ...obj };
}

function transformStateWithClones(state, actions) {
  const stateHistory = [cloneObject(state)];

  for (const action of actions) {
    let newState = cloneObject(stateHistory[stateHistory.length - 1]);

    if (action.type === 'addProperties') {
      // Add properties to the state
      Object.assign(newState, action.extraData);
    } else if (action.type === 'removeProperties') {
      // Remove specified properties from the state
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    } else if (action.type === 'clear') {
      // Create an empty state
      newState = {};
    }

    stateHistory.push(newState);
  }

  return stateHistory.slice(1);
}
module.exports = transformStateWithClones;
