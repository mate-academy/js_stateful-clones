'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const historyArray = [];
  let currentState = state;

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        currentState = { ...currentState, ...action.extraData };
        break;
      }

      case 'removeProperties': {
        currentState = Object.keys(currentState).reduce((acc, key) => {
          if (!action.keysToRemove.includes(key)) {
            acc[key] = currentState[key];
          }

          return acc;
        }, {});
        break;
      }

      case 'clear': {
        currentState = {};
        break;
      }

      default: {
        throw new Error(`Unexpected action type: "${action.type}"`);
      }
    }

    historyArray.push(currentState);
  }

  return historyArray;
}

module.exports = transformStateWithClones;
