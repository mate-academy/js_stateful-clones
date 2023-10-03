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
    switch (actions[i].type) {
      case 'addProperties': {
        const currentState = i ? { ...statesArray[i - 1] } : { ...state };

        Object.assign(currentState, actions[i].extraData);
        statesArray.push(currentState);
        break;
      }

      case 'removeProperties': {
        const currentState = i ? { ...statesArray[i - 1] } : { ...state };

        for (const key of actions[i].keysToRemove) {
          delete currentState[key];
        }
        statesArray.push(currentState);
        break;
      }

      case 'clear': {
        const currentState = i ? { ...statesArray[i - 1] } : { ...state };

        for (const key of Object.keys(currentState)) {
          delete currentState[key];
        }
        statesArray.push(currentState);
        break;
      }

      default: throw new Error('Invalid action type');
    }
  }

  return statesArray;
}

module.exports = transformStateWithClones;
