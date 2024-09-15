'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let currentState = { ...state };
  const states = [];

  for (const action of actions) {
    let newState = { ...currentState };

    switch (action.type) {
      case 'clear':
        newState = {};
        break;
      case 'addProperties':
        if (typeof action.extraData === 'object' && action.extraData !== null) {
          Object.entries(action.extraData).forEach(([key, value]) => {
            newState[key] = value;
          });
        }
        break;

      case 'removeProperties':
        if (action.keysToRemove) {
          for (const key of action.keysToRemove) {
            delete newState[key];
          }
        }
        break;
    }
    states.push(newState);
    currentState = newState;
  }

  return states;
}

module.exports = transformStateWithClones;
