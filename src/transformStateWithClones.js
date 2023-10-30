'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const outputStates = [stateCopy];

  for (const action of actions) {
    let currentState = { ...outputStates[outputStates.length - 1] };

    switch (action.type) {
      case 'addProperties' :
        currentState = Object.assign({}, currentState, action.extraData);
        break;

      case 'removeProperties' :
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;

      case 'clear' :
        currentState = {};
        break;

      default: {
        break;
      }
    }

    outputStates.push(currentState);
  }

   outputStates.shift();

  return outputStates;
}

module.exports = transformStateWithClones;
