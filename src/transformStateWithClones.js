'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const states = [];

  for (const { type, extraData, keysToRemove } of actions) {
    let newState = { ...currentState };

    switch (type) {
      case 'clear':
        newState = {};
        break;
      case 'addProperties':
        if (typeof extraData === 'object' && extraData !== null) {
          Object.entries(extraData).forEach(([key, value]) => {
            newState[key] = value;
          });
        }
        break;

      case 'removeProperties':
        if (keysToRemove) {
          for (const key of keysToRemove) {
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
