'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;
      case 'addProperties':
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;
      case 'removeProperties':
        currentState = Object.keys(currentState)
          .filter((key) => !action.keysToRemove.includes(key))
          .reduce((newState, key) => {
            newState[key] = currentState[key];

            return newState;
          }, {});
        break;
      default:
        break;
    }
    states.push({ ...currentState });
  }

  return states;
}

module.exports = transformStateWithClones;
